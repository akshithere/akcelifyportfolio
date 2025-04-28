import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import { useKonamiCode } from "./hooks/useKonamiCode";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/projects" component={Projects} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const konamiActivated = useKonamiCode();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className={`scanlines ${konamiActivated ? 'konami-code-active' : ''}`}>
          <Toaster />
          <Router />
          
          {/* Easter Egg that appears when Konami code is activated */}
          {konamiActivated && (
            <div className="fixed bottom-4 right-4 z-50 p-4 bg-dark-screen border-2 border-arcade-green easter-egg animate-bounce">
              <div className="font-press-start text-sm text-arcade-green neon-glow">
                KONAMI CODE ACTIVATED!
              </div>
              <div className="text-xs text-retro-magenta mt-2">
                Extra lives unlocked! 🕹️
              </div>
            </div>
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
