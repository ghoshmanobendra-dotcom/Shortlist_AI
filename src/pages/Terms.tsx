
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-grow pt-24 pb-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <Link to="/">
                        <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight text-foreground">Terms & Conditions</h1>
                            <p className="text-lg text-muted-foreground">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    By accessing or using the Service, you agree to be bound by these Terms & Conditions.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>The Service provides AI-assisted resume screening, scoring, and insights to support hiring decisions.</li>
                                    <li>We do not guarantee hiring outcomes.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                                <p className="text-muted-foreground mb-2">You agree to:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>Use the Service lawfully</li>
                                    <li>Obtain necessary candidate consent before uploading resumes</li>
                                    <li>Ensure uploaded content does not violate laws or rights</li>
                                    <li>Take full responsibility for hiring decisions</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">4. AI Disclaimer</h2>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>The Service provides recommendations, not decisions</li>
                                    <li>AI outputs may contain errors or limitations</li>
                                    <li>Users must independently review results</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Prohibited Use</h2>
                                <p className="text-muted-foreground mb-2">You may not:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>Use the Service for unlawful discrimination</li>
                                    <li>Reverse engineer or exploit the platform</li>
                                    <li>Upload malicious or unauthorized data</li>
                                    <li>Misrepresent AI outputs as final decisions</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property</h2>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>All platform content, models, and software are owned by us</li>
                                    <li>Users retain ownership of uploaded data</li>
                                    <li>You may not copy or resell the Service</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Subscription & Payments</h2>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>Fees are billed as agreed at purchase</li>
                                    <li>Trials may be limited and subject to change</li>
                                    <li>Payments are non-refundable unless stated otherwise</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Termination</h2>
                                <p className="text-muted-foreground mb-2">We may suspend or terminate access if:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>Terms are violated</li>
                                    <li>Misuse is detected</li>
                                    <li>Required by law</li>
                                </ul>
                                <p className="text-muted-foreground mt-2">Users may stop using the Service at any time.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Limitation of Liability</h2>
                                <p className="text-muted-foreground mb-2">To the maximum extent permitted by law:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>We are not liable for hiring outcomes</li>
                                    <li>We are not liable for indirect or consequential damages</li>
                                    <li>Total liability is limited to fees paid in the last 12 months</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Indemnification</h2>
                                <p className="text-muted-foreground mb-2">You agree to indemnify us against claims arising from:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>Misuse of the Service</li>
                                    <li>Violation of laws or candidate rights</li>
                                    <li>Hiring decisions made using the Service</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    These Terms are governed by the laws of India.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to Terms</h2>
                                <p className="text-muted-foreground">
                                    We may update these Terms. Continued use constitutes acceptance.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact</h2>
                                <p className="text-muted-foreground mb-2">For inquiries:</p>
                                <a href="mailto:angshuganguly777@gmail.com" className="text-primary hover:underline font-medium">
                                    📧 angshuganguly777@gmail.com
                                </a>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
