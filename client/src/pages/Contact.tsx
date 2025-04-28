import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-dark-screen text-light-gray scanlines">
      <Navbar />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
