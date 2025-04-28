import Navbar from "@/components/Navbar";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <div className="min-h-screen bg-dark-screen text-light-gray scanlines">
      <Navbar />
      <main>
        <BlogList />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
