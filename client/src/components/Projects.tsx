import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { PixelCard } from "./ui/pixel-card";
import { PixelButton } from "./ui/pixel-button";
import { ExternalLink, Github } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const ProjectCard = ({ project }: { project: Project }) => {
  // Create color-specific class names based on the project's border color
  const colorClass = project.borderColor === 'arcade-green' 
    ? 'text-arcade-green neon-glow' 
    : project.borderColor === 'retro-magenta'
      ? 'text-retro-magenta neon-glow-magenta'
      : project.borderColor === 'crt-cyan'
        ? 'text-crt-cyan neon-glow-cyan'
        : 'text-coin-yellow';
  
  return (
    <div className="group perspective-800">
      <div className="transform transition-transform duration-500 preserve-3d group-hover:rotate-y-5 group-hover:scale-105">
        <div className="border-2 border-arcade-green bg-dark-screen overflow-hidden backface-hidden">
          {/* Pixelated arcade overlay */}
          <div className="relative overflow-hidden crt-effect">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-48 object-cover object-center pixelated"
              style={{ imageRendering: "pixelated" }}
            />
            
            {/* Glitch effect overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-r from-transparent via-white to-transparent animate-glitch-h"></div>
            
            {/* Top game label tag */}
            <div className="absolute top-0 right-0 px-2 py-1 font-press-start text-xs text-dark-screen bg-arcade-green">
              <span className="flicker-text">INSERT COIN</span>
            </div>
          </div>
          
          <div className="p-4 bg-dark-screen border-t-2 border-arcade-green relative overflow-hidden">
            {/* Scanline effect for project details */}
            <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none"></div>
            
            <h3 
              className={`font-press-start text-lg mb-2 ${colorClass}`}
              data-text={project.title}
            >
              {project.title}
            </h3>
            
            <p className="font-vt323 text-xl mb-4 text-light-gray">{project.description}</p>
            
            <div className="flex justify-between">
              {project.demoUrl && (
                <PixelButton asChild variant="primary" size="sm">
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="font-vt323">
                    <ExternalLink className="h-4 w-4 mr-1" /> PLAY
                  </a>
                </PixelButton>
              )}
              {project.codeUrl && (
                <PixelButton asChild variant="outline" size="sm">
                  <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="font-vt323">
                    <Github className="h-4 w-4 mr-1" /> CODE
                  </a>
                </PixelButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectSkeleton = () => (
  <div className="bg-dark-screen rounded-lg overflow-hidden border-2 border-arcade-green">
    <Skeleton className="w-full h-48" />
    <div className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex justify-between">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
);

const Projects = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  return (
    <section id="projects" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-press-start text-2xl md:text-3xl mb-12 text-center text-coin-yellow">PROJECTS</h2>
        
        {error ? (
          <div className="text-center text-red-500 font-vt323 text-xl">
            Failed to load projects. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <>
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
              </>
            ) : (
              projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
