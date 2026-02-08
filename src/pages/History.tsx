import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";
import { Input } from "@/components/ui/input";

const History = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [userInfo, setUserInfo] = useState<{ name: string; email: string; avatarUrl?: string } | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    console.log("No user found");
                    setLoading(false);
                    return;
                }

                // Robust user info extraction
                const metadata = user.user_metadata || {};
                setUserInfo({
                    name: metadata.full_name || metadata.name || user.email?.split('@')[0] || "User",
                    email: user.email || "",
                    avatarUrl: metadata.avatar_url || metadata.picture
                });

                const { data: jobsData, error } = await supabase
                    .from('jobs')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;

                // Enrich with candidate counts
                const jobsWithCounts = await Promise.all(jobsData.map(async (job) => {
                    const { count } = await supabase
                        .from('candidates')
                        .select('*', { count: 'exact', head: true })
                        .eq('job_id', job.id);
                    return { ...job, candidateCount: count || 0 };
                }));

                setJobs(jobsWithCounts);
            } catch (error) {
                console.error("Error loading history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Screening History</h1>
                        <p className="text-muted-foreground mt-1">View all your past recruitment drives</p>
                    </div>
                </div>



                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search jobs..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle>All Screenings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-12 text-muted-foreground">Loading history...</div>
                            ) : filteredJobs.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    {searchTerm ? "No screenings found matching your search." : "No screenings found. Start a new one!"}
                                </div>
                            ) : (
                                filteredJobs.map((job) => (
                                    <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-card border border-border/50 rounded-xl hover:shadow-md transition-all group">
                                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Users className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{job.title}</h3>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                    <span>{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
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
                                            <Button variant="outline" asChild>
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
        </DashboardLayout>
    );
};

export default History;
