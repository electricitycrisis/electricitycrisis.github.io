import { useEffect, useRef, useCallback } from "react";

// ============= Types =============
interface Ring {
  radius: number;
  segments: number;
  rotation: number;
  speed: number;
  segmentGaps: number[];
  pulsePhase: number;
  thickness: number;
}

interface LightningBolt {
  points: { x: number; y: number }[];
  alpha: number;
  decay: number;
  hue: number;
  width: number;
}

interface BackgroundArc {
  startAngle: number;
  endAngle: number;
  radius: number;
  speed: number;
  alpha: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
  life: number;
  maxLife: number;
  active: boolean;
}

interface MatrixDrop {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  opacity: number;
}

type IntensityMode = "calm" | "normal" | "intense" | "ultraIntense" | "mega";
type ColorTheme =
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "cyan"
  | "gold"
  | "neon"
  | "fire"
  | "ice"
  | "toxic"
  | "sunset"
  | "ocean"
  | "blood"
  | "matrix"
  | "vapor"
  | "plasma"
  | "arctic"
  | "lava"
  | "cosmic"
  | "emerald";

interface ThemeColors {
  primary: number;
  secondary: number;
  r: number;
  g: number;
  b: number;
  ra: number;
  ga: number;
  ba: number;
  name: string;
  key: string;
}

const COLOR_THEMES: Record<ColorTheme, ThemeColors> = {
  blue: {
    primary: 200,
    secondary: 190,
    r: 50,
    g: 150,
    b: 255,
    ra: 100,
    ga: 200,
    ba: 255,
    name: "Electric Blue",
    key: "B",
  },
  red: {
    primary: 0,
    secondary: 15,
    r: 255,
    g: 50,
    b: 50,
    ra: 255,
    ga: 100,
    ba: 100,
    name: "Ruby Red",
    key: "R",
  },
  green: {
    primary: 120,
    secondary: 140,
    r: 50,
    g: 255,
    b: 100,
    ra: 100,
    ga: 255,
    ba: 150,
    name: "Neon Green",
    key: "G",
  },
  purple: {
    primary: 280,
    secondary: 260,
    r: 180,
    g: 50,
    b: 255,
    ra: 200,
    ga: 100,
    ba: 255,
    name: "Royal Purple",
    key: "P",
  },
  cyan: {
    primary: 180,
    secondary: 170,
    r: 50,
    g: 255,
    b: 255,
    ra: 100,
    ga: 255,
    ba: 255,
    name: "Cyber Cyan",
    key: "C",
  },
  gold: {
    primary: 45,
    secondary: 35,
    r: 255,
    g: 200,
    b: 50,
    ra: 255,
    ga: 220,
    ba: 100,
    name: "Royal Gold",
    key: "O",
  },
  neon: {
    primary: 320,
    secondary: 290,
    r: 255,
    g: 20,
    b: 147,
    ra: 255,
    ga: 100,
    ba: 180,
    name: "Neon Pink",
    key: "N",
  },
  fire: {
    primary: 25,
    secondary: 10,
    r: 255,
    g: 100,
    b: 0,
    ra: 255,
    ga: 150,
    ba: 50,
    name: "Inferno",
    key: "F",
  },
  ice: {
    primary: 195,
    secondary: 210,
    r: 150,
    g: 220,
    b: 255,
    ra: 200,
    ga: 240,
    ba: 255,
    name: "Frozen Ice",
    key: "I",
  },
  toxic: {
    primary: 85,
    secondary: 100,
    r: 180,
    g: 255,
    b: 0,
    ra: 200,
    ga: 255,
    ba: 80,
    name: "Toxic Waste",
    key: "T",
  },
  sunset: {
    primary: 15,
    secondary: 35,
    r: 255,
    g: 120,
    b: 80,
    ra: 255,
    ga: 160,
    ba: 120,
    name: "Sunset Glow",
    key: "S",
  },
  ocean: {
    primary: 210,
    secondary: 195,
    r: 0,
    g: 100,
    b: 180,
    ra: 50,
    ga: 150,
    ba: 220,
    name: "Deep Ocean",
    key: "D",
  },
  blood: {
    primary: 350,
    secondary: 5,
    r: 180,
    g: 0,
    b: 30,
    ra: 220,
    ga: 50,
    ba: 70,
    name: "Blood Moon",
    key: "X",
  },
  matrix: {
    primary: 130,
    secondary: 115,
    r: 0,
    g: 200,
    b: 50,
    ra: 50,
    ga: 255,
    ba: 100,
    name: "Matrix Code",
    key: "Z",
  },
  vapor: {
    primary: 290,
    secondary: 180,
    r: 200,
    g: 100,
    b: 255,
    ra: 150,
    ga: 200,
    ba: 255,
    name: "Vaporwave",
    key: "V",
  },
  plasma: {
    primary: 300,
    secondary: 340,
    r: 255,
    g: 0,
    b: 200,
    ra: 255,
    ga: 80,
    ba: 220,
    name: "Plasma Core",
    key: "A",
  },
  arctic: {
    primary: 190,
    secondary: 175,
    r: 200,
    g: 240,
    b: 255,
    ra: 220,
    ga: 250,
    ba: 255,
    name: "Arctic Storm",
    key: "K",
  },
  lava: {
    primary: 10,
    secondary: 30,
    r: 255,
    g: 60,
    b: 0,
    ra: 255,
    ga: 120,
    ba: 30,
    name: "Molten Lava",
    key: "L",
  },
  cosmic: {
    primary: 270,
    secondary: 250,
    r: 120,
    g: 80,
    b: 200,
    ra: 160,
    ga: 120,
    ba: 255,
    name: "Cosmic Nebula",
    key: "U",
  },
  emerald: {
    primary: 145,
    secondary: 160,
    r: 50,
    g: 180,
    b: 100,
    ra: 80,
    ga: 220,
    ba: 130,
    name: "Emerald",
    key: "E",
  },
};

const MODE_PARAMS = {
  calm: {
    baseSpeed: 0.5,
    surgeInterval: 20,
    intensity: 0.6,
    boltInterval: 2,
    particleRate: 0.3,
    maxParticles: 30,
  },
  normal: {
    baseSpeed: 1,
    surgeInterval: 10,
    intensity: 1,
    boltInterval: 0.8,
    particleRate: 0.6,
    maxParticles: 40,
  },
  intense: {
    baseSpeed: 1.5,
    surgeInterval: 5,
    intensity: 1.4,
    boltInterval: 0.4,
    particleRate: 1,
    maxParticles: 50,
  },
  ultraIntense: {
    baseSpeed: 2.2,
    surgeInterval: 3,
    intensity: 1.9,
    boltInterval: 0.2,
    particleRate: 1.5,
    maxParticles: 60,
  },
  mega: {
    baseSpeed: 3,
    surgeInterval: 1.5,
    intensity: 2.5,
    boltInterval: 0.1,
    particleRate: 2,
    maxParticles: 70,
  },
};

const MATRIX_CHARS =
  "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const TWO_PI = Math.PI * 2;

const SIN_TABLE_SIZE = 360;
const SIN_TABLE: number[] = [];
for (let i = 0; i < SIN_TABLE_SIZE; i++) {
  SIN_TABLE[i] = Math.sin((i / SIN_TABLE_SIZE) * TWO_PI);
}
const fastSin = (x: number): number => {
  const idx =
    (((x % TWO_PI) / TWO_PI) * SIN_TABLE_SIZE + SIN_TABLE_SIZE) %
    SIN_TABLE_SIZE;
  return SIN_TABLE[Math.floor(idx)];
};

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const PowerNexus = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const frameCountRef = useRef(0);
  const stateRef = useRef({
    time: 0,
    lastTime: 0,
    lastSurge: 0,
    surgeActive: false,
    surgeProgress: 0,
    lastBoltTime: 0,
    currentIntensity: 1,
    shakeX: 0,
    shakeY: 0,
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
    dpr: 1,
  });

  const ringsRef = useRef<Ring[]>([]);
  const boltsRef = useRef<LightningBolt[]>([]);
  const arcsRef = useRef<BackgroundArc[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const matrixRef = useRef<MatrixDrop[]>([]);
  const modeRef = useRef<IntensityMode>("intense");
  const themeRef = useRef<ColorTheme>("blue");
  const audioLevelRef = useRef(0);

  const initParticlePool = useCallback((count: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0,
        alpha: 0,
        hue: 0,
        life: 0,
        maxLife: 0,
        active: false,
      });
    }
    particlesRef.current = particles;
  }, []);

  const spawnParticle = useCallback(() => {
    const s = stateRef.current;
    const theme = COLOR_THEMES[themeRef.current];
    const particle = particlesRef.current.find((p) => !p.active);
    if (!particle) return;
    const edge = (Math.random() * 4) | 0;
    particle.x =
      edge === 1 ? s.width + 20 : edge === 3 ? -20 : Math.random() * s.width;
    particle.y =
      edge === 0 ? -20 : edge === 2 ? s.height + 20 : Math.random() * s.height;
    particle.vx = 0;
    particle.vy = 0;
    particle.size = 2 + Math.random() * 3;
    particle.alpha = 0.5 + Math.random() * 0.3;
    particle.hue = theme.primary + (Math.random() - 0.5) * 20;
    particle.maxLife = 6 + Math.random() * 4;
    particle.life = particle.maxLife;
    particle.active = true;
  }, []);

  const initMatrix = useCallback((width: number) => {
    const drops: MatrixDrop[] = [];
    const colWidth = isMobile ? 30 : 20;
    const cols = Math.floor(width / colWidth);
    for (let i = 0; i < cols; i++) {
      if (Math.random() > (isMobile ? 0.6 : 0.45)) {
        const len = isMobile ? 3 + Math.floor(Math.random() * 6) : 5 + Math.floor(Math.random() * 14);
        const chars: string[] = [];
        for (let j = 0; j < len; j++)
          chars.push(MATRIX_CHARS[(Math.random() * MATRIX_CHARS.length) | 0]);
        drops.push({
          x: i * colWidth + colWidth / 2,
          y: Math.random() * -400,
          speed: 50 + Math.random() * 100,
          chars,
          length: len,
          opacity: 0.1 + Math.random() * 0.25,
        });
      }
    }
    matrixRef.current = drops;
  }, []);

  const initRings = useCallback(
    (width: number, height: number) => {
      const baseRadius = Math.min(width, height) * 0.12;
      const ringCount = isMobile ? 3 : 6;
      const rings: Ring[] = [];
      for (let i = 0; i < ringCount; i++) {
        const segCount = 6 + i * 2;
        const gaps: number[] = [];
        for (let j = 0; j < segCount; j++)
          gaps.push(0.1 + Math.random() * 0.12);
        rings.push({
          radius: baseRadius + i * baseRadius * 0.38,
          segments: segCount,
          rotation: Math.random() * TWO_PI,
          speed: (0.06 + Math.random() * 0.12) * (i % 2 ? 1 : -1),
          segmentGaps: gaps,
          pulsePhase: Math.random() * TWO_PI,
          thickness: 2 + (5 - i) * 0.35,
        });
      }
      ringsRef.current = rings;

      const arcCount = isMobile ? 2 : 6;
      const arcs: BackgroundArc[] = [];
      for (let i = 0; i < arcCount; i++) {
        arcs.push({
          startAngle: Math.random() * TWO_PI,
          endAngle: Math.random() * Math.PI * 0.4 + 0.2,
          radius: 200 + Math.random() * 350,
          speed: (Math.random() - 0.5) * 0.25,
          alpha: 0.08 + Math.random() * 0.15,
        });
      }
      arcsRef.current = arcs;
      initMatrix(width);
      const particleCount = isMobile ? 20 : 60;
      const initialSpawn = isMobile ? 8 : 20;
      initParticlePool(particleCount);
      for (let i = 0; i < initialSpawn; i++) spawnParticle();
    },
    [initMatrix, initParticlePool, spawnParticle],
  );

  const generateBolt = useCallback(
    (
      sx: number,
      sy: number,
      ex: number,
      ey: number,
      depth: number = 4,
      randomness: number = 0.35,
    ): { x: number; y: number }[] => {
      const points: { x: number; y: number }[] = [{ x: sx, y: sy }];
      const subdivide = (
        start: { x: number; y: number },
        end: { x: number; y: number },
        d: number,
      ): { x: number; y: number }[] => {
        if (d === 0) return [end];
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        const dist = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
        const offset = (Math.random() - 0.5) * dist * randomness;
        const perpX = -(end.y - start.y) / (dist || 1);
        const perpY = (end.x - start.x) / (dist || 1);
        const mid = { x: midX + perpX * offset, y: midY + perpY * offset };
        return [...subdivide(start, mid, d - 1), ...subdivide(mid, end, d - 1)];
      };
      points.push(...subdivide({ x: sx, y: sy }, { x: ex, y: ey }, depth));
      return points;
    },
    [],
  );

  const spawnBolt = useCallback(() => {
    const s = stateRef.current;
    const theme = COLOR_THEMES[themeRef.current];
    const side = (Math.random() * 4) | 0;
    const sx = side === 1 ? s.width : side === 3 ? 0 : Math.random() * s.width;
    const sy =
      side === 0 ? 0 : side === 2 ? s.height : Math.random() * s.height;
    const ex = s.centerX + (Math.random() - 0.5) * 200;
    const ey = s.centerY + (Math.random() - 0.5) * 200;
    boltsRef.current.push({
      points: generateBolt(sx, sy, ex, ey, 4, 0.4),
      alpha: 1,
      decay: 1.5 + Math.random() * 0.6,
      hue: theme.primary + (Math.random() - 0.5) * 20,
      width: 2 + Math.random() * 2,
    });
    if (boltsRef.current.length > 12) boltsRef.current.shift(); // Reduced from 15
  }, [generateBolt]);

  const drawBoltPath = (
    ctx: CanvasRenderingContext2D,
    points: { x: number; y: number }[],
  ) => {
    if (points.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++)
      ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
  };

  const drawMatrix = useCallback(
    (ctx: CanvasRenderingContext2D, dt: number, surge: number) => {
      const s = stateRef.current;
      const theme = COLOR_THEMES[themeRef.current];
      ctx.font = "13px monospace";
      for (let d = 0; d < matrixRef.current.length; d++) {
        const drop = matrixRef.current[d];
        drop.y += drop.speed * dt * (1 + surge * 0.4);
        if (Math.random() < 0.02) {
          const idx = (Math.random() * drop.chars.length) | 0;
          drop.chars[idx] =
            MATRIX_CHARS[(Math.random() * MATRIX_CHARS.length) | 0];
        }
        for (let i = 0; i < drop.chars.length; i++) {
          const y = drop.y - i * 15;
          if (y < -15 || y > s.height + 15) continue;
          const fade = 1 - (i / drop.length) * 0.85;
          const alpha = drop.opacity * fade * (0.7 + surge * 0.25);
          ctx.fillStyle =
            i === 0
              ? `rgba(${theme.ra},${theme.ga},${theme.ba},${alpha * 1.3})`
              : `hsla(${theme.secondary},100%,50%,${alpha})`;
          ctx.fillText(drop.chars[i], drop.x, y);
        }
        if (drop.y - drop.length * 15 > s.height) {
          drop.y = Math.random() * -150;
          drop.speed = 40 + Math.random() * 80;
        }
      }
    },
    [],
  );

  const drawParticles = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      dt: number,
      surge: number,
      time: number,
    ) => {
      const s = stateRef.current;
      const theme = COLOR_THEMES[themeRef.current];
      let activeCount = 0;

      // Batch particle drawing if they share colors, but they don't really.
      // Instead, simplify each particle to fewer draw calls.
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        if (!p.active) continue;
        activeCount++;
        const dx = s.centerX - p.x;
        const dy = s.centerY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;
        const attraction =
          (30 + (1 - Math.min(dist / 500, 1)) * 50) * (1 + surge * 3);
        const orbital = 18 + fastSin(time + p.hue * 0.1) * 10;
        p.vx += (nx * attraction - ny * orbital) * dt;
        p.vy += (ny * attraction + nx * orbital) * dt;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (dist < 50 + surge * 30) {
          p.alpha *= 0.9;
          p.size *= 0.95;
        }
        if (p.life <= 0 || p.alpha < 0.02 || p.size < 0.3) {
          p.active = false;
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        const alpha = p.alpha * lifeRatio;
        const size = p.size * (0.5 + lifeRatio * 0.5);

        // Simplified particle drawing: 2 arcs instead of 4
        ctx.fillStyle = `hsla(${p.hue},100%,65%,${alpha * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2, 0, TWO_PI);
        ctx.fill();
        ctx.fillStyle = `hsla(${p.hue},80%,90%,${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.8, 0, TWO_PI);
        ctx.fill();

        const speed = Math.abs(p.vx) + Math.abs(p.vy);
        if (speed > 25) {
          // Increased threshold from 15
          ctx.strokeStyle = `hsla(${p.hue},100%,70%,${alpha * 0.3})`;
          ctx.lineWidth = size * 0.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 0.06, p.y - p.vy * 0.06);
          ctx.stroke();
        }
      }
      const params = MODE_PARAMS[modeRef.current];
      if (activeCount < params.maxParticles && Math.random() < dt * 2.5) {
        const inactive = particlesRef.current.find((p) => !p.active);
        if (inactive) {
          const edge = (Math.random() * 4) | 0;
          inactive.x =
            edge === 1
              ? s.width + 20
              : edge === 3
                ? -20
                : Math.random() * s.width;
          inactive.y =
            edge === 0
              ? -20
              : edge === 2
                ? s.height + 20
                : Math.random() * s.height;
          inactive.vx = 0;
          inactive.vy = 0;
          inactive.size = 2 + Math.random() * 4;
          inactive.alpha = 0.6 + Math.random() * 0.4;
          inactive.hue = theme.primary + (Math.random() - 0.5) * 25;
          inactive.maxLife = 7 + Math.random() * 5;
          inactive.life = inactive.maxLife;
          inactive.active = true;
        }
      }
    },
    [],
  );

  const drawBolts = useCallback((ctx: CanvasRenderingContext2D, dt: number) => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let b = boltsRef.current.length - 1; b >= 0; b--) {
      const bolt = boltsRef.current[b];
      bolt.alpha -= dt * bolt.decay;
      if (bolt.alpha <= 0) {
        boltsRef.current.splice(b, 1);
        continue;
      }
      const pts = bolt.points;
      if (pts.length < 2) continue;
      ctx.globalAlpha = bolt.alpha;

      // Simplified bolt: 3 strokes instead of 5
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);

      ctx.strokeStyle = `hsla(${bolt.hue},100%,60%,0.2)`;
      ctx.lineWidth = bolt.width * 5;
      ctx.stroke();
      ctx.strokeStyle = `hsla(${bolt.hue},100%,75%,0.6)`;
      ctx.lineWidth = bolt.width * 2;
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = bolt.width * 0.6;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, []);

  const drawRings = useCallback(
    (ctx: CanvasRenderingContext2D, time: number, surge: number) => {
      const s = stateRef.current;
      const theme = COLOR_THEMES[themeRef.current];
      ctx.lineCap = "round";
      for (let r = 0; r < ringsRef.current.length; r++) {
        const ring = ringsRef.current[r];
        const arcLen = TWO_PI / ring.segments;
        for (let i = 0; i < ring.segments; i++) {
          const startA = ring.rotation + i * arcLen;
          const gap = ring.segmentGaps[i];
          const endA = startA + arcLen * (1 - gap);
          const pulse =
            fastSin(time * 2 + ring.pulsePhase + i * 0.5) * 0.5 + 0.5;
          const alpha = 0.2 + pulse * 0.45 + surge * 0.2;
          const light = 50 + pulse * 22 + surge * 20;
          ctx.strokeStyle = `hsla(${theme.primary + fastSin(time + i) * 8},100%,${light}%,${alpha})`;
          ctx.lineWidth = ring.thickness + surge * 2;
          ctx.beginPath();
          ctx.arc(s.centerX, s.centerY, ring.radius, startA, endA);
          ctx.stroke();
        }
      }
    },
    [],
  );

  const drawArcs = useCallback(
    (ctx: CanvasRenderingContext2D, time: number, surge: number) => {
      const s = stateRef.current;
      const theme = COLOR_THEMES[themeRef.current];
      for (let i = 0; i < arcsRef.current.length; i++) {
        const arc = arcsRef.current[i];
        const angle = arc.startAngle + time * arc.speed;
        const pulse = fastSin(time * 1.4 + i) * 0.5 + 0.5;
        const alpha = arc.alpha * (0.5 + pulse * 0.5) + surge * 0.25;
        ctx.strokeStyle = `hsla(${theme.primary + fastSin(time + i * 0.4) * 12},100%,55%,${alpha})`;
        ctx.lineWidth = 1.2 + pulse * 0.6;
        ctx.beginPath();
        ctx.arc(s.centerX, s.centerY, arc.radius, angle, angle + arc.endAngle);
        ctx.stroke();
      }
    },
    [],
  );

  const logoImgRef = useRef<HTMLImageElement | null>(null);

  const drawLogo = useCallback(
    (ctx: CanvasRenderingContext2D, _time: number, surge: number) => {
      const s = stateRef.current;
      const theme = COLOR_THEMES[themeRef.current];
      const size = Math.min(s.width, s.height) * 0.11;
      const glowSize = size * 2;
      const grad = ctx.createRadialGradient(
        s.centerX,
        s.centerY,
        0,
        s.centerX,
        s.centerY,
        glowSize,
      );
      const intensity = 0.45 + surge * 0.6;
      grad.addColorStop(
        0,
        `rgba(${theme.r},${theme.g},${theme.b},${intensity})`,
      );
      grad.addColorStop(
        0.4,
        `rgba(${theme.r},${theme.g},${theme.b},${intensity * 0.4})`,
      );
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(s.centerX, s.centerY, glowSize, 0, TWO_PI);
      ctx.fill();

      // Draw the logo image instead of hexagons + bolt
      const img = logoImgRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        const imgSize = size * 1.4;
        ctx.globalAlpha = 0.88 + surge * 0.12;
        ctx.drawImage(
          img,
          s.centerX - imgSize / 2,
          s.centerY - imgSize / 2,
          imgSize,
          imgSize,
        );
        ctx.globalAlpha = 1;
      }
    },
    [],
  );

  const generateInnerBolt = useCallback(
    (
      sx: number,
      sy: number,
      ex: number,
      ey: number,
      depth: number,
    ): { x: number; y: number }[] => {
      const points: { x: number; y: number }[] = [{ x: sx, y: sy }];
      const subdivide = (
        start: { x: number; y: number },
        end: { x: number; y: number },
        d: number,
      ): { x: number; y: number }[] => {
        if (d === 0) return [end];
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        const dist = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
        const offset = (Math.random() - 0.5) * dist * 0.45;
        const perpX = -(end.y - start.y) / (dist || 1);
        const perpY = (end.x - start.x) / (dist || 1);
        const mid = { x: midX + perpX * offset, y: midY + perpY * offset };
        return [...subdivide(start, mid, d - 1), ...subdivide(mid, end, d - 1)];
      };
      points.push(...subdivide({ x: sx, y: sy }, { x: ex, y: ey }, depth));
      return points;
    },
    [],
  );

  const drawInnerBoltLightning = useCallback(
    (ctx: CanvasRenderingContext2D, time: number, surge: number) => {
      const s = stateRef.current;
      const theme = COLOR_THEMES[themeRef.current];
      const size = Math.min(s.width, s.height) * 0.11;
      const logoRadius = size * 0.7;
      // Generate points around the logo edge instead of bolt polygon
      const numEdgePoints = 8;
      const boltPoints: { x: number; y: number }[] = [];
      for (let i = 0; i < numEdgePoints; i++) {
        const angle = (i / numEdgePoints) * TWO_PI;
        boltPoints.push({
          x: s.centerX + Math.cos(angle) * logoRadius,
          y: s.centerY + Math.sin(angle) * logoRadius,
        });
      }
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const numActivePoints = Math.floor(
        2 + surge * 4 + Math.sin(time * 3) * 2,
      );
      for (let i = 0; i < Math.min(numActivePoints, boltPoints.length); i++) {
        const pointIdx = Math.floor((time * 2 + i * 1.3) % boltPoints.length);
        const startPt = boltPoints[pointIdx];
        const dx = startPt.x - s.centerX;
        const dy = startPt.y - s.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = dx / dist;
        const ny = dy / dist;
        const boltLength = 40 + Math.sin(time * 5 + i * 2) * 25 + surge * 60;
        const angleOffset = Math.sin(time * 4 + i * 3) * 0.5;
        const endX =
          startPt.x +
          (nx * Math.cos(angleOffset) - ny * Math.sin(angleOffset)) *
            boltLength;
        const endY =
          startPt.y +
          (nx * Math.sin(angleOffset) + ny * Math.cos(angleOffset)) *
            boltLength;
        const points = generateInnerBolt(startPt.x, startPt.y, endX, endY, 4);
        if (points.length < 2) continue;
        const alpha = 0.5 + surge * 0.4 + Math.sin(time * 6 + i * 1.5) * 0.3;
        const hue = theme.primary + Math.sin(time * 2 + i) * 20;
        ctx.globalAlpha = alpha * 0.12;
        ctx.strokeStyle = `hsl(${hue},100%,50%)`;
        ctx.lineWidth = 10;
        drawBoltPath(ctx, points);
        ctx.globalAlpha = alpha * 0.25;
        ctx.strokeStyle = `hsl(${hue},100%,60%)`;
        ctx.lineWidth = 6;
        drawBoltPath(ctx, points);
        ctx.globalAlpha = alpha * 0.5;
        ctx.strokeStyle = `hsl(${hue},100%,70%)`;
        ctx.lineWidth = 3;
        drawBoltPath(ctx, points);
        ctx.globalAlpha = alpha * 0.9;
        ctx.strokeStyle = `hsl(${hue},80%,85%)`;
        ctx.lineWidth = 1.5;
        drawBoltPath(ctx, points);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.lineWidth = 0.6;
        drawBoltPath(ctx, points);
        if (Math.random() < 0.4 + surge * 0.4) {
          const branchIdx = Math.floor(points.length * 0.4);
          if (branchIdx < points.length) {
            const branchStart = points[branchIdx];
            const branchAngle =
              Math.atan2(endY - startPt.y, endX - startPt.x) +
              (Math.random() - 0.5) * 1.2;
            const branchLen = 15 + Math.random() * 25;
            const branchPoints = generateInnerBolt(
              branchStart.x,
              branchStart.y,
              branchStart.x + Math.cos(branchAngle) * branchLen,
              branchStart.y + Math.sin(branchAngle) * branchLen,
              2,
            );
            ctx.globalAlpha = alpha * 0.4;
            ctx.strokeStyle = `hsl(${hue},100%,70%)`;
            ctx.lineWidth = 2;
            drawBoltPath(ctx, branchPoints);
            ctx.globalAlpha = alpha * 0.6;
            ctx.strokeStyle = "rgba(255,255,255,0.8)";
            ctx.lineWidth = 0.5;
            drawBoltPath(ctx, branchPoints);
          }
        }
      }
      ctx.globalAlpha = 1;
    },
    [generateInnerBolt],
  );

  const generateBranchBolt = useCallback(
    (
      sx: number,
      sy: number,
      ex: number,
      ey: number,
      depth: number,
    ): { x: number; y: number }[] => {
      const points: { x: number; y: number }[] = [{ x: sx, y: sy }];
      const subdivide = (
        start: { x: number; y: number },
        end: { x: number; y: number },
        d: number,
      ): { x: number; y: number }[] => {
        if (d === 0) return [end];
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        const dist = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2);
        const offset = (Math.random() - 0.5) * dist * 0.4;
        const perpX = -(end.y - start.y) / (dist || 1);
        const perpY = (end.x - start.x) / (dist || 1);
        const mid = { x: midX + perpX * offset, y: midY + perpY * offset };
        return [...subdivide(start, mid, d - 1), ...subdivide(mid, end, d - 1)];
      };
      points.push(...subdivide({ x: sx, y: sy }, { x: ex, y: ey }, depth));
      return points;
    },
    [],
  );

  const drawOrbitingLightning = useCallback(
    (ctx: CanvasRenderingContext2D, time: number, surge: number) => {
      const s = stateRef.current;
      const theme = COLOR_THEMES[themeRef.current];
      const logoRadius = Math.min(s.width, s.height) * 0.11 * 0.75;
      const orbitRadius = logoRadius + 25 + surge * 10;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      for (let b = 0; b < 4; b++) {
        const baseAngle = (b / 4) * TWO_PI + time * 1.2;
        const boltLength = 60 + Math.sin(time * 3 + b) * 20 + surge * 30;
        const startX = s.centerX + Math.cos(baseAngle) * orbitRadius;
        const startY = s.centerY + Math.sin(baseAngle) * orbitRadius;
        const endAngle = baseAngle + boltLength / orbitRadius;
        const endX = s.centerX + Math.cos(endAngle) * orbitRadius;
        const endY = s.centerY + Math.sin(endAngle) * orbitRadius;

        // Generate orbit bolt
        const startAngleCalc = Math.atan2(
          startY - s.centerY,
          startX - s.centerX,
        );
        const endAngleCalc = Math.atan2(endY - s.centerY, endX - s.centerX);
        let angleDiff = endAngleCalc - startAngleCalc;
        if (angleDiff < 0) angleDiff += TWO_PI;
        const mainPoints: { x: number; y: number }[] = [];
        for (let i = 0; i <= 15; i++) {
          const t = i / 15;
          const angle = startAngleCalc + angleDiff * t;
          const jitter = (Math.random() - 0.5) * 12;
          mainPoints.push({
            x: s.centerX + Math.cos(angle) * (orbitRadius + jitter),
            y: s.centerY + Math.sin(angle) * (orbitRadius + jitter),
          });
        }
        if (mainPoints.length < 2) continue;
        const alpha = 0.7 + surge * 0.3 + Math.sin(time * 5 + b * 2) * 0.2;
        const hue = theme.primary + Math.sin(time + b) * 15;
        ctx.globalAlpha = alpha * 0.15;
        ctx.strokeStyle = `hsl(${hue},100%,55%)`;
        ctx.lineWidth = 12;
        drawBoltPath(ctx, mainPoints);
        ctx.globalAlpha = alpha * 0.3;
        ctx.strokeStyle = `hsl(${hue},100%,60%)`;
        ctx.lineWidth = 7;
        drawBoltPath(ctx, mainPoints);
        ctx.globalAlpha = alpha * 0.6;
        ctx.strokeStyle = `hsl(${hue},100%,70%)`;
        ctx.lineWidth = 4;
        drawBoltPath(ctx, mainPoints);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = `hsl(${hue},90%,85%)`;
        ctx.lineWidth = 2;
        drawBoltPath(ctx, mainPoints);
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.lineWidth = 0.8;
        drawBoltPath(ctx, mainPoints);

        const numBranches = 2 + Math.floor(surge * 3);
        for (let br = 0; br < numBranches; br++) {
          const branchIdx = Math.floor(
            (mainPoints.length - 1) * (0.2 + br * 0.25),
          );
          if (branchIdx >= mainPoints.length) continue;
          const branchStart = mainPoints[branchIdx];
          const branchAngle2 =
            baseAngle +
            (branchIdx / mainPoints.length) * (boltLength / orbitRadius);
          const outwardAngle = branchAngle2 + (Math.random() - 0.5) * 0.8;
          const branchLen = 20 + Math.random() * 35 + surge * 20;
          const branchPoints = generateBranchBolt(
            branchStart.x,
            branchStart.y,
            branchStart.x + Math.cos(outwardAngle) * branchLen,
            branchStart.y + Math.sin(outwardAngle) * branchLen,
            3,
          );
          if (branchPoints.length < 2) continue;
          const branchAlpha = alpha * 0.6;
          ctx.globalAlpha = branchAlpha * 0.3;
          ctx.strokeStyle = `hsl(${hue},100%,60%)`;
          ctx.lineWidth = 4;
          drawBoltPath(ctx, branchPoints);
          ctx.globalAlpha = branchAlpha * 0.7;
          ctx.strokeStyle = `hsl(${hue},100%,75%)`;
          ctx.lineWidth = 2;
          drawBoltPath(ctx, branchPoints);
          ctx.globalAlpha = branchAlpha;
          ctx.strokeStyle = "rgba(255,255,255,0.9)";
          ctx.lineWidth = 0.6;
          drawBoltPath(ctx, branchPoints);
        }
      }
      ctx.globalAlpha = 1;
    },
    [generateBranchBolt],
  );

  const animate = useCallback(
    (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Frame skip on mobile — render every other frame
      frameCountRef.current++;
      if (isMobile && frameCountRef.current % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      const s = stateRef.current;
      let dt = (timestamp - s.lastTime) / 1000;
      dt = Math.min(dt, 0.05);
      s.lastTime = timestamp;
      s.time = timestamp / 1000;
      const params = MODE_PARAMS[modeRef.current];
      const audio = audioLevelRef.current;
      s.currentIntensity += (params.intensity - s.currentIntensity) * dt * 3;
      const audioBoost = audio * 1.8;
      if (Math.random() < dt * params.particleRate * (1 + audioBoost))
        spawnParticle();
      const boltInt = params.boltInterval / (1 + audioBoost * 0.8);
      if (s.time - s.lastBoltTime > boltInt) {
        spawnBolt();
        s.lastBoltTime = s.time;
      }
      const sinceSurge = s.time - s.lastSurge;
      if (
        !s.surgeActive &&
        sinceSurge > params.surgeInterval + Math.random() * 4
      ) {
        s.surgeActive = true;
        s.surgeProgress = 0;
        s.lastSurge = s.time;
        for (let i = 0; i < 4; i++) setTimeout(() => spawnBolt(), i * 60);
      }
      if (s.surgeActive) {
        s.surgeProgress += dt * 2.8;
        if (s.surgeProgress > 1) s.surgeActive = false;
        const shake =
          fastSin(s.surgeProgress * Math.PI) * 3 * s.currentIntensity;
        s.shakeX = fastSin(s.time * 40) * shake * 0.5;
        s.shakeY = fastSin(s.time * 52) * shake * 0.5;
      } else {
        s.shakeX *= 0.9;
        s.shakeY *= 0.9;
      }
      const speedMult = params.baseSpeed * (1 + audio * 0.4);
      for (let i = 0; i < ringsRef.current.length; i++)
        ringsRef.current[i].rotation +=
          ringsRef.current[i].speed * dt * speedMult;
      const rawSurge = s.surgeActive ? fastSin(s.surgeProgress * Math.PI) : 0;
      const surge = Math.min(
        1,
        rawSurge * rawSurge * (3 - 2 * rawSurge) + audio * 0.4,
      );

      ctx.save();
      ctx.translate(s.shakeX, s.shakeY);
      ctx.fillStyle = "#070a12";
      ctx.fillRect(-10, -10, s.width + 20, s.height + 20);
      const theme = COLOR_THEMES[themeRef.current];
      const glowRad = Math.max(s.width, s.height) * 0.45;
      const glow = ctx.createRadialGradient(
        s.centerX,
        s.centerY,
        0,
        s.centerX,
        s.centerY,
        glowRad,
      );
      const breathe =
        (fastSin(s.time * 0.5) * 0.3 + 0.7) * 0.15 * s.currentIntensity +
        surge * 0.3;
      glow.addColorStop(
        0,
        `rgba(${theme.r},${theme.g},${theme.b},${breathe * 0.4})`,
      );
      glow.addColorStop(
        0.5,
        `rgba(${theme.r},${theme.g},${theme.b},${breathe * 0.1})`,
      );
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, s.width, s.height);
      drawMatrix(ctx, dt, surge);
      drawArcs(ctx, s.time * speedMult, surge);
      drawParticles(ctx, dt, surge, s.time);
      drawBolts(ctx, dt);
      drawRings(ctx, s.time * speedMult, surge);
      if (s.surgeActive) {
        const ripR = s.surgeProgress * Math.min(s.width, s.height) * 0.55;
        const ripA = (1 - s.surgeProgress) * 0.35;
        ctx.strokeStyle = `rgba(${theme.ra},${theme.ga},${theme.ba},${ripA})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(s.centerX, s.centerY, ripR, 0, TWO_PI);
        ctx.stroke();
      }
      drawLogo(ctx, s.time, surge);
      drawInnerBoltLightning(ctx, s.time, surge);
      drawOrbitingLightning(ctx, s.time, surge);
      const corners = [
        [70, 70],
        [s.width - 70, 70],
        [70, s.height - 70],
        [s.width - 70, s.height - 70],
      ];
      for (let i = 0; i < 4; i++) {
        const pulse = fastSin(s.time * 2 + i * 1.57) * 0.5 + 0.5;
        const alphaC = 0.15 + pulse * 0.2 + surge * 0.2;
        const grad = ctx.createRadialGradient(
          corners[i][0],
          corners[i][1],
          0,
          corners[i][0],
          corners[i][1],
          50,
        );
        grad.addColorStop(
          0,
          `rgba(${theme.r},${theme.g},${theme.b},${alphaC})`,
        );
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(corners[i][0], corners[i][1], 50, 0, TWO_PI);
        ctx.fill();
      }
      ctx.restore();
      animationRef.current = requestAnimationFrame(animate);
    },
    [
      spawnParticle,
      spawnBolt,
      drawMatrix,
      drawArcs,
      drawParticles,
      drawBolts,
      drawRings,
      drawLogo,
      drawInnerBoltLightning,
      drawOrbitingLightning,
    ],
  );

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) ctx.scale(dpr, dpr);
    const s = stateRef.current;
    s.width = w;
    s.height = h;
    s.centerX = w / 2;
    s.centerY = h / 2;
    s.dpr = dpr;
    initRings(w, h);
  }, [initRings]);

  useEffect(() => {
    // Load logo image
    const img = new Image();
    img.src = "/logo-no-bg.png";
    logoImgRef.current = img;

    handleResize();
    window.addEventListener("resize", handleResize);
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [handleResize, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default PowerNexus;
