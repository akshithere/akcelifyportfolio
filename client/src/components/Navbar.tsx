import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="border-b-2 border-arcade-green sticky top-0 bg-dark-screen z-40">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-arcade-green font-press-start text-xl md:text-2xl tracking-wider">
          AKCELIFY<span className="blink">_</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link 
            href="/" 
            className={`font-vt323 text-xl transition duration-300 ${location === "/" ? "text-arcade-green" : "hover:text-arcade-green"}`}
          >
            HOME
          </Link>
          <Link 
            href="/projects" 
            className="font-vt323 text-xl hover:text-arcade-green transition duration-300"
          >
            PROJECTS
          </Link>
          <Link 
            href="/blog" 
            className={`font-vt323 text-xl transition duration-300 ${location.startsWith("/blog") ? "text-arcade-green" : "hover:text-arcade-green"}`}
          >
            BLOGS
          </Link>
          <Link 
            href="/contact" 
            className={`font-vt323 text-xl transition duration-300 ${location === "/contact" ? "text-arcade-green" : "hover:text-arcade-green"}`}
          >
            CONTACT
          </Link>
        </nav>
        <button onClick={toggleMenu} className="md:hidden text-arcade-green focus:outline-none">
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-dark-screen border-t-2 border-arcade-green">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`font-vt323 text-xl transition duration-300 ${location === "/" ? "text-arcade-green" : "hover:text-arcade-green"}`}
            >
              HOME
            </Link>
            <Link 
              href="/#projects" 
              className="font-vt323 text-xl hover:text-arcade-green transition duration-300"
            >
              PROJECTS
            </Link>
            <Link 
              href="/blog" 
              className={`font-vt323 text-xl transition duration-300 ${location.startsWith("/blog") ? "text-arcade-green" : "hover:text-arcade-green"}`}
            >
              BLOGS
            </Link>
            <Link 
              href="/contact" 
              className={`font-vt323 text-xl transition duration-300 ${location === "/contact" ? "text-arcade-green" : "hover:text-arcade-green"}`}
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
