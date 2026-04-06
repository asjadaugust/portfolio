import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Journey from "@/components/Journey";
import Projects from "@/components/Projects/Projects";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Journey />
      <Projects />
      <Contact />
    </main>
  );
}
