
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
        <section id="contact" className="py-24 bg-muted/5 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Meet the Builders
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Built by engineers who were tired of spending weekends screening hundreds of resumes manually.
                        We built ShortlistAI to give every candidate a fair shot while giving recruiters their time back.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-bold text-primary mb-6 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden ring-4 ring-background shadow-xl">
                                    <span className="z-10">{member.avatar}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-foreground mb-1">{member.name}</h3>
                                <p className="text-primary font-medium mb-4">{member.role}</p>

                                <p className="text-muted-foreground mb-6 text-sm italic">
                                    "{member.name === "MANOBENDRA GHOSH" ? "Obsessed with scalable architecture and AI agents." : "Passion for intuitive UX and data-driven insights."}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub"
                                        className="inline-flex items-center justify-center rounded-full w-10 h-10 text-foreground/70 hover:text-white hover:bg-[#333] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                        className="inline-flex items-center justify-center rounded-full w-10 h-10 text-foreground/70 hover:text-white hover:bg-[#0077b5] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <Linkedin className="w-5 h-5" />
                                    </a>
                                    <a
                                        href={member.email}
                                        aria-label="Email"
                                        className="inline-flex items-center justify-center rounded-full w-10 h-10 text-foreground/70 hover:text-white hover:bg-red-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <Mail className="w-5 h-5" />
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
