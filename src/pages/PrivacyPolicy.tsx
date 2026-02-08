
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
                            <h1 className="text-4xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
                            <p className="text-lg text-muted-foreground">
                                Last updated: {new Date().toLocaleDateString()}
                            </p>
                        </div>

                        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We respect your privacy. This Privacy Policy explains how we collect, use, store, and protect information when you use our AI-powered resume screening and scoring platform ("Service").
                                    By using the Service, you agree to this Privacy Policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-medium text-foreground mb-2">a. Information You Provide</h3>
                                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                            <li>Job descriptions</li>
                                            <li>Resumes / CVs</li>
                                            <li>Account information (name, email, organization)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-foreground mb-2">b. Automatically Collected Information</h3>
                                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                            <li>Usage data (feature usage, session duration)</li>
                                            <li>Device and browser information</li>
                                            <li>IP address (for security and analytics)</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Information</h2>
                                <p className="text-muted-foreground mb-2">We use collected information to:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>Provide and improve the Service</li>
                                    <li>Analyze resumes against job descriptions</li>
                                    <li>Generate rankings, scores, and explanations</li>
                                    <li>Ensure platform security and performance</li>
                                    <li>Communicate service updates</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">4. AI Processing & Human Control</h2>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>AI processes uploaded documents only to deliver requested outputs</li>
                                    <li>Final hiring decisions remain entirely with users</li>
                                    <li>We do not make autonomous hiring decisions</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Retention</h2>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>Uploaded resumes and job descriptions are deleted automatically after processing OR retained only for the duration necessary to provide the Service</li>
                                    <li>Users may request deletion at any time</li>
                                    <li>We do not sell or reuse uploaded data for training without explicit consent</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Sharing</h2>
                                <p className="text-muted-foreground mb-2">We do not sell or rent data. Data may be shared only:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>With trusted service providers (hosting, analytics)</li>
                                    <li>When required by law</li>
                                    <li>To protect legal rights or prevent misuse</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Data Security</h2>
                                <p className="text-muted-foreground mb-2">We use industry-standard safeguards including:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>Encryption in transit and at rest</li>
                                    <li>Access controls</li>
                                    <li>Secure cloud infrastructure</li>
                                </ul>
                                <p className="text-muted-foreground mt-2 italic">However, no system is 100% secure.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">8. GDPR & International Users</h2>
                                <p className="text-muted-foreground mb-2">For users in the EU/UK:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>We act as a data processor</li>
                                    <li>You remain the data controller</li>
                                    <li>Data is processed lawfully, transparently, and for limited purposes</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">9. Your Rights</h2>
                                <p className="text-muted-foreground mb-2">You may:</p>
                                <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                                    <li>Request access, correction, or deletion of data</li>
                                    <li>Withdraw consent</li>
                                    <li>Contact us regarding privacy concerns</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">10. Changes to This Policy</h2>
                                <p className="text-muted-foreground">
                                    We may update this policy periodically. Continued use constitutes acceptance.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact</h2>
                                <p className="text-muted-foreground mb-2">For privacy-related inquiries:</p>
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

export default PrivacyPolicy;
