import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen bg-dark-screen text-light-gray scanlines">
      <Navbar />
      <main>
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
