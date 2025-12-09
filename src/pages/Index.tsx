import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import FAQs from "@/components/FAQs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Crisp Cleaning | Professional Cleaning Services Melbourne</title>
        <meta 
          name="description" 
          content="Transforming spaces, one clean at a time. Professional residential and commercial cleaning services in Melbourne. Get a free quote today!" 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <Reviews />
          <FAQs />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
