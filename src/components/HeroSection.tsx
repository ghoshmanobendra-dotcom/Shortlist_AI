import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -z-10 translate-x-1/3 -translate-y-1/4">
        <div className="w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 animate-pulse" style={{ animationDuration: '4s' }} />
      </div>
      <div className="absolute bottom-0 left-0 -z-10 -translate-x-1/3 translate-y-1/4">
        <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-indigo-500/10 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 hover:bg-primary/15 transition-colors cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              NEW: AI-Enhanced Screening
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6 tracking-tight">
              Shortlist the best candidates in{" "}
              <span className="text-gradient hover:opacity-80 transition-opacity">60 seconds</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              Stop manual screening. ShortlistAI uses advanced LLMs to rank your applicants based on skill, experience, and cultural fit in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button variant="hero" size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Try for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="ghost" size="lg" className="h-12 px-8 text-base border border-input hover:bg-accent hover:text-accent-foreground backdrop-blur-sm">
                <Play className="w-5 h-5 mr-2" />
                See How It Works
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 border-2 border-background flex items-center justify-center text-[10px] font-bold text-gray-600 shadow-sm"
                  >
                    {/* Placeholder avatars */}
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" className="w-full h-full rounded-full" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex text-yellow-500 space-x-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Loved by <span className="font-semibold text-foreground">500+</span> talent teams
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Card */}
          <div className="animate-fade-in lg:pl-10 relative hidden lg:block">
            <div className="relative group perspective-1000">
              {/* Main Card */}
              <div className="relative z-10 bg-card/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6 transform transition-transform duration-500 hover:rotate-y-2 hover:scale-[1.01]">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Top Candidates</h3>
                  <div className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">Synced just now</div>
                </div>

                {/* Candidate List */}
                {/* Item 1 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">JS</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-sm">James Smith</h4>
                      <span className="text-primary font-bold text-sm">98%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[98%] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-colors opacity-80">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg">AL</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-sm">Ana Lopez</h4>
                      <span className="text-primary font-bold text-sm">92%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/80 w-[92%] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-background/50 border border-border/50 hover:border-primary/30 transition-colors opacity-60">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg">MR</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-sm">Mike Ross</h4>
                      <span className="text-primary font-bold text-sm">85%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/60 w-[85%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decorations behind */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-blob animation-delay-2000" />
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="mt-24 pt-10 border-t border-border/40">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">TRUSTED BY INNOVATIVE TEAMS AT</p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {["NEXUS", "STRATOS", "QUANTUM", "SYNERGY", "VORTEX"].map((name) => (
              <div key={name} className="flex items-center gap-2 group cursor-pointer">
                <div className="w-6 h-6 rounded bg-foreground/20 group-hover:bg-primary transition-colors" />
                <span className="font-bold text-lg text-foreground/60 group-hover:text-foreground transition-colors">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default HeroSection;
