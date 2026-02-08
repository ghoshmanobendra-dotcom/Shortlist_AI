import { Home, PlusCircle, History, Settings, LogOut, Globe } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

const items = [
    {
        title: "Home Page",
        url: "/dashboard/home",
        icon: Globe,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "New Screening",
        url: "/dashboard/new",
        icon: PlusCircle,
    },
    {
        title: "History",
        url: "/dashboard/history",
        icon: History,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            toast.success("Signed out successfully");
            navigate("/");
        } catch (error: any) {
            toast.error("Error signing out", {
                description: error.message
            });
        }
    };

    return (
        <Sidebar>
            <SidebarHeader className="p-4 border-b border-border/50">
                <Link to="/" className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                        <div className="w-1.5 h-4 bg-primary rounded-full" />
                        <div className="w-1.5 h-4 bg-primary rounded-full" />
                        <div className="w-1.5 h-4 bg-primary rounded-full" />
                    </div>
                    <span className="font-bold text-lg">ShortlistAI</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={location.pathname === item.url} tooltip={item.title}>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4 border-t border-border/50">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={handleSignOut} tooltip="Sign Out">
                            <LogOut />
                            <span>Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
