
import { Github, Linkedin, Mail } from "lucide-react";


const ContactSection = () => {
    const team = [
        {
            name: "MANOBENDRA GHOSH",
            role: "Lead Developer",
            github: "https://github.com/ghoshmanobendra-dotcom",
            linkedin: "https://www.linkedin.com/in/manobendra-ghosh-84b925375/?skipRedirect=true",
            email: "mailto:manobendraghosh2006@gmail.com",
            avatar: "MG"
        },
        {
            name: "ANGSHURPITA GANGULY",
            role: "Lead Developer",
            github: "https://github.com/Angshurpita",
            linkedin: "https://www.linkedin.com/in/angshurpita-ganguly-270828255/",
            email: "mailto:angshuganguly777@gmail.com",
            avatar: "AG"
        }
    ];

    return (
        <section id="contact" className="py-24 bg-secondary/30 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Meet the Team
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        We're a passionate team dedicated to transforming the recruitment process.
                        Have questions? Reach out to us directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                                    <span className="z-10">{member.avatar}</span>
                                    <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                                </div>

                                <h3 className="text-2xl font-bold text-foreground mb-2">{member.name}</h3>
                                <p className="text-primary font-medium mb-6">{member.role}</p>

                                <div className="flex items-center gap-4">
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub"
                                        className="inline-flex items-center justify-center rounded-full w-12 h-12 text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <Github className="w-6 h-6" />
                                    </a>
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        className="inline-flex items-center justify-center rounded-full w-12 h-12 text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                    <a
                                        href={member.email}
                                        aria-label="Email"
                                        className="inline-flex items-center justify-center rounded-full w-12 h-12 text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <Mail className="w-6 h-6" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
};

export default ContactSection;
