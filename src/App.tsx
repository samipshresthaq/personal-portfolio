import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { SkillsArchitecture } from './components/SkillsArchitecture';
import { AboutPhilosophy } from './components/AboutPhilosophy';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeViewerModal } from './components/ResumeViewerModal';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handleOpenResume = () => {
    setIsResumeModalOpen(true);
  };

  const handleOpenContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-vibrant-gradient text-[#202321] selection:bg-[#DCE5DC] selection:text-[#315C4B] relative flex flex-col font-sans overflow-x-hidden">
      {/* Ambient background glows for rich vibrancy & depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Subtle architectural dot grid */}
        <div className="absolute inset-0 bg-grid-ambient opacity-40"></div>

        {/* Top-Right Forest & Sage Radiant Glow */}
        <div className="absolute -top-32 right-[-10%] w-[750px] h-[750px] bg-gradient-to-br from-[#DCE5DC] via-[#315C4B]/20 to-transparent rounded-full blur-[120px] opacity-75"></div>

        {/* Mid-Left Emerald Aura */}
        <div className="absolute top-[35%] -left-36 w-[650px] h-[650px] bg-gradient-to-tr from-[#DCE5DC] via-[#315C4B]/18 to-transparent rounded-full blur-[110px] opacity-70"></div>

        {/* Lower-Right Luminous Mesh */}
        <div className="absolute top-[65%] right-[-8%] w-[700px] h-[700px] bg-gradient-to-tl from-[#DCE5DC] via-[#315C4B]/15 to-transparent rounded-full blur-[130px] opacity-65"></div>
      </div>

      {/* Top Navigation */}
      <Navbar
        onOpenResume={handleOpenResume}
        onOpenContact={handleOpenContact}
      />

      {/* Main Page Sections */}
      <main className="flex-1 relative z-10">
        {/* 1. Hero Section with Typographic Hierarchy & Topology */}
        <Hero
          onOpenResume={handleOpenResume}
          onOpenContact={handleOpenContact}
        />

        {/* 2. Selected Work / Projects */}
        <Projects />

        {/* 3. Professional Experience & Leadership Timeline */}
        <Experience />

        {/* 4. Skills & System Architecture */}
        <SkillsArchitecture />

        {/* 5. About & Engineering Philosophy */}
        <AboutPhilosophy />

        {/* 6. High-Contrast Dark Contact Section */}
        <ContactSection />
      </main>

      {/* 7. Footer */}
      <Footer onOpenResume={handleOpenResume} />

      {/* Interactive PDF Resume Viewer Modal */}
      <ResumeViewerModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}
