import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import BlogList from "@/components/BlogList";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-dark-screen text-light-gray scanlines">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <BlogList />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
