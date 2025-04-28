import { PixelButton } from "./ui/pixel-button";
import { Terminal } from "./ui/terminal";
import { Github, Linkedin } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h1 className="font-press-start text-3xl md:text-4xl mb-6 text-arcade-green">
              HELLO WORLD!
            </h1>
            <Terminal className="mb-6">
              <Terminal.Line>I'm Akshit, a Developer</Terminal.Line>
              <Terminal.Line>Crafting code & creating experiences</Terminal.Line>
              <Terminal.Line>Let's build something together</Terminal.Line>
            </Terminal>
            <div className="flex space-x-4 mt-8">
              <PixelButton 
                asChild
                variant="primary"
                className="font-vt323 text-lg"
              >
                <a href="https://github.com/akshithere" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 mr-2" />
                  GITHUB
                </a>
              </PixelButton>
              <PixelButton 
                asChild
                variant="secondary"
                className="font-vt323 text-lg"
              >
                <a href="https://www.linkedin.com/in/akshit-54244a225/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LINKEDIN
                </a>
              </PixelButton>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="crt-effect">
                <div className="overflow-hidden w-full h-full relative">
                  {/* Main Hero Image */}
                  <img 
                    src="https://res.cloudinary.com/dm73uqsw2/image/upload/v1745868741/codejam_xgslle.jpg" 
                    alt="Code Jam Hero" 
                    className="w-full border-4 border-arcade-green"
                    style={{
                      filter: "brightness(1.1) contrast(1.2) saturate(1.1)",
                      mixBlendMode: "screen",
                      imageRendering: "pixelated"
                    }}
                  />
                  
                  {/* Overlay scanlines and glitch effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-arcade-green/30 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAwMDAiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]"></div>
                </div>
              </div>
              
              {/* Pixelated name tag with glowing effect */}
              <div 
                className="absolute -bottom-4 -right-4 bg-dark-screen text-coin-yellow p-2 font-press-start text-xs border-2 border-arcade-green neon-glow"
                style={{ transform: "rotate(3deg)" }}
              >
                <span className="flicker-text">LEVEL 99 DEVELOPER</span>
              </div>
              
              {/* Retro arcade text overlay at the top */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-dark-screen border-2 border-retro-magenta p-2 font-press-start text-xs text-retro-magenta neon-glow-magenta">
                INSERT COIN TO START
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
