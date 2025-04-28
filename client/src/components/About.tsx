import { Terminal } from "./ui/terminal";

const skillsList = [
  { name: "JavaScript", percentage: 90 },
  { name: "React", percentage: 85 },
  { name: "Node.js", percentage: 80 },
  { name: "Python", percentage: 75 },
];

const AboutCard = ({ 
  title, 
  description, 
  borderColor,
  icon
}: { 
  title: string; 
  description: string;
  borderColor: string;
  icon: string;
}) => (
  <div className={`bg-dark-screen p-6 rounded-lg border-2 border-${borderColor}`}>
    <div className="w-16 h-16 mx-auto mb-4">
      <img src={icon} alt={`${title} Icon`} className="pixelated w-full" />
    </div>
    <h3 className={`font-press-start text-lg mb-3 text-center text-${borderColor}`}>{title}</h3>
    <p className="font-vt323 text-xl text-center">{description}</p>
  </div>
);

const Skill = ({ name, percentage }: { name: string; percentage: number }) => (
  <div className="skill-item">
    <p className="font-vt323 text-xl">{name}</p>
    <div className="w-full bg-gray-700 h-4 mt-1">
      <div 
        className="bg-arcade-green h-4" 
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

const About = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-dark-screen to-black">
      <div className="container mx-auto px-4">
        <h2 className="font-press-start text-2xl md:text-3xl mb-12 text-center text-crt-cyan">ABOUT ME</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AboutCard 
            title="CODER" 
            description="Passionate about clean, efficient code. I transform complex problems into elegant solutions."
            borderColor="arcade-green"
            icon="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
          />
          <AboutCard 
            title="CREATOR" 
            description="Building digital experiences that engage and inspire. I love bringing ideas to life."
            borderColor="retro-magenta"
            icon="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
          />
          <AboutCard 
            title="LEARNER" 
            description="Always leveling up. I embrace new technologies and continuously expand my skill set."
            borderColor="crt-cyan"
            icon="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
          />
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Terminal>
            <h3 className="font-press-start text-xl mb-4 text-arcade-green">SKILLS:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skillsList.map((skill) => (
                <Skill key={skill.name} name={skill.name} percentage={skill.percentage} />
              ))}
            </div>
          </Terminal>
        </div>
      </div>
    </section>
  );
};

export default About;
