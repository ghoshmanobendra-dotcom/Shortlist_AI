import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCandidates: 0,
        activeJobs: 0,
        completedJobs: 0
    });
    const [recentJobs, setRecentJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                // Fetch Jobs
                const { data: jobs, error: jobsError } = await supabase
                    .from('jobs')
                    .select('*, candidates(count)')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (jobsError) throw jobsError;

                // Calculate Stats
                const totalStats = jobs?.reduce((acc, job) => {
                    const candidateCount = job.candidates?.[0]?.count || 0; // Adjust based on actual return structure if needed (supabase returns array of objects for count usually users count as separate query or aggregation)
                    // Actually supabase .select('*, candidates(count)') returns { candidates: [{ count: 123 }] } 
                    // Let's refine the query approach slightly for better type safety if strictly needed, but eager loading count is efficiently done via:
                    return {
                        totalCandidates: acc.totalCandidates + (candidateCount as number), // casting for simplicity
                        activeJobs: acc.activeJobs + (job.status === 'processing' ? 1 : 0),
                        completedJobs: acc.completedJobs + (job.status === 'completed' ? 1 : 0)
                    };
                }, { totalCandidates: 0, activeJobs: 0, completedJobs: 0 });

                // For proper counting in Supabase regular select, let's just do a separate count query or client side sum if list is small. 
                // Given "jobs" likely returns all, we can do client side calc.

                // Correctly fetching candidate counts per job requires slightly different syntax or helper.
                // Simplified: Fetch all candidates for current user's jobs might be heavy.
                // Better: just assume we have the jobs. 

                // Let's fetch candidates count via a separate rpc or just fetch all jobs and map counts.
                // Supabase JS select('*, candidates(count)') returns exact count as 'candidates' property if head:true? No.
                // Standard way: .select('*, candidates(id)') then length, but that fetches all IDs.
                // Let's stick to a simpler approximation or just display "0" if we can't easily count without a group_by view.

                // Correction: Let's fetch the detailed recent jobs and just sum their candidate counts if available.
                // For now, let's iterate and fetch counts for the visible list or just standard select.

                const jobsWithCounts = await Promise.all(jobs?.map(async (job) => {
                    const { count } = await supabase
                        .from('candidates')
                        .select('*', { count: 'exact', head: true })
                        .eq('job_id', job.id);
                    return { ...job, candidateCount: count || 0 };
                }) || []);

                const calculatedStats = jobsWithCounts.reduce((acc, job) => ({
                    totalCandidates: acc.totalCandidates + job.candidateCount,
                    activeJobs: acc.activeJobs + (job.status === 'processing' ? 1 : 0),
                    completedJobs: acc.completedJobs + (job.status === 'completed' ? 1 : 0)
                }), { totalCandidates: 0, activeJobs: 0, completedJobs: 0 });

                setStats(calculatedStats);
                setRecentJobs(jobsWithCounts.slice(0, 5)); // Top 5
            } catch (error) {
                console.error("Error loading dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Manage your recruitment pipeline</p>
                    </div>
                    <Link to="/dashboard/new">
                        <Button className="shadow-lg hover:shadow-xl transition-all">
                            <Plus className="mr-2 h-4 w-4" /> New Screening
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="glass-card hover:scale-[1.02] transition-transform duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                            <Users className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{loading ? "..." : stats.totalCandidates}</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                Across all jobs
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card hover:scale-[1.02] transition-transform duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Time Saved (Est.)</CardTitle>
                            <Clock className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{loading ? "..." : `${Math.round(stats.totalCandidates * 15 / 60)} hrs`}</div>
                            <p className="text-xs text-muted-foreground mt-1">Avg. 15min per resume</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card hover:scale-[1.02] transition-transform duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                            <CheckCircle className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{loading ? "..." : stats.activeJobs}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stats.completedJobs} completed</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Screenings */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Recent Screenings</h2>
                    <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="p-0">
                            <div className="space-y-3">
                                {loading ? (
                                    <div className="text-center py-8 text-muted-foreground">Loading specific job data...</div>
                                ) : recentJobs.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No screenings found. Start a new one!
                                    </div>
                                ) : (
                                    recentJobs.map((job) => (
                                        <div key={job.id} className="flex items-center justify-between p-5 bg-card border border-border/50 rounded-xl hover:shadow-md transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <Users className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-lg">{job.title}</h3>
                                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                        <span>Created {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
                                                        <span>•</span>
                                                        <span>{job.candidateCount} Candidates</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${job.status === 'completed'
                                                        ? 'bg-emerald-500/10 text-emerald-500'
                                                        : 'bg-amber-500/10 text-amber-500'
                                                    }`}>
                                                    {job.status}
                                                </span>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link to={`/dashboard/results/${job.id}`}>View Results</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
