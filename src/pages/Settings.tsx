import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Bell, Shield, User, Moon, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

import { useTheme } from "next-themes";

const Settings = () => {
    const { theme, setTheme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [strictMatching, setStrictMatching] = useState(false);
    const [softSkills, setSoftSkills] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setEmail(user.email || "");
                    const metadata = user.user_metadata || {};
                    setName(metadata.full_name || metadata.name || "");
                    setStrictMatching(metadata.preferences?.strict_matching || false);
                    setSoftSkills(metadata.preferences?.soft_skills ?? true);
                }
            } catch (error) {
                console.error("Error loading settings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handlePreferenceChange = async (key: string, value: boolean) => {
        if (key === 'strict_matching') setStrictMatching(value);
        if (key === 'soft_skills') setSoftSkills(value);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const newPreferences = {
                ...(user.user_metadata?.preferences || {}),
                [key]: value
            };

            const { error } = await supabase.auth.updateUser({
                data: { preferences: newPreferences }
            });

            if (error) throw error;

            toast.success("Preference updated");
        } catch (error: any) {
            console.error("Error saving preference:", error);
            toast.error("Failed to save preference");
            // Revert state on error
            if (key === 'strict_matching') setStrictMatching(!value);
            if (key === 'soft_skills') setSoftSkills(!value);
        }
    };

    const handleSaveProfile = async () => {
        setSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: name }
            });

            if (error) throw error;

            toast.success("Profile updated", {
                description: "Your display name has been successfully updated.",
            });
        } catch (error: any) {
            toast.error("Error", {
                description: error.message || "Failed to update profile",
            });
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground mt-1">Manage your account preferences and application settings</p>
                </div>

                <div className="grid gap-6">
                    {/* Account Settings */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                <CardTitle>Account Information</CardTitle>
                            </div>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={loading ? "Loading..." : email}
                                    disabled
                                />
                                <p className="text-xs text-muted-foreground">Managed via Supabase Auth</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={loading || saving}
                                />
                            </div>
                            <Button onClick={handleSaveProfile} disabled={loading || saving}>
                                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Preferences */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Shield className="h-5 w-5 text-primary" />
                                <CardTitle>Screening Preferences</CardTitle>
                            </div>
                            <CardDescription>Configure how AI analyzes resumes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Strict Keyword Matching</Label>
                                    <p className="text-sm text-muted-foreground">Require exact matches for critical skills</p>
                                </div>
                                <Switch
                                    checked={strictMatching}
                                    onCheckedChange={(checked) => handlePreferenceChange('strict_matching', checked)}
                                    disabled={loading}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Include Soft Skills Score</Label>
                                    <p className="text-sm text-muted-foreground">Analyze communication and leadership traits</p>
                                </div>
                                <Switch
                                    checked={softSkills}
                                    onCheckedChange={(checked) => handlePreferenceChange('soft_skills', checked)}
                                    disabled={loading}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Appearance */}
                    <Card className="glass-card">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Moon className="h-5 w-5 text-primary" />
                                <CardTitle>Appearance</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Dark Mode</Label>
                                    <p className="text-sm text-muted-foreground">Toggle application theme</p>
                                </div>
                                <Switch
                                    checked={theme === 'dark'}
                                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
