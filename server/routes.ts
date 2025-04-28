import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema, initMailgun, sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog post routes
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Project routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Initialize Mailgun service
  const mailgunConfig = initMailgun();
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the form data
      const validatedData = contactFormSchema.parse(req.body);
      
      console.log("Contact form submission:", validatedData);
      
      // Send email using Mailgun
      const emailSent = await sendContactEmail(mailgunConfig, validatedData);
      
      if (emailSent) {
        res.json({ success: true, message: "Message sent successfully" });
      } else {
        console.warn("Email could not be sent, but form data was valid");
        // We still return success to the user as the form submission was valid
        // In a production environment, you might want to queue this for retry
        res.json({ 
          success: true, 
          message: "Your message was received but email delivery is pending. We'll get back to you soon." 
        });
      }
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(400).json({ success: false, message: "Invalid form data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
