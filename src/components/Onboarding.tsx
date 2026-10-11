import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'From Your Idea To Your Project Submission.',
      description: 'We truly appreciate all the support & trust you have given to Team Yuktha till now.'
    },
    {
      title: 'Minimal & Reasonable Student Charges.',
      description: 'Transparent quotes from ₹1,499 to ₹2,499 with 1-on-1 viva coaching & complete IEEE report.'
    },
    {
      title: 'Fast Review & Direct WhatsApp Alert.',
      description: 'Connect directly on 9701369352 for fastest review, base papers & presentation guidance.'
    }
  ];

  const handleNext = () => {
    if (activeSlide < slides.length - 1) {
      setActiveSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Background ambient red curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-950/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-red-900/25 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-red-950/40 via-red-900/15 to-transparent blur-2xl" />
        {/* Subtle curved wave pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-15" preserveAspectRatio="none" viewBox="0 0 400 800">
          <path d="M0,320 C150,260 250,420 400,340 L400,800 L0,800 Z" fill="#991b1b" />
          <path d="M0,450 C120,400 280,520 400,480 L400,800 L0,800 Z" fill="#7f1d1d" />
        </svg>
      </div>

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5">
        <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
          YUKTHA SERVICES
        </span>
        <button
          onClick={onComplete}
          className="text-xs font-medium text-slate-300 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 px-3.5 py-1.5 rounded-lg transition-all"
        >
          Skip
        </button>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto my-auto w-full">
        {/* Brand Lockup */}
        <div className="mb-6">
          <BrandLogo size="xl" variant="light" showSubtitle={true} />
        </div>

        {/* Red Accent Dash */}
        <div className="w-16 h-1 bg-red-600 rounded-full my-6 shadow-sm shadow-red-500/50" />

        {/* Dynamic Slide Content */}
        <div className="min-h-[140px] flex flex-col items-center justify-center transition-all duration-300">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-3 leading-snug">
            {slides[activeSlide].title}
          </h1>

          {activeSlide === 0 ? (
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed max-w-xs sm:max-w-md mx-auto tracking-normal">
              {slides[activeSlide].description}
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed max-w-xs sm:max-w-sm">
              {slides[activeSlide].description}
            </p>
          )}
        </div>

        {/* Carousel Progress Indicators */}
        <div className="flex items-center gap-2 mt-10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === idx ? 'w-8 bg-red-600' : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </main>

      {/* Bottom CTA Area */}
      <footer className="relative z-10 p-6 max-w-md mx-auto w-full">
        <button
          onClick={handleNext}
          className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-red-950/60 transition-all text-base"
        >
          <span>{activeSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  );
}
