import { useState } from 'react';

const STORAGE_KEY = 'revakalp_waitlist_email';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readStoredEmail() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export default function NotifyForm({ isIvory }) {
  const [savedEmail, setSavedEmail] = useState(readStoredEmail);
  const [email, setEmail] = useState(savedEmail);
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(() => Boolean(savedEmail));

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Please enter a valid email address for your private preview.');
      return;
    }

    setError('');
    try {
      window.localStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // Ignore storage errors in restricted browsing modes
    }
    setSavedEmail(trimmed);
    setIsConfirmed(true);
  };

  const handleEdit = () => {
    setEmail(savedEmail);
    setError('');
    setIsConfirmed(false);
  };

  if (isConfirmed) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`w-full max-w-md mx-auto rounded-xl border px-5 py-4 text-center backdrop-blur-md transition-colors duration-500 ${
          isIvory
            ? 'border-[#38131E]/20 bg-[#38131E]/[0.04] text-[#38131E]'
            : 'border-[#D4AF63]/30 bg-[#38131E]/55 text-[#F7F1E5]'
        }`}
      >
        <div className="flex items-center justify-center gap-2.5 mb-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={`w-4 h-4 shrink-0 ${
              isIvory ? 'text-[#7D551A]' : 'text-[#F1D889]'
            }`}
            aria-hidden="true"
          >
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="rk-check-path"
            />
          </svg>
          <span
            className={`text-[11px] uppercase tracking-[0.22em] font-medium ${
              isIvory ? 'text-[#7D551A]' : 'text-[#F1D889]'
            }`}
          >
            Invitation Reserved
          </span>
        </div>

        <p
          className={`text-xs sm:text-sm leading-relaxed ${
            isIvory ? 'text-[#38131E]/85' : 'text-[#F7F1E5]/85'
          }`}
        >
          You&apos;re on the private guest list — we&apos;ll notify{' '}
          <span className="font-medium underline decoration-current/30 underline-offset-4">
            {savedEmail}
          </span>{' '}
          when our doors open.
        </p>

        <button
          type="button"
          onClick={handleEdit}
          className={`mt-2.5 text-[11px] uppercase tracking-[0.18em] transition-opacity hover:opacity-100 opacity-75 underline underline-offset-4 cursor-pointer focus-visible:outline-none focus-visible:ring-1 ${
            isIvory
              ? 'text-[#38131E] focus-visible:ring-[#38131E]'
              : 'text-[#D4AF63] focus-visible:ring-[#D4AF63]'
          }`}
        >
          Update email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md mx-auto">
      <label htmlFor="revakalp-waitlist-email" className="sr-only">
        Email address for private preview
      </label>

      <div
        className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl border p-1.5 backdrop-blur-md transition-all duration-300 ${
          isIvory
            ? 'border-[#38131E]/22 bg-white/60 focus-within:border-[#38131E]/55 focus-within:shadow-[0_0_24px_rgba(56,19,30,0.08)]'
            : 'border-[#D4AF63]/28 bg-[#19070D]/55 focus-within:border-[#D4AF63]/70 focus-within:shadow-[0_0_28px_rgba(212,175,99,0.14)]'
        }`}
      >
        <input
          id="revakalp-waitlist-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter your email for private preview"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'revakalp-waitlist-error' : undefined}
          className={`flex-1 bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-xs sm:placeholder:text-sm ${
            isIvory
              ? 'text-[#1A1718] placeholder:text-[#38131E]/45'
              : 'text-[#F7F1E5] placeholder:text-[#F7F1E5]/45'
          }`}
        />

        <button
          type="submit"
          className={`rk-btn-sheen relative overflow-hidden rounded-lg px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isIvory
              ? 'bg-[#38131E] text-[#F7F1E5] hover:bg-[#2B0E17] focus-visible:ring-[#38131E] focus-visible:ring-offset-[#F7F1E5]'
              : 'bg-gradient-to-r from-[#D4AF63] via-[#F1D889] to-[#D4AF63] text-[#1A1718] hover:brightness-105 focus-visible:ring-[#F1D889] focus-visible:ring-offset-[#2B0E17]'
          }`}
        >
          Notify Me
        </button>
      </div>

      {error && (
        <p
          id="revakalp-waitlist-error"
          role="alert"
          className={`mt-2.5 text-xs tracking-wide ${
            isIvory ? 'text-[#8B1E2B]' : 'text-[#F1D889]'
          }`}
        >
          {error}
        </p>
      )}
    </form>
  );
}
