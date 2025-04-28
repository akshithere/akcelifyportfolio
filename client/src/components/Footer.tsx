const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t-2 border-arcade-green">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-arcade-green font-press-start text-lg mb-4 md:mb-0">
            AKCELIFY<span className="blink">_</span>
          </div>
          <div className="font-vt323 text-lg">
            © {currentYear} | DESIGNED WITH <span className="text-retro-magenta">❤</span> BY AKSHIT
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
