type Source = readonly [x: number, y: number, radius: number];

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
  source: Source;
}

/** Where the dust drifts: under each lamp, and a wide pool in the middle. In fractions of the drawing. */
const SOURCES: Source[] = [
  [0.27, 0.5, 0.14],
  [0.41, 0.5, 0.1],
  [0.5, 0.35, 0.08],
  [0.73, 0.34, 0.08],
  [0.5, 0.5, 0.5],
];
const COUNT = 90;

function spawn(source: Source, scatter: boolean): Mote {
  const [x, y, r] = source;
  return {
    x: x + (Math.random() - 0.5) * r * 2,
    y: y + (scatter ? (Math.random() - 0.3) * r * 2 : r),
    vx: (Math.random() - 0.5) * 0.00012,
    vy: -(0.00004 + Math.random() * 0.00012),
    size: 0.6 + Math.random() * 1.8,
    phase: Math.random() * Math.PI * 2,
    source,
  };
}

/** Dust drifting in the lamp light. Paused while the canvas is off screen. */
export function startDust(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d');
  if (!context) return;

  const motes = Array.from({ length: COUNT }, (_, i) => spawn(SOURCES[i % SOURCES.length], true));
  let visible = true;

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    const ratio = Math.min(devicePixelRatio, 1.5);
    canvas.width = box.width * ratio;
    canvas.height = box.height * ratio;
  };
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(canvas);
  resize();

  const frame = (time: number) => {
    requestAnimationFrame(frame);
    if (!visible) return;
    const { width, height } = canvas;
    const scale = width / 600;
    context.clearRect(0, 0, width, height);
    motes.forEach((mote, i) => {
      mote.x += mote.vx + Math.sin(time / 2400 + mote.phase) * 0.00006;
      mote.y += mote.vy;
      const [sx, sy, r] = mote.source;
      if (Math.hypot(mote.x - sx, (mote.y - sy) * 0.8) > r * 1.3) motes[i] = spawn(mote.source, false);
      const glow = 0.35 + 0.65 * Math.max(0, Math.sin(time / 900 + mote.phase * 3));
      context.fillStyle = `rgb(255 228 170 / ${(0.18 + 0.55 * glow).toFixed(3)})`;
      context.beginPath();
      context.arc(mote.x * width, mote.y * height, mote.size * scale, 0, Math.PI * 2);
      context.fill();
    });
  };
  setTimeout(() => requestAnimationFrame(frame), 1400);
}
