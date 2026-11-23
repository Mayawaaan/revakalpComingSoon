import { useEffect, useRef } from 'react';

const THREAD_SPECS = [
  { band: 0.14, amp: 24, freq: 1.5, speed: 0.00055, phase: 0.2, width: 1.35, alpha: 0.22 },
  { band: 0.19, amp: 16, freq: 2.1, speed: 0.00042, phase: 1.7, width: 0.75, alpha: 0.14 },
  { band: 0.48, amp: 20, freq: 1.3, speed: 0.00032, phase: 3.1, width: 0.7, alpha: 0.065 },
  { band: 0.54, amp: 14, freq: 1.8, speed: 0.00038, phase: 4.5, width: 0.65, alpha: 0.055 },
  { band: 0.82, amp: 22, freq: 1.6, speed: 0.00048, phase: 2.4, width: 1.25, alpha: 0.2 },
  { band: 0.88, amp: 15, freq: 2.2, speed: 0.00052, phase: 5.1, width: 0.75, alpha: 0.13 },
];

const MOTE_COUNT = 36;
const WARP_COUNT = 16;

function createMotes(width, height) {
  return Array.from({ length: MOTE_COUNT }, (_, i) => ({
    x: ((i * 73.13) % 100) * 0.01 * width,
    y: ((i * 41.79) % 100) * 0.01 * height,
    size: 0.9 + (i % 4) * 0.45,
    speedY: 0.14 + (i % 5) * 0.055,
    swayAmp: 10 + (i % 6) * 4,
    swayFreq: 0.0007 + (i % 3) * 0.00025,
    phase: i * 1.17,
    baseAlpha: 0.22 + (i % 5) * 0.09,
  }));
}

export default function SilkLoomCanvas({ theme = 'burgundy' }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, active: false };

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let motes = createMotes(width, height);
    let rafId = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes = createMotes(width, height);
    };

    const handlePointerMove = (e) => {
      pointer.targetX = e.clientX / Math.max(width, 1);
      pointer.targetY = e.clientY / Math.max(height, 1);
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetX = 0.5;
      pointer.targetY = 0.5;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    const drawFrame = (time) => {
      const isIvory = themeRef.current === 'ivory';

      // Smooth pointer interpolation
      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;

      const px = pointer.x * width;
      const py = pointer.y * height;

      ctx.clearRect(0, 0, width, height);

      // 1. Subtle vertical warp hairlines
      const warpRgb = isIvory ? '125, 85, 26' : '212, 175, 99';
      for (let i = 1; i <= WARP_COUNT; i++) {
        const x = (width / (WARP_COUNT + 1)) * i;
        const breathe = 0.02 + 0.014 * Math.sin(time * 0.0005 + i * 0.8);
        ctx.strokeStyle = `rgba(${warpRgb}, ${breathe.toFixed(4)})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 2. Flowing woven zari/silk threads
      const steps = width < 640 ? 44 : 72;
      for (let tIdx = 0; tIdx < THREAD_SPECS.length; tIdx++) {
        const spec = THREAD_SPECS[tIdx];
        const baseY = height * spec.band;
        const t = time * spec.speed + spec.phase;

        const points = [];
        for (let s = 0; s <= steps; s++) {
          const u = s / steps;
          const x = u * width;
          const primaryWave = Math.sin(u * Math.PI * spec.freq * 2 + t) * spec.amp;
          const secondaryWave = Math.cos(u * Math.PI * 3.1 - t * 0.7) * (spec.amp * 0.35);

          let cursorDeflect = 0;
          if (pointer.active) {
            const dx = x - px;
            const dy = baseY - py;
            const distSq = dx * dx + dy * dy;
            const radius = 220;
            if (distSq < radius * radius) {
              const influence = 1 - Math.sqrt(distSq) / radius;
              cursorDeflect = (dy >= 0 ? 1 : -1) * influence * influence * 22;
            }
          }

          points.push({ x, y: baseY + primaryWave + secondaryWave + cursorDeflect });
        }

        // Base metallic gradient along thread
        const grad = ctx.createLinearGradient(0, baseY - 30, width, baseY + 30);
        const edgeAlpha = isIvory ? spec.alpha * 0.35 : spec.alpha * 0.25;
        const midAlpha = isIvory ? spec.alpha * 0.85 : spec.alpha;
        const sheenPos = (Math.sin(time * 0.00038 + tIdx * 1.3) + 1) * 0.5;
        const sheenStart = Math.max(0.05, sheenPos - 0.14);
        const sheenEnd = Math.min(0.95, sheenPos + 0.14);

        const baseColor = isIvory ? '168, 118, 44' : '212, 175, 99';
        const sheenColor = isIvory ? '56, 19, 30' : '255, 240, 185';
        const sheenAlpha = isIvory ? Math.min(0.32, spec.alpha * 1.15) : Math.min(0.55, spec.alpha * 1.9);

        grad.addColorStop(0, `rgba(${baseColor}, ${edgeAlpha.toFixed(3)})`);
        grad.addColorStop(sheenStart, `rgba(${baseColor}, ${midAlpha.toFixed(3)})`);
        grad.addColorStop(sheenPos, `rgba(${sheenColor}, ${sheenAlpha.toFixed(3)})`);
        grad.addColorStop(sheenEnd, `rgba(${baseColor}, ${midAlpha.toFixed(3)})`);
        grad.addColorStop(1, `rgba(${baseColor}, ${edgeAlpha.toFixed(3)})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = spec.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let s = 1; s < points.length - 1; s++) {
          const xc = (points[s].x + points[s + 1].x) * 0.5;
          const yc = (points[s].y + points[s + 1].y) * 0.5;
          ctx.quadraticCurveTo(points[s].x, points[s].y, xc, yc);
        }
        const last = points[points.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();
      }

      // 3. Floating zari sparkle motes
      const moteColor = isIvory ? '145, 96, 30' : '241, 216, 137';
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        if (!reducedMotion) {
          m.y -= m.speedY;
          if (m.y < -12) {
            m.y = height + 12;
            m.x = ((i * 61.7 + time * 0.01) % 100) * 0.01 * width;
          }
        }
        const swayX = m.x + Math.sin(time * m.swayFreq + m.phase) * m.swayAmp;
        const twinkle = 0.55 + 0.45 * Math.sin(time * 0.0018 + m.phase * 2.1);
        const alpha = (isIvory ? m.baseAlpha * 0.72 : m.baseAlpha) * twinkle;

        ctx.fillStyle = `rgba(${moteColor}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(swayX, m.y, m.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (reducedMotion) {
      drawFrame(1200);
    } else {
      const loop = (now) => {
        drawFrame(now);
        rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 h-full w-full pointer-events-none select-none z-[1]"
    />
  );
}
