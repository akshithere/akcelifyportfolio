import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Terminal } from "./ui/terminal";
import { PixelButton } from "./ui/pixel-button";
import { Mail, MapPin, Gamepad2, Github, Linkedin, Twitter } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="font-press-start text-2xl md:text-3xl mb-12 text-center text-crt-cyan">CONTACT</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <Terminal className="h-full flex flex-col justify-center">
              <h3 className="font-press-start text-xl mb-6 text-arcade-green">GET IN TOUCH</h3>
              <p className="terminal-prefix font-vt323 text-xl mb-4">Ready to start a new quest?</p>
              <p className="terminal-prefix font-vt323 text-xl mb-4">Let's collaborate and build something amazing!</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <Mail className="text-arcade-green mr-3 h-5 w-5" />
                  <span className="font-vt323 text-xl">akshit@akcelify.dev</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-arcade-green mr-3 h-5 w-5" />
                  <span className="font-vt323 text-xl">Developer Land, Code City</span>
                </div>
                <div className="flex items-center">
                  <Gamepad2 className="text-arcade-green mr-3 h-5 w-5" />
                  <span className="font-vt323 text-xl">Level 99 Developer</span>
                </div>
              </div>
              <div className="mt-8 flex space-x-6">
                <a href="https://github.com/akshithere" target="_blank" rel="noopener noreferrer" className="text-2xl text-arcade-green hover:text-coin-yellow transition duration-300">
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/akshit-54244a225/" target="_blank" rel="noopener noreferrer" className="text-2xl text-arcade-green hover:text-coin-yellow transition duration-300">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-2xl text-arcade-green hover:text-coin-yellow transition duration-300">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </Terminal>
          </div>
          <div>
            <div className="vhs-tracking relative crt-effect">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-dark-screen border-2 border-retro-magenta px-3 py-1 font-press-start text-xs text-retro-magenta z-10 neon-glow-magenta">
                REC ● CONTACT.EXE
              </div>
              
              <form 
                onSubmit={handleSubmit(onSubmit)}
                className="bg-dark-screen p-6 border-2 border-arcade-green relative overflow-hidden"
              >
                {/* Scan line overlay */}
                <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
                
                {/* VHS tracking line that moves across form */}
                <div className="absolute inset-0 vhs-tracking pointer-events-none"></div>
                
                <div className="mb-6 relative">
                  <label htmlFor="name" className="block font-press-start text-sm mb-2 text-arcade-green">
                    <span className="inline-block flicker-text">PLAYER_NAME</span>
                  </label>
                  <div className="relative">
                    <input 
                      id="name"
                      {...register("name")}
                      className="w-full bg-black border-2 border-arcade-green p-2 font-vt323 text-xl text-arcade-green focus:outline-none focus:border-coin-yellow"
                      placeholder="Enter your name..."
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 pointer-events-none"></div>
                  </div>
                  {errors.name && (
                    <p className="text-retro-magenta font-vt323 mt-1 blink">ERROR: {errors.name.message}</p>
                  )}
                </div>
                
                <div className="mb-6 relative">
                  <label htmlFor="email" className="block font-press-start text-sm mb-2 text-arcade-green">
                    <span className="inline-block flicker-text">PLAYER_EMAIL</span>
                  </label>
                  <div className="relative">
                    <input 
                      id="email" 
                      type="email"
                      {...register("email")}
                      className="w-full bg-black border-2 border-arcade-green p-2 font-vt323 text-xl text-arcade-green focus:outline-none focus:border-coin-yellow"
                      placeholder="Enter your email..."
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 pointer-events-none"></div>
                  </div>
                  {errors.email && (
                    <p className="text-retro-magenta font-vt323 mt-1 blink">ERROR: {errors.email.message}</p>
                  )}
                </div>
                
                <div className="mb-6 relative">
                  <label htmlFor="message" className="block font-press-start text-sm mb-2 text-arcade-green">
                    <span className="inline-block flicker-text">PLAYER_MESSAGE</span>
                  </label>
                  <div className="relative">
                    <textarea 
                      id="message"
                      {...register("message")}
                      rows={5}
                      className="w-full bg-black border-2 border-arcade-green p-2 font-vt323 text-xl text-arcade-green focus:outline-none focus:border-coin-yellow"
                      placeholder="Type your message here..."
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 pointer-events-none"></div>
                  </div>
                  {errors.message && (
                    <p className="text-retro-magenta font-vt323 mt-1 blink">ERROR: {errors.message.message}</p>
                  )}
                </div>
                
                <div className="relative">
                  <PixelButton 
                    type="submit" 
                    variant="primary" 
                    className="w-full font-press-start text-sm py-3" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="arcade-text-flicker">TRANSMITTING...</span>
                    ) : (
                      <span className="neon-glow">SEND_MESSAGE.EXE</span>
                    )}
                  </PixelButton>
                  
                  {/* 8-bit pixel border animation when hovering over submit button */}
                  <div className="absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="pixel-border-animated w-16 h-8"></div>
                  </div>
                </div>
                
                {/* Easter egg hidden message */}
                <div className="mt-4 text-xs font-vt323 text-gray-600 opacity-30 hover:opacity-100 transition-opacity text-center">
                  <span className="hidden konami-code-active:block">CHEAT CODE ACTIVATED: PRIORITY MESSAGE</span>
                </div>
              </form>
              
              {/* Tape reels animation */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-dark-screen border-t-2 border-arcade-green px-2 py-1 font-vt323 text-xs text-arcade-green flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full border border-arcade-green animate-spin"></div>
                <span>REC</span>
                <div className="w-3 h-3 rounded-full border border-arcade-green animate-spin animation-delay-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
