import React from "react";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F14] text-white font-sans px-4">
      
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl px-8 py-12 text-center shadow-xl">
        
        {/* Logo */}
        <img
          src="./logo.png"
          alt="Logo"
          className="mx-auto mb-10  opacity-90"
        />

        {/* Title */}
        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-gray-400 leading-relaxed mb-10">
          A carefully crafted digital experience is on its way.  
          Built with clarity, precision, and purpose.
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 mb-8" />

        {/* Footer */}
        <p className="text-[10px] tracking-widest uppercase text-gray-500">
          Designed & Developed by
          <a
            href="https://zsyio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-400 hover:text-blue-300 transition"
          >
            ZSYIO
          </a>
        </p>
      </div>
    </div>
  );
};

export default App;
