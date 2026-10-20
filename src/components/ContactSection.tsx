import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Clock, Send, ArrowUpRight, Github, Linkedin, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [nepalTime, setNepalTime] = useState<string>('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Senior Full-Stack Engineering / Technical Leadership Inquiry',
    message: '',
  });

  // Calculate live Nepal Time (UTC +5:45)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Nepal is UTC+5:45
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const nepalOffset = 5.75 * 3600000;
      const nepalDate = new Date(utc + nepalOffset);
      setNepalTime(
        nepalDate.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);
    // Create mailto link
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#202925] text-[#F7F6F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DCE5DC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DCE5DC]"></span>
            <span>05. Initiate Collaboration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#F7F6F2]">
            Let&apos;s build resilient systems together.
          </h2>

          <p className="text-sm sm:text-base text-[#DCE5DC]/80 leading-relaxed">
            I am currently open to select technical leadership, full-stack architectural consulting, and high-impact engineering roles. Whether you are scaling an AI evaluation pipeline or optimizing microservices throughput, let&apos;s talk.
          </p>
        </div>

        {/* 2-Column Split: Direct Contact Cards vs Clean Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info & Timezone */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1-Click Copy Email Card */}
            <div className="p-6 rounded-lg bg-white/5 border border-white/10 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#DCE5DC]/70">
                <span className="uppercase tracking-wider">Primary Email</span>
                <span className="flex items-center gap-1 font-mono-num">
                  <Clock className="w-3.5 h-3.5 text-[#DCE5DC]" />
                  Nepal Time: {nepalTime || '5:45+ UTC'}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-base sm:text-lg font-bold text-[#F7F6F2] hover:text-[#DCE5DC] transition-colors break-all"
                >
                  {PERSONAL_INFO.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-[#F7F6F2] text-xs font-medium flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#DCE5DC]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-[#DCE5DC]/60 pt-1">
                Typical response turnaround within 24 business hours.
              </div>
            </div>

            {/* Direct Phone & Location Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs text-[#DCE5DC]/60 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#DCE5DC]" />
                  Direct Phone
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm font-semibold text-[#F7F6F2] hover:text-[#DCE5DC] transition-colors block font-mono-num"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>

              <div className="p-5 rounded-lg bg-white/5 border border-white/10 space-y-1">
                <div className="text-xs text-[#DCE5DC]/60 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#DCE5DC]" />
                  Base Location
                </div>
                <div className="text-sm font-semibold text-[#F7F6F2]">
                  {PERSONAL_INFO.location}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-5 rounded-lg bg-white/5 border border-white/10 space-y-3">
              <div className="text-xs text-[#DCE5DC]/60 uppercase tracking-wider">
                Professional Profiles
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-between p-3 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#F7F6F2] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#DCE5DC]" />
                    LinkedIn
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#DCE5DC]" />
                </a>

                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-between p-3 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-[#F7F6F2] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#DCE5DC]" />
                    GitHub
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#DCE5DC]" />
                </a>
              </div>
            </div>

            <div className="text-xs text-[#DCE5DC]/50 flex items-center gap-2 pt-2">
              <Shield className="w-4 h-4 shrink-0 text-[#DCE5DC]" />
              <span>Full confidentiality & professional NDAs respected.</span>
            </div>
          </div>

          {/* Right: Clean, Functional Contact Form */}
          <div className="lg:col-span-7 bg-white/5 rounded-lg border border-white/10 p-6 sm:p-8 md:p-10 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#F7F6F2]">
                Send a Direct Message
              </h3>
              <p className="text-xs text-[#DCE5DC]/70">
                Inquire about engineering architecture, contract scopes, or team leadership.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-md bg-[#315C4B]/40 border border-[#315C4B] space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2 text-sm font-bold text-[#DCE5DC]">
                  <Check className="w-5 h-5 text-[#DCE5DC]" />
                  <span>Message Prepared & Mail Client Opened</span>
                </div>
                <p className="text-xs text-[#F7F6F2] leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. If your default mail client did not automatically open, feel free to email me directly at{' '}
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="underline font-semibold">
                    {PERSONAL_INFO.email}
                  </a>.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs text-[#DCE5DC] underline mt-2 hover:text-white"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-medium text-[#DCE5DC]">
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md bg-white/5 border border-white/15 text-[#F7F6F2] text-xs focus:border-[#DCE5DC] focus:outline-hidden transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-medium text-[#DCE5DC]">
                      Your Work Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-md bg-white/5 border border-white/15 text-[#F7F6F2] text-xs focus:border-[#DCE5DC] focus:outline-hidden transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-medium text-[#DCE5DC]">
                    Engagement Focus
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md bg-white/5 border border-white/15 text-[#F7F6F2] text-xs focus:border-[#DCE5DC] focus:outline-hidden transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-medium text-[#DCE5DC]">
                    Message / Project Details *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Describe your project, team requirements, timeline, or architecture challenges..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md bg-white/5 border border-white/15 text-[#F7F6F2] text-xs focus:border-[#DCE5DC] focus:outline-hidden transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-md bg-[#315C4B] hover:bg-[#26493B] text-[#F7F6F2] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inbound Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
