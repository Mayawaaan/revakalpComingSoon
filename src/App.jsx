import { useEffect, useRef, useState } from 'react';
import BrandFrame from './components/BrandFrame';
import NotifyForm from './components/NotifyForm';
import SilkLoomCanvas from './components/SilkLoomCanvas';

export default function App() {
  const [theme, setTheme] = useState('burgundy');
  const stageRef = useRef(null);
  const isIvory = theme === 'ivory';

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return undefined;

    let rafId = 0;
    let latestX = 50;
    let latestY = 45;

    const handlePointerMove = (e) => {
      latestX = (e.clientX / Math.max(window.innerWidth, 1)) * 100;
      latestY = (e.clientY / Math.max(window.innerHeight, 1)) * 100;

      if (!rafId) {
        rafId = window.requestAnimationFrame(() => {
          el.style.setProperty('--mx', `${latestX.toFixed(2)}%`);
          el.style.setProperty('--my', `${latestY.toFixed(2)}%`);
          rafId = 0;
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'burgundy' ? 'ivory' : 'burgundy'));
  };

  return (
    <div
      ref={stageRef}
      style={{ '--mx': '50%', '--my': '45%' }}
      className={`relative min-h-dvh w-full overflow-hidden flex flex-col justify-between transition-colors duration-700 ${
        isIvory ? 'bg-[#F7F1E5] text-[#38131E]' : 'bg-[#2B0E17] text-[#F7F1E5]'
      }`}
    >
      {/* Layer 1: Velvet / Heirloom Radial Surface */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: isIvory
            ? 'radial-gradient(ellipse 80% 70% at 50% 42%, #FAF6ED 0%, #F7F1E5 55%, #EFE4D0 100%)'
            : 'radial-gradient(ellipse 75% 65% at 50% 42%, #3D1622 0%, #2B0E17 58%, #19070D 100%)',
        }}
      />

      {/* Layer 2: Ambient Breathing Aura Orb */}
      <div
        aria-hidden="true"
        className="rk-orb fixed top-1/2 left-1/2 w-[560px] h-[560px] max-w-[92vw] max-h-[92vw] rounded-full blur-3xl pointer-events-none"
        style={{
          background: isIvory
            ? 'radial-gradient(circle, rgba(212,175,99,0.20) 0%, rgba(168,118,44,0.06) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(212,175,99,0.14) 0%, rgba(56,19,30,0.28) 52%, transparent 75%)',
        }}
      />

      {/* Layer 3: Cursor-reactive Candlelight Radial Glow */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: isIvory
            ? 'radial-gradient(480px circle at var(--mx) var(--my), rgba(212,175,99,0.13), transparent 70%)'
            : 'radial-gradient(520px circle at var(--mx) var(--my), rgba(241,216,137,0.08), transparent 70%)',
        }}
      />

      {/* Layer 4: Living Loom Canvas (Zari threads & floating motes) */}
      <SilkLoomCanvas theme={theme} />

      {/* Layer 5: Subtle Silk-Paper Grain */}
      <div aria-hidden="true" className="rk-grain fixed inset-0 pointer-events-none z-[2]" />

      {/* Layer 6: Architectural Double-Hairline Frame */}
      <BrandFrame isIvory={isIvory} />

      {/* Foreground Content */}
      <div className="relative z-20 flex-1 flex flex-col justify-between px-7 py-8 sm:px-12 sm:py-10 md:px-16 md:py-12">
        {/* Top Editorial Bar */}
        <header
          style={{ '--rk-delay': '120ms' }}
          className="rk-reveal flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2 items-center justify-center" aria-hidden="true">
              <span
                className={`rk-pulse-ring absolute inline-flex h-full w-full rounded-full ${
                  isIvory ? 'bg-[#7D551A]' : 'bg-[#D4AF63]'
                }`}
              />
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  isIvory ? 'bg-[#7D551A]' : 'bg-[#F1D889]'
                }`}
              />
            </span>
            <span
              className={`text-[10px] sm:text-[11px] uppercase tracking-[0.26em] font-medium ${
                isIvory ? 'text-[#7D551A]' : 'text-[#D4AF63]/90'
              }`}
            >
              Atelier in Preparation
            </span>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={isIvory}
            aria-label={`Switch surface theme to ${isIvory ? 'Royal Burgundy' : 'Atelier Ivory'}`}
            className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-1 ${
              isIvory
                ? 'border-[#38131E]/20 bg-[#38131E]/[0.04] text-[#38131E] hover:border-[#38131E]/45 focus-visible:ring-[#38131E]'
                : 'border-[#D4AF63]/28 bg-[#38131E]/40 text-[#F7F1E5]/85 hover:border-[#D4AF63]/60 hover:text-[#FFF0B9] focus-visible:ring-[#D4AF63]'
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full border transition-colors duration-300 ${
                isIvory
                  ? 'bg-[#38131E] border-[#7D551A]/40'
                  : 'bg-[#F7F1E5] border-[#D4AF63]/60'
              }`}
            />
            <span>{isIvory ? 'Burgundy' : 'Ivory'}</span>
          </button>
        </header>

        {/* Hero Centerpiece */}
        <main className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full py-8 sm:py-10">
          {/* Official Master Logo (untouched quiet space & aspect ratio) */}
          <div style={{ '--rk-delay': '260ms' }} className="rk-reveal mb-7 sm:mb-9">
            <img
              src={
                isIvory
                  ? '/branding/logos/svg/revakalp-primary-burgundy.svg'
                  : '/branding/logos/svg/revakalp-primary-gold.svg'
              }
              alt="REVAKALP — Weaving Life Into Time"
              className="revakalp-logo revakalp-logo--hero mx-auto w-[min(80vw,430px)] sm:w-[min(76vw,480px)] h-auto select-none"
            />
          </div>

          {/* Animated Golden Thread Divider */}
          <div
            style={{ '--rk-delay': '460ms' }}
            aria-hidden="true"
            className="rk-thread-animate flex items-center justify-center w-52 sm:w-64 mb-7 sm:mb-8"
          >
            <div
              className={`h-px flex-1 ${
                isIvory
                  ? 'bg-gradient-to-r from-transparent via-[#A8762C]/55 to-[#7D551A]/75'
                  : 'bg-gradient-to-r from-transparent via-[#D4AF63]/55 to-[#F1D889]/80'
              }`}
            />
            <span
              className={`mx-3 h-1.5 w-1.5 rotate-45 ${
                isIvory ? 'bg-[#7D551A]' : 'bg-[#F1D889]'
              }`}
            />
            <div
              className={`h-px flex-1 ${
                isIvory
                  ? 'bg-gradient-to-l from-transparent via-[#A8762C]/55 to-[#7D551A]/75'
                  : 'bg-gradient-to-l from-transparent via-[#D4AF63]/55 to-[#F1D889]/80'
              }`}
            />
          </div>

          {/* Editorial Display Headline */}
          <div style={{ '--rk-delay': '600ms' }} className="rk-reveal">
            <p
              className={`text-[10px] sm:text-[11px] uppercase tracking-[0.34em] mb-2.5 ${
                isIvory ? 'text-[#7D551A]' : 'text-[#D4AF63]/85'
              }`}
            >
              The Digital Atelier
            </p>
            <h1
              className={`font-serif text-5xl sm:text-6xl md:text-[4.25rem] font-normal leading-[1.08] tracking-tight mb-5 ${
                isIvory ? 'text-[#38131E]' : 'text-[#F7F1E5]'
              }`}
            >
              Coming{' '}
              <span
                className={`italic font-medium ${
                  isIvory ? 'rk-burgundy-shimmer-text' : 'rk-gold-text'
                }`}
              >
                Soon
              </span>
            </h1>
          </div>

          {/* Poetic Subtitle */}
          <p
            style={{ '--rk-delay': '740ms' }}
            className={`rk-reveal text-sm sm:text-[15px] font-light leading-relaxed max-w-lg mb-7 ${
              isIvory ? 'text-[#38131E]/80' : 'text-[#F7F1E5]/75'
            }`}
          >
            Heirloom silhouettes crafted with quiet grandeur, heritage weaves, and
            timeless grace. Our digital atelier is taking shape.
          </p>

          {/* Heritage Signature Strip */}
          <div
            style={{ '--rk-delay': '860ms' }}
            className={`rk-reveal flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] mb-9 ${
              isIvory ? 'text-[#7D551A]' : 'text-[#D4AF63]'
            }`}
          >
            <span>Indore</span>
            <span aria-hidden="true" className="opacity-65">
              ◆
            </span>
            <span>Ethnic Wear</span>
            <span aria-hidden="true" className="opacity-65">
              ◆
            </span>
            <span>Timeless Style</span>
          </div>

          {/* Private Preview Waitlist */}
          <div style={{ '--rk-delay': '980ms' }} className="rk-reveal w-full">
            <NotifyForm isIvory={isIvory} />
          </div>
        </main>

        {/* Editorial Footer */}
        <footer style={{ '--rk-delay': '1120ms' }} className="rk-reveal pt-4">
          <div
            className={`h-px w-full mb-4 ${
              isIvory
                ? 'bg-gradient-to-r from-transparent via-[#38131E]/18 to-transparent'
                : 'bg-gradient-to-r from-transparent via-[#D4AF63]/22 to-transparent'
            }`}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
            <div className="flex items-center gap-2.5">
              <img
                src={
                  isIvory
                    ? '/branding/icons/revakalp-icon-burgundy-on-ivory.svg'
                    : '/branding/icons/revakalp-icon-gold-transparent.svg'
                }
                alt="REVAKALP monogram"
                className="h-5 w-5 rounded-sm object-contain"
              />
              <span
                className={`text-[10px] uppercase tracking-[0.24em] ${
                  isIvory ? 'text-[#38131E]/70' : 'text-[#F7F1E5]/60'
                }`}
              >
                © 2026 REVAKALP · INDORE
              </span>
            </div>

            <p
              className={`text-[10px] uppercase tracking-[0.22em] ${
                isIvory ? 'text-[#38131E]/70' : 'text-[#F7F1E5]/55'
              }`}
            >
              Designed &amp; Developed by
              <a
                href="https://zsyio.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative ml-2 font-medium transition-colors duration-300 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  isIvory
                    ? 'text-[#38131E] hover:text-[#7D551A] after:bg-[#7D551A]'
                    : 'text-[#D4AF63] hover:text-[#FFF0B9] after:bg-[#FFF0B9]'
                }`}
              >
                ZSYIO
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
