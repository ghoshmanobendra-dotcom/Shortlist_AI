import { ReactNode, useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { supabase } from "@/lib/supabase";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const [initials, setInitials] = useState("User");

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const name = user.user_metadata?.full_name || user.email || "User";
                const parts = name.split(" ").filter(Boolean);
                let init = "";
                if (parts.length >= 2) {
                    init = parts[0][0] + parts[1][0];
                } else if (parts.length === 1) {
                    init = parts[0][0];
                    // If it's an email like 'user@example.com', take first letter only
                    if (name.includes("@")) {
                        init = name[0];
                    } else if (name.length > 1) {
                        // try to take second letter if it's a single word name? No, usually just 1 is fine or first 2 chars.
                        // Standard depends on taste. Let's do first 2 chars if single word
                        init = name.substring(0, 2).toUpperCase();
                    }
                }
                setInitials(init.toUpperCase());
            }
        };
        getUser();
    }, []);

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                <AppSidebar />
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <header className="h-16 flex items-center px-4 md:px-6 border-b border-border/50 bg-background/50 backdrop-blur sticky top-0 z-10 justify-between">
                        <SidebarTrigger />
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                                {initials}
                            </div>
                        </div>
                    </header>
                    <div className="flex-1 overflow-auto p-4 md:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

