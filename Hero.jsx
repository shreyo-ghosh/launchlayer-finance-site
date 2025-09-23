import React, { useState } from 'react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!consent) return;
    // Placeholder: integrate with your email service (e.g., Mailchimp, ConvertKit)
    alert('Thanks for subscribing! Please check your inbox to confirm.');
    setEmail('');
    setConsent(false);
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-blue-800 text-white pt-28 pb-20 px-6"
      aria-labelledby="hero-heading"
    >
      {/* Background shapes */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-10 -left-10 w-80 h-80 rounded-full bg-gradient-to-br from-gold-400 to-amber-500 blur-3xl mix-blend-overlay"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 blur-3xl mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <header className="space-y-4">
              <p className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/10 ring-1 ring-white/20">
                Trusted by 10,000+ readers • Actionable finance every week
              </p>
              <h1 id="hero-heading" className="text-4xl lg:text-6xl font-extrabold leading-tight">
                Build Wealth with Confidence
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-400 to-yellow-300">
                  Clarity. Discipline. Growth.
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-blue-100 leading-relaxed max-w-xl">
                Premium playbooks, smart calculators, and research-grade insights to help you plan, invest, and grow your money—confidently and consistently.
              </p>
            </header>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4" role="group" aria-label="Primary calls to action">
              <a
                href="#calculators"
                className="bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-600 hover:to-amber-700 text-navy-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900"
              >
                Explore Calculators
              </a>
              <a
                href="#services"
                className="border-2 border-white/80 hover:bg-white hover:text-navy-900 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-navy-900"
              >
                View Services
              </a>
            </div>

            {/* Newsletter (GDPR-compliant) */}
            <form
              id="newsletter-signup"
              className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 items-start"
              aria-describedby="newsletter-desc"
              onSubmit={handleSubmit}
            >
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg px-4 py-3 text-navy-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-400"
                aria-required="true"
              />
              <button
                type="submit"
                disabled={!consent}
                className={`rounded-lg px-6 py-3 font-semibold transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-900 ${
                  consent
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800'
                    : 'bg-gray-400 text-gray-100 cursor-not-allowed'
                }`}
                aria-disabled={!consent}
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
              <div className="sm:col-span-2 text-xs text-blue-100/90" id="newsletter-desc">
                <label className="inline-flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/50 text-emerald-600 focus:ring-emerald-500"
                    aria-describedby="consent-help"
                  />
                  <span>
                    I agree to receive the LaunchLayer Finance newsletter and accept the
                    <a href="/privacy" className="underline decoration-gold-400 underline-offset-2 hover:opacity-90"> Privacy Policy</a>.
                    You can unsubscribe anytime. No spam.
                  </span>
                </label>
                <p id="consent-help" className="mt-1">We process your data in compliance with GDPR.</p>
              </div>
            </form>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative" aria-hidden="true">
            <div className="relative z-10">
              <img
                src="./hero-finance.png"
                alt="Illustration of financial dashboard with charts and growth indicators"
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="eager"
                width={960}
                height={720}
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-gold-400 to-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
