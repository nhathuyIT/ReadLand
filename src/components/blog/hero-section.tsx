import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export function HeroSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return (
    <section className="relative overflow-hidden border-b bg-linear-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Background grid - behind content */}
      <div className="absolute inset-0 bg-grid-slate-100 mask-[linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:bg-grid-slate-700/25 dark:mask-[linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] pointer-events-none"></div>

      <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Your Daily Tech Insights</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Stay Ahead in
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-orange-600">
                Technology
              </span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Discover the latest trends, tutorials, and insights from the world
              of technology. Join thousands of developers and tech enthusiasts.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                WANT TO POST YOUR OWN BLOG?
              </p>
              <div className="relative flex-1">
                {!user ? (
                  <Button
                    onClick={() => navigate("/login")}
                    type="button"
                    className="bg-orange-600 hover:bg-orange-700 cursor-pointer px-5 py-2 text-md h-auto"
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate("/account/my-posts")}
                    type="button"
                    className="bg-orange-600 hover:bg-orange-700 cursor-pointer px-5 py-2 text-md h-auto"
                  >
                    Posts
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Join 50,000+ subscribers. Unsubscribe anytime.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="flex items-center justify-center">
              <img 
                src="/website-poster-nobg.png" 
                alt="ReadLand Poster" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
