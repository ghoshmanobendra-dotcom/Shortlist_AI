
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { TermsBody, PrivacyBody } from "@/components/LegalContent";

// Content from LegalComponents - wrappers to match styling if needed or direct usage
const TermsContent = () => (
    <div className="prose prose-sm dark:prose-invert max-w-none">
        <TermsBody />
    </div>
);

const PrivacyContent = () => (
    <div className="prose prose-sm dark:prose-invert max-w-none">
        <PrivacyBody />
    </div>
);

const TermsAcceptance = () => {
    const [accepted, setAccepted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    // Verify user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate("/auth");
            }
        };
        checkAuth();
    }, [navigate]);

    const handleAccept = async () => {
        if (!accepted) return;
        setSubmitting(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            const { error } = await supabase
                .from("profiles")
                .update({ terms_accepted: true })
                .eq("id", user.id);

            if (error) throw error;

            toast.success("Terms accepted successfully");
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Error accepting terms:", error);
            toast.error(error.message || "Failed to accept terms");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-xl">
                <CardHeader>
                    <CardTitle className="text-2xl">Terms of Service & Privacy Policy</CardTitle>
                    <CardDescription>
                        Please read and accept our Terms of Service and Privacy Policy to continue to your dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="terms" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                        </TabsList>
                        <div className="h-[400px] overflow-y-auto pr-2 border rounded-md p-4 bg-muted/30">
                            <TabsContent value="terms" className="mt-0">
                                <TermsContent />
                            </TabsContent>
                            <TabsContent value="privacy" className="mt-0">
                                <PrivacyContent />
                            </TabsContent>
                        </div>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex-col gap-4 border-t pt-6">
                    <div className="flex items-center space-x-2 w-full">
                        <Checkbox
                            id="terms"
                            checked={accepted}
                            onCheckedChange={(checked) => setAccepted(checked as boolean)}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                            I have read and agree to the Terms of Service and Privacy Policy
                        </label>
                    </div>
                    <Button
                        className="w-full"
                        onClick={handleAccept}
                        disabled={!accepted || submitting}
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Accept & Continue"
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default TermsAcceptance;
