import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { supabase } from "@/lib/supabase";
import Index from "./pages/Index";

const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NewScreening = lazy(() => import("./pages/NewScreening"));
const ScreeningResults = lazy(() => import("./pages/ScreeningResults"));
const HistoryPage = lazy(() => import("./pages/History"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));
const InnerHome = lazy(() => import("./pages/InnerHome"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const TermsAcceptance = lazy(() => import("./pages/TermsAcceptance"));

const queryClient = new QueryClient();

const AuthListener = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        if (event === 'SIGNED_OUT') return;

        // Check terms acceptance
        const { data: profile } = await supabase
          .from('profiles')
          .select('terms_accepted')
          .eq('id', session.user.id)
          .single();

        if (profile && !profile.terms_accepted) {
          if (location.pathname !== '/accept-terms') {
            navigate('/accept-terms');
          }
        } else {
          // If explicitly on accept-terms but already accepted, or just logged in
          if (location.pathname === '/accept-terms' || location.pathname === '/auth' || (location.pathname === '/' && location.hash.includes('access_token'))) {
            navigate('/dashboard');
          }
        }
      } else {
        // No session
        if (location.pathname.startsWith('/dashboard') || location.pathname === '/accept-terms') {
          navigate('/auth');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AuthListener />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/accept-terms" element={<TermsAcceptance />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/home" element={<InnerHome />} />
              <Route path="/dashboard/new" element={<NewScreening />} />
              <Route path="/dashboard/history" element={<HistoryPage />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/results/:id" element={<ScreeningResults />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
