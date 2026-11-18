import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    title1: "Learn. Innovate.",
    title2: "Excel.",
    subtitle: "Empowering the next generation of innovators and leaders.",
    buttonText: "Explore Our Campus",
    buttonLink: "/about",
    bgImage: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1800&auto=format&fit=crop&q=85", // Classical grand college portico
    alt: "Sri Venkateswara College of Engineering Main Building"
  },
  {
    id: 2,
    title1: "Discover. Build.",
    title2: "Transform.",
    subtitle: "State-of-the-art AI research laboratories & high-performance computing centers.",
    buttonText: "Explore Programs",
    buttonLink: "/academics",
    bgImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1800&auto=format&fit=crop&q=85",
    alt: "Advanced Engineering Laboratories"
  },
  {
    id: 3,
    title1: "Inspire. Achieve.",
    title2: "Succeed.",
    subtitle: "96% placements with highest CTC of 44 LPA at global tech titans.",
    buttonText: "View Placements",
    buttonLink: "/admissions",
    bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1800&auto=format&fit=crop&q=85",
    alt: "Student Success & Placements"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div
      className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] overflow-hidden select-none bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides images & overlays */}
      {SLIDES.map((slide, index) => {
        const isCurrent = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isCurrent ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
            }`}
            style={{ transition: 'opacity 1s ease-in-out, transform 6s ease-out' }}
          >
            {/* Background Image with Dark & Gradient Overlays */}
            <img
              src={slide.bgImage}
              alt={slide.alt}
              className="w-full h-full object-cover object-center"
            />
            {/* Dark gradient overlay matching the uploaded image */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent" />
            <div className="absolute inset-0 bg-black/25" />

            {/* Architecture Building Name Overlay (Engraved Effect) */}
            <div className="hidden lg:block absolute top-12 right-24 text-right">
              <div className="px-6 py-2.5 bg-slate-900/40 backdrop-blur-md rounded-lg border border-white/10 text-white/90 font-serif tracking-widest text-sm uppercase shadow-lg">
                Sri Venkateswara College of Engineering
              </div>
            </div>

            {/* Content Container (Left Aligned matching mockup) */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 w-full">
                <div className="max-w-2xl text-left space-y-4 sm:space-y-6">
                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.15]">
                    {slide.title1}{' '}
                    <span className="text-[#f9b916] drop-shadow-md">
                      {slide.title2}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg lg:text-xl text-slate-100/90 font-sans font-normal max-w-xl leading-relaxed drop-shadow">
                    {slide.subtitle}
                  </p>

                  {/* CTA Button in vibrant yellow */}
                  <div className="pt-2">
                    <Link
                      to={slide.buttonLink}
                      className="inline-flex items-center gap-2.5 bg-[#f9b916] hover:bg-[#eab308] text-slate-950 font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base group"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrow Controls: Left `<` and Right `>` */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 border border-white/20 hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 border border-white/20 hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicator Dots (Bottom center matching mockup) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, idx) => {
          const active = idx === currentSlide;
          return (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 transition-all duration-300 rounded-full ${
                active ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
