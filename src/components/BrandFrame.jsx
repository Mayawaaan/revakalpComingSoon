export default function BrandFrame({ isIvory }) {
  const outerColor = isIvory ? 'border-[#A8762C]/35' : 'border-[#D4AF63]/35';
  const innerColor = isIvory ? 'border-[#38131E]/15' : 'border-[#D4AF63]/18';
  const diamondBg = isIvory ? 'bg-[#A8762C]/55' : 'bg-[#D4AF63]/60';

  return (
    <div
      aria-hidden="true"
      className="rk-frame-animate fixed inset-3 sm:inset-5 md:inset-7 pointer-events-none z-10"
    >
      {/* Outer hairline border */}
      <div
        className={`absolute inset-0 border transition-colors duration-700 ${outerColor}`}
      />

      {/* Inner hairline border */}
      <div
        className={`absolute inset-[5px] sm:inset-[6px] border transition-colors duration-700 ${innerColor}`}
      >
        {/* Four minimal corner diamond finials */}
        <span
          className={`absolute -top-[3px] -left-[3px] h-[5px] w-[5px] rotate-45 transition-colors duration-700 ${diamondBg}`}
        />
        <span
          className={`absolute -top-[3px] -right-[3px] h-[5px] w-[5px] rotate-45 transition-colors duration-700 ${diamondBg}`}
        />
        <span
          className={`absolute -bottom-[3px] -left-[3px] h-[5px] w-[5px] rotate-45 transition-colors duration-700 ${diamondBg}`}
        />
        <span
          className={`absolute -bottom-[3px] -right-[3px] h-[5px] w-[5px] rotate-45 transition-colors duration-700 ${diamondBg}`}
        />
      </div>
    </div>
  );
}
