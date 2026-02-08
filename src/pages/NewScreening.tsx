import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, X, Sparkles, File, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/lib/supabase";
import { extractTextFromPdf, calculateATSScore } from "@/lib/pdf-parser";

const NewScreening = () => {
    const [jobDescription, setJobDescription] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files).filter(
            (file) => file.type === "application/pdf"
        );

        if (droppedFiles.length !== e.dataTransfer.files.length) {
            toast.warning("Only PDF files are supported");
        }

        setFiles((prev) => [...prev, ...droppedFiles]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files).filter(
                (file) => file.type === "application/pdf"
            );
            setFiles((prev) => [...prev, ...selectedFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) {
            toast.error("Please enter a job description");
            return;
        }
        if (files.length === 0) {
            toast.error("Please upload at least one resume");
            return;
        }

        setUploading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                toast.error("User not found");
                return;
            }

            // 1. Create Job
            const { data: job, error: jobError } = await supabase
                .from('jobs')
                .insert({
                    user_id: user.id,
                    title: jobDescription.split('\n')[0].substring(0, 50) || "New Screening",
                    description: jobDescription,
                    status: 'processing'
                })
                .select()
                .single();

            if (jobError) throw jobError;

            // 2. Upload Resumes & Create Candidates
            let successCount = 0;
            for (const file of files) {
                const fileName = `${job.id}/${Date.now()}_${file.name}`;
                let publicUrl = "";
                let score = 0;
                let summary = "Analysis pending...";
                let strengths: string[] = [];
                let concerns: string[] = [];
                let status = 'new';

                try {
                    // Upload file
                    const { error: uploadError } = await supabase.storage
                        .from('resumes')
                        .upload(fileName, file);

                    if (uploadError) throw uploadError;

                    // Analyze Resume
                    try {
                        const text = await extractTextFromPdf(file);
                        const analysis = calculateATSScore(text, jobDescription);
                        score = analysis.score;
                        summary = analysis.summary;
                        strengths = analysis.strengths;
                        concerns = analysis.concerns;
                        status = score >= 80 ? 'hire' : score >= 50 ? 'maybe' : 'reject';
                    } catch (err) {
                        console.error("Analysis failed for", file.name, err);
                        summary = "Failed to parse resume text.";
                    }

                    // Create Candidate Record
                    const { error: candidateError } = await supabase
                        .from('candidates')
                        .insert({
                            job_id: job.id,
                            name: file.name.replace('.pdf', ''),
                            resume_url: fileName,
                            status: status,
                            email: 'extracted_email@example.com',
                            score: score,
                            summary: summary,
                            strengths: strengths,
                            concerns: concerns
                        });

                    if (candidateError) throw candidateError;
                    successCount++;
                } catch (err: any) {
                    console.error("Error processing file:", file.name, err);
                    // Error handling logic...
                }
            }

            if (successCount === 0) {
                toast.error("Failed to process any resumes.");
                setUploading(false);
                return;
            }

            // 3. Complete Job 
            await supabase
                .from('jobs')
                .update({ status: 'completed' })
                .eq('id', job.id);

            toast.success(`Screening created with ${successCount} candidates!`);
            navigate(`/dashboard/results/${job.id}`);

        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to create screening");
        } finally {
            setUploading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">New Screening Workflow</h1>
                        <p className="text-muted-foreground">Follow the steps below to generate your AI-powered candidate shortlist.</p>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* Step 1: Job Description */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                                <CardTitle>Job Description</CardTitle>
                            </div>
                            <CardDescription>
                                Paste the full job description below. Our AI analyzes this to identify key requirements, soft skills, and experience levels.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="e.g. Senior Frontend Engineer... We are looking for someone with 5+ years of React experience..."
                                className="min-h-[200px] resize-y p-4 text-base focus-visible:ring-primary"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                            <div className="flex justify-end mt-2">
                                <p className="text-xs text-muted-foreground">{jobDescription.length} characters</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Step 2: Upload Resumes */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                                <CardTitle>Upload Resumes</CardTitle>
                            </div>
                            <CardDescription>
                                Upload candidate resumes in PDF format. We'll verify parsing accuracy automatically.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div
                                className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all duration-300 ${isDragging
                                    ? "border-primary bg-primary/5 scale-[1.01]"
                                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                                    }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                    <Upload className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-1">Click to upload or drag and drop</h3>
                                <p className="text-sm text-muted-foreground mb-4">PDF files only (Max. 10MB each)</p>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    multiple
                                    accept=".pdf"
                                    onChange={handleFileSelect}
                                />
                                <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                                    Select Files
                                </Button>
                            </div>

                            {files.length > 0 && (
                                <div className="space-y-3 mt-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">{files.length} resumes uploaded</span>
                                        <span className="text-muted-foreground">{Math.min(100, Math.round((files.length / 50) * 100))}% of limit used</span>
                                    </div>
                                    <Progress value={(files.length / 50) * 100} className="h-2" />

                                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 mt-4">
                                        {files.map((file, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-background/50 text-sm group relative">
                                                <File className="h-4 w-4 text-primary shrink-0" />
                                                <span className="truncate flex-1">{file.name}</span>
                                                <button
                                                    onClick={() => removeFile(i)}
                                                    className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Action Area */}
                    <div className="flex justify-end pt-4 pb-12">
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white min-w-[200px] h-12 text-lg shadow-lg hover:shadow-xl transition-all"
                            onClick={handleAnalyze}
                            disabled={uploading}
                        >
                            {uploading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    Generate Shortlist
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default NewScreening;
