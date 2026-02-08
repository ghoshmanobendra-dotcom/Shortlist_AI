import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, ThumbsUp, ThumbsDown, CheckCircle2, Filter, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, BorderStyle, HeadingLevel } from "docx";
import { saveAs } from "file-saver";

const ScreeningResults = () => {
    const { id } = useParams();
    const [filter, setFilter] = useState("all");
    const [job, setJob] = useState<any>(null);
    const [candidates, setCandidates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [signedResumeUrl, setSignedResumeUrl] = useState<string | null>(null);

    useEffect(() => {
        const generateSignedUrl = async () => {
            if (selectedCandidate?.resume_url) {
                let path = selectedCandidate.resume_url;
                // Handle legacy data where full public URL might be stored
                if (path.startsWith('http')) {
                    const parts = path.split('/resumes/');
                    if (parts.length > 1) {
                        path = parts[1];
                    }
                }

                const { data, error } = await supabase.storage
                    .from('resumes')
                    .createSignedUrl(path, 3600);

                if (data?.signedUrl) {
                    setSignedResumeUrl(data.signedUrl);
                } else {
                    console.error("Error signing URL:", error);
                }
            } else {
                setSignedResumeUrl(null);
            }
        };
        generateSignedUrl();
    }, [selectedCandidate]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!id) return;

            // DEMO MODE
            if (id.startsWith('demo')) {
                setJob({
                    id: id,
                    title: id === 'demo' ? 'Senior Frontend Engineer (Demo)' : 'Product Designer (Demo)',
                    status: 'completed',
                    description: 'This is a demo job description to showcase the platform capabilities.'
                });

                const demoCandidates = [
                    {
                        id: 'd1',
                        name: "Alex Rivera",
                        email: "alex.rivera@example.com",
                        score: 94,
                        status: "hire",
                        summary: "Exceptional match. Alex has 7+ years of React experience and has led similar architectural migrations. His GitHub shows high-quality open source contributions relevant to our tech stack.",
                        strengths: ["7+ years React experience", "System Design Leadership", "Strong Open Source Portfolio"],
                        concerns: ["Higher salary expectation likely"],
                        experience: "7 years"
                    },
                    {
                        id: 'd2',
                        name: "Sarah Chen",
                        email: "sarah.chen@example.com",
                        score: 88,
                        status: "maybe",
                        summary: "Strong candidate with solid technical skills. Lacks some specific experience in our niche but shows great learning potential and cultural fit.",
                        strengths: ["Full-stack capabilities", "Strong communication", " rapid learner"],
                        concerns: ["Less experience with Next.js specifically"],
                        experience: "4 years"
                    },
                    {
                        id: 'd3',
                        name: "Mike Johnson",
                        email: "mike.j@example.com",
                        score: 72,
                        status: "reject",
                        summary: "Good developer but lacks the seniority required for this specific role. Better suited for a mid-level position.",
                        strengths: ["Good consistent work history", "Python expertise"],
                        concerns: ["Lacks leadership experience", "Not enough frontend depth"],
                        experience: "3 years"
                    }
                ];
                setCandidates(demoCandidates);
                setSelectedCandidate(demoCandidates[0]);
                setLoading(false);
                return;
            }

            try {
                // Fetch Job
                const { data: jobData, error: jobError } = await supabase
                    .from('jobs')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (jobError) throw jobError;
                setJob(jobData);

                // Fetch Candidates
                const { data: candidateData, error: candError } = await supabase
                    .from('candidates')
                    .select('*')
                    .eq('job_id', id)
                    .order('score', { ascending: false });

                if (candError) throw candError;

                setCandidates(candidateData || []);
                if (candidateData && candidateData.length > 0) {
                    setSelectedCandidate(candidateData[0]);
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [id]);

    const getScoreColor = (score: number) => {
        if (score >= 90) return "text-emerald-500";
        if (score >= 80) return "text-amber-500";
        return "text-rose-500";
    };

    const getProgressColor = (score: number) => {
        if (score >= 90) return "bg-emerald-500";
        if (score >= 80) return "bg-amber-500";
        return "bg-rose-500";
    };

    const handleExportPDF = () => {
        if (!job || !candidates.length) return;

        const doc = new jsPDF();

        // Add Title
        doc.setFontSize(18);
        doc.text(`Screening Results: ${job.title}`, 14, 22);

        doc.setFontSize(11);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);
        doc.text(`Total Candidates: ${candidates.length}`, 14, 36);

        // Prepare table data
        const tableColumn = ["Name", "Email", "Score", "Status", "Summary"];
        const tableRows = candidates.map(c => [
            c.name,
            c.email,
            `${c.score}%`,
            c.status,
            (c.summary || "").substring(0, 100) + (c.summary?.length > 100 ? "..." : "") // Truncate summary for PDF
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 45,
            styles: { fontSize: 9 },
            headStyles: { fillColor: [79, 70, 229] }, // Primary color
            columnStyles: {
                4: { cellWidth: 80 } // Wider column for summary
            }
        });

        doc.save(`Screening_Results_${job.title.substring(0, 20).replace(/\s+/g, '_')}.pdf`);
    };

    const handleExportExcel = () => {
        if (!job || !candidates.length) return;

        const worksheet = XLSX.utils.json_to_sheet(candidates.map(c => ({
            Name: c.name,
            Email: c.email,
            Score: c.score,
            Status: c.status,
            Summary: c.summary,
            Strengths: c.strengths?.join(", "),
            Concerns: c.concerns?.join(", ")
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
        XLSX.writeFile(workbook, `Screening_Results_${job.title.substring(0, 20).replace(/\s+/g, '_')}.xlsx`);
    };

    const handleExportWord = () => {
        if (!job || !candidates.length) return;

        const doc = new Document({
            sections: [{
                properties: {},
                children: [
                    new Paragraph({
                        text: `Screening Results: ${job.title}`,
                        heading: HeadingLevel.HEADING_1,
                    }),
                    new Paragraph({ text: `Date: ${new Date().toLocaleDateString()}` }),
                    new Paragraph({ text: "" }), // spacer
                    new Table({
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE,
                        },
                        rows: [
                            new TableRow({
                                children: ["Name", "Email", "Score", "Status"].map(header =>
                                    new TableCell({
                                        children: [new Paragraph({
                                            children: [new TextRun({ text: header, bold: true })],
                                        })],
                                        width: { size: 25, type: WidthType.PERCENTAGE },
                                    })
                                ),
                            }),
                            ...candidates.map(candidate =>
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph(candidate.name)] }),
                                        new TableCell({ children: [new Paragraph(candidate.email || "")] }),
                                        new TableCell({ children: [new Paragraph(candidate.score.toString() + "%")] }),
                                        new TableCell({ children: [new Paragraph(candidate.status)] }),
                                    ],
                                })
                            )
                        ],
                    })
                ],
            }],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, `Screening_Results_${job.title.substring(0, 20).replace(/\s+/g, '_')}.docx`);
        });
    };

    const filteredCandidates = candidates.filter(c => {
        if (filter === 'all') return true;
        // Map status logic if needed, currently matching DB values 'hire', 'maybe', 'reject' to filter
        return c.status.toLowerCase() === filter;
    });

    if (loading) {
        return (
            <DashboardLayout>
                <div className="max-w-6xl mx-auto space-y-8 animate-fade-in p-4">
                    <Skeleton className="h-12 w-1/3 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                    </div>
                    <Skeleton className="h-[400px]" />
                </div>
            </DashboardLayout>
        );
    }

    if (!job) {
        return (
            <DashboardLayout>
                <div className="max-w-6xl mx-auto p-4 text-center">
                    <h2 className="text-xl font-bold">Job not found</h2>
                    <Button asChild className="mt-4"><Link to="/dashboard">Back to Dashboard</Link></Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                            <Link to="/dashboard" className="hover:underline">Jobs</Link>
                            <span>/</span>
                            <span>{job.title}</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleExportPDF}>
                                    Export as PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExportExcel}>
                                    Export as Excel
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleExportWord}>
                                    Export as Word
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                        <div className="text-sm font-medium text-muted-foreground">Total Candidates</div>
                        <div className="text-3xl font-bold mt-2 flex items-baseline gap-2">
                            {candidates.length}
                        </div>
                    </div>
                    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                        <div className="text-sm font-medium text-muted-foreground">Top Matches ({">"}80%)</div>
                        <div className="text-3xl font-bold mt-2">{candidates.filter(c => c.score > 80).length} Candidates</div>
                    </div>
                    <div className="bg-card border border-border/50 rounded-xl p-6 shadow-sm">
                        <div className="text-sm font-medium text-muted-foreground">Status</div>
                        <div className="text-3xl font-bold mt-2 capitalize text-primary">{job.status}</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 py-2 overflow-x-auto no-scrollbar">
                    <Button variant={filter === 'all' ? 'secondary' : 'ghost'} onClick={() => setFilter('all')} className="rounded-full">
                        All
                    </Button>
                    <Button variant={filter === 'hire' ? 'secondary' : 'ghost'} onClick={() => setFilter('hire')} className="rounded-full text-emerald-600">
                        Hire ({candidates.filter(c => c.status === 'hire').length})
                    </Button>
                    <Button variant={filter === 'maybe' ? 'secondary' : 'ghost'} onClick={() => setFilter('maybe')} className="rounded-full text-amber-600">
                        Maybe ({candidates.filter(c => c.status === 'maybe').length})
                    </Button>
                    <Button variant={filter === 'reject' ? 'secondary' : 'ghost'} onClick={() => setFilter('reject')} className="rounded-full text-rose-600">
                        Reject ({candidates.filter(c => c.status === 'reject').length})
                    </Button>
                </div>

                {/* Main List */}
                <div className="grid gap-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* List View */}
                        <div className="lg:col-span-5 space-y-3">
                            {filteredCandidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className={`group p-4 rounded-xl border transition-all cursor-pointer ${selectedCandidate?.id === candidate.id ? 'border-primary bg-primary/5' : 'border-border/50 bg-card hover:border-primary/50'}`}
                                    onClick={() => setSelectedCandidate(candidate)}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary text-white font-bold">
                                                {candidate.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{candidate.name}</h3>
                                                <p className="text-xs text-muted-foreground truncate max-w-[150px]">{candidate.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`text-xl font-bold ${getScoreColor(candidate.score)}`}>{candidate.score}%</span>
                                            <Badge variant="outline" className={`ml-2 capitalize ${candidate.status === 'hire' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-200' :
                                                candidate.status === 'maybe' ? 'bg-amber-500/10 text-amber-500 border-amber-200' :
                                                    candidate.status === 'reject' ? 'bg-rose-500/10 text-rose-500 border-rose-200' : ''
                                                }`}>
                                                {candidate.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="mt-3 w-full bg-muted rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${getProgressColor(candidate.score)}`}
                                            style={{ width: `${candidate.score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {filteredCandidates.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">No candidates found for this filter.</div>
                            )}
                        </div>

                        {/* Detail View (Sticky) */}
                        <div className="lg:col-span-7 sticky top-24">
                            {selectedCandidate ? (
                                <div className="bg-card border border-border/50 rounded-xl p-6 shadow-lg">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                                            <p className="text-muted-foreground">{selectedCandidate.email} • {selectedCandidate.experience || "Experience Not Parsed"}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" asChild disabled={!signedResumeUrl}>
                                                <a href={signedResumeUrl || "#"} target="_blank" rel="noopener noreferrer">View Resume</a>
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* AI Analysis */}
                                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                                            <div className="flex items-center gap-2 mb-2 text-primary font-semibold">
                                                <div className="h-5 w-5 rounded bg-primary text-white flex items-center justify-center text-xs">AI</div>
                                                Ranking Analysis
                                            </div>
                                            <p className="text-sm leading-relaxed text-foreground/80 italic">
                                                "{selectedCandidate.summary || "Waiting for detailed analysis..."}"
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                                    Key Strengths
                                                </h4>
                                                <ul className="space-y-2">
                                                    {selectedCandidate.strengths?.length > 0 ? selectedCandidate.strengths.map((str: string, i: number) => (
                                                        <li key={i} className="text-sm flex items-start gap-2 text-muted-foreground">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                                            {str}
                                                        </li>
                                                    )) : <li className="text-sm text-muted-foreground">No specific strengths extracted yet.</li>}
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                                    <AlertCircle className="h-4 w-4 text-amber-500" />
                                                    Gaps / Concerns
                                                </h4>
                                                <ul className="space-y-2">
                                                    {selectedCandidate.concerns?.length > 0 ? selectedCandidate.concerns.map((conc: string, i: number) => (
                                                        <li key={i} className="text-sm flex items-start gap-2 text-muted-foreground">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                            {conc}
                                                        </li>
                                                    )) : <li className="text-sm text-muted-foreground">No major concerns flagged.</li>}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-muted-foreground border border-dashed rounded-xl p-12">
                                    Select a candidate to view details
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ScreeningResults;
