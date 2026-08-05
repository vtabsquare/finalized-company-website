import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Cpu } from 'lucide-react';

type Depth = 'near' | 'far';

interface Node {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  dur: number;
  depth: number;
  layer: Depth;
}

interface Edge {
  id: string;
  source: Node;
  target: Node;
  cx: number;
  cy: number;
  d: string;
  len: number;
  depth: number;
  layer: Depth;
}

interface Packet {
  id: string;
  edgeIndex: number;
  progress: number;
  speed: number;
  reverse: boolean;
}

interface Network {
  nodes: Node[];
  edges: Edge[];
  core: { x: number; y: number };
  spine: string;
  spineLen: number;
}

interface NeuralNetworkProps {
  isLightMode?: boolean;
  /** 'far' renders behind the cards, 'near' renders above them (core, packets, pulse). */
  layer?: 'far' | 'near' | 'all';
}

const pointOnCurve = (edge: Edge, t: number) => {
  const mt = 1 - t;
  return {
    x: mt * mt * edge.source.x + 2 * mt * t * edge.cx + t * t * edge.target.x,
    y: mt * mt * edge.source.y + 2 * mt * t * edge.cy + t * t * edge.target.y,
  };
};

/** Deterministic RNG so the 'far' and 'near' layers always describe the same network. */
const mulberry32 = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const smoothPath = (pts: { x: number; y: number }[]) => {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    d += ` Q ${pts[i].x} ${pts[i].y} ${mx} ${my}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
};

const buildNetwork = (W: number, H: number, vertical: boolean, light: boolean): Network => {
  const rand = mulberry32(0x5f3a91);
  const rnd = (a: number, b: number) => a + rand() * (b - a);
  const pick = <T,>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];

  const palette = light
    ? ['#2563EB', '#6366F1', '#8B5CF6', '#06B6D4']
    : ['#60A5FA', '#818CF8', '#A78BFA', '#22D3EE'];

  const cx = W / 2;
  const cy = H / 2;
  const halfMain = (vertical ? H : W) / 2;
  const halfCross = (vertical ? W : H) / 2;

  // Local frame: u runs Vision -> Core -> Mission, v runs across the band
  const toXY = (u: number, v: number) =>
    vertical ? { x: cx + v, y: cy + u } : { x: cx + u, y: cy + v };

  const gapHalf = halfMain * 0.2; // core -> inner card edge
  const cardCross = halfCross * 0.62; // half height (or width) covered by a card

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  const addNode = (u: number, v: number): Node => {
    const p = toXY(u, v);
    const dist = Math.hypot(u, v * 0.9);
    const depth = Math.min(1, dist / (halfMain * 0.9));
    const behindCard = Math.abs(u) > gapHalf && Math.abs(v) < cardCross;
    const size = depth < 0.3 ? pick([3, 4, 6]) : depth < 0.62 ? pick([2, 3, 4]) : pick([1.6, 2.2, 3]);
    const node: Node = {
      id: `n${nodes.length}`,
      x: p.x,
      y: p.y,
      size,
      color: pick(palette),
      delay: rnd(0, 4),
      dur: rnd(3.4, 5),
      depth,
      layer: !behindCard && depth < 0.6 ? 'near' : 'far',
    };
    nodes.push(node);
    return node;
  };

  const addEdge = (a: Node, b: Node, trunk = false) => {
    if (a === b) return;
    if (edges.some(e => (e.source === a && e.target === b) || (e.source === b && e.target === a))) return;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    const bend = rnd(-0.13, 0.13) * len;
    const ecx = (a.x + b.x) / 2 + (-dy / len) * bend;
    const ecy = (a.y + b.y) / 2 + (dx / len) * bend;
    edges.push({
      id: `e${edges.length}`,
      source: a,
      target: b,
      cx: ecx,
      cy: ecy,
      d: `M ${a.x} ${a.y} Q ${ecx} ${ecy} ${b.x} ${b.y}`,
      len,
      depth: Math.max(a.depth, b.depth),
      layer: trunk ? 'far' : a.layer === 'near' && b.layer === 'near' ? 'near' : 'far',
    });
  };

  const core: Node = {
    id: 'core',
    x: cx,
    y: cy,
    size: 0,
    color: '',
    delay: 0,
    dur: 0,
    depth: 0,
    layer: 'near',
  };

  const nearest = (from: Node, pool: Node[], count = 1) =>
    pool
      .filter(n => n !== from)
      .map(n => ({ n, d: Math.hypot(n.x - from.x, n.y - from.y) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, count)
      .map(x => x.n);

  // 1. Dense concentric clusters hugging the AI Core
  const ringDefs = vertical
    ? [{ r: halfMain * 0.15, n: 6 }, { r: halfMain * 0.23, n: 8 }, { r: halfMain * 0.32, n: 9 }]
    : [{ r: halfMain * 0.17, n: 7 }, { r: halfMain * 0.26, n: 9 }, { r: halfMain * 0.35, n: 10 }];

  const rings: Node[][] = ringDefs.map(def => {
    const offset = rnd(0, Math.PI);
    return Array.from({ length: def.n }, (_, i) => {
      const a = offset + (i / def.n) * Math.PI * 2 + rnd(-0.16, 0.16);
      const rr = def.r * rnd(0.86, 1.12);
      const spread = vertical ? 0.8 : 1.3;
      const v = Math.max(-halfCross * 0.9, Math.min(halfCross * 0.9, Math.sin(a) * rr * spread));
      return addNode(Math.cos(a) * rr, v);
    });
  });

  rings[0].forEach(n => addEdge(core, n));
  rings.forEach((ring, k) => {
    ring.forEach((n, i) => {
      if (k > 0) {
        nearest(n, rings[k - 1], rand() > 0.55 ? 2 : 1).forEach(p => addEdge(n, p));
      }
      if (rand() > 0.32) addEdge(n, ring[(i + 1) % ring.length]);
    });
  });

  // 2. Trunks: branches that emerge from each card edge and feed the core
  const spineChains: { left: Node[]; right: Node[] } = { left: [], right: [] };
  ([-1, 1] as const).forEach(side => {
    [-1, 1].forEach((lane, laneIdx) => {
      const laneV = lane * halfCross * rnd(0.1, 0.3);
      const outer = addNode(side * (gapHalf + rnd(190, 250)), laneV + rnd(-24, 24));
      const mid = addNode(side * (gapHalf + rnd(60, 120)), laneV * rnd(0.7, 1) + rnd(-14, 14));
      const inner = addNode(side * gapHalf * rnd(0.68, 0.92), laneV * rnd(0.4, 0.7));
      addEdge(outer, mid, true);
      addEdge(mid, inner, true);
      nearest(inner, rings[0], 2).forEach(p => addEdge(inner, p, true));
      addEdge(inner, core, true);
      if (laneIdx === 0) {
        spineChains[side === -1 ? 'left' : 'right'] = [outer, mid, inner];
      }
    });
  });

  // 3. Sparse periphery for depth, wired only to close neighbours (no giant arcs)
  const peripheryCount = vertical ? 10 : 14;
  const maxLocal = halfMain * 0.26;
  for (let i = 0; i < peripheryCount; i++) {
    const u = (rand() > 0.5 ? 1 : -1) * rnd(halfMain * 0.42, halfMain * 0.98);
    const v = rnd(-halfCross * 0.92, halfCross * 0.92);
    const n = addNode(u, v);
    nearest(n, nodes.slice(0, -1), 3)
      .filter(p => Math.hypot(p.x - n.x, p.y - n.y) < maxLocal)
      .slice(0, 2)
      .forEach(p => addEdge(n, p));
  }

  // 4. The story path: Vision card -> AI Core -> Mission card
  const spinePts = [
    ...spineChains.left,
    core,
    ...[...spineChains.right].reverse(),
  ].map(n => ({ x: n.x, y: n.y }));
  const spineLen = spinePts.reduce(
    (acc, p, i) => (i === 0 ? 0 : acc + Math.hypot(p.x - spinePts[i - 1].x, p.y - spinePts[i - 1].y)),
    0
  );

  return { nodes, edges, core: { x: cx, y: cy }, spine: smoothPath(spinePts), spineLen: spineLen * 1.08 };
};

export const NeuralNetworkAnimation: React.FC<NeuralNetworkProps> = ({ isLightMode = false, layer = 'all' }) => {
  const showFar = layer !== 'near';
  const showNear = layer !== 'far';
  const uid = layer;
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Only animate while the network is actually on screen. The packet loop and the
  // parallax handler each trigger a full re-render of this SVG (hundreds of
  // filtered elements), so leaving them running off-screen starved video
  // playback elsewhere on the page.
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => setIsVisible(entries[0]?.isIntersecting ?? false),
      { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Parallax state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!isVisible) return;
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = containerRef.current;
        if (!el) return;
        const { left, top, width, height } = el.getBoundingClientRect();
        setMousePos({
          x: Math.max(-0.5, Math.min(0.5, (e.clientX - left) / width - 0.5)),
          y: Math.max(-0.5, Math.min(0.5, (e.clientY - top) / height - 0.5)),
        });
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isVisible]);

  // Vertical composition on small screens (Vision -> AI Core -> Mission)
  const [isVertical, setIsVertical] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const apply = () => setIsVertical(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  const W = isVertical ? 560 : 1240;
  const H = isVertical ? 900 : 540;

  // Mask geometry: the near plane lives in the corridor between the cards + the strips around them
  const mainCenter = (isVertical ? H : W) / 2;
  const crossCenter = (isVertical ? W : H) / 2;
  const corridor = mainCenter * 0.2 + 60;
  const crossCard = crossCenter * 0.6;

  // Deterministic geometry: the far and near layers describe the same network
  const net = useMemo(() => buildNetwork(W, H, isVertical, isLightMode), [W, H, isVertical, isLightMode]);

  const nearEdges = useMemo(() => net.edges.filter(e => e.layer === 'near'), [net]);
  const farEdges = useMemo(() => net.edges.filter(e => e.layer === 'far'), [net]);
  const nearNodes = useMemo(() => net.nodes.filter(n => n.layer === 'near'), [net]);
  const farNodes = useMemo(() => net.nodes.filter(n => n.layer === 'far'), [net]);

  // Packets Animation Loop via requestAnimationFrame
  const [packets, setPackets] = useState<Packet[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    if (!showNear || !nearEdges.length || !isVisible) return;
    const maxPackets = isVertical ? 5 : 9;
    let last = performance.now();

    const spawn = (): Packet => ({
      id: `packet-${Math.random().toString(36).slice(2)}`,
      edgeIndex: Math.floor(Math.random() * nearEdges.length),
      progress: 0,
      speed: 0.06 + Math.random() * 0.07, // progress per second: very slow
      reverse: Math.random() > 0.5,
    });

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      setPackets(prev => {
        const next = prev
          .map(p => ({ ...p, progress: p.progress + p.speed * dt }))
          .filter(p => p.progress <= 1); // dies on arrival at the next node
        while (next.length < maxPackets) next.push(spawn());
        return next;
      });
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [nearEdges, isVertical, showNear, isVisible]);

  // Electricity: a pulse travels through a handful of connected edges
  const [activeEdges, setActiveEdges] = useState<string[]>([]);
  useEffect(() => {
    if (!showNear || !nearEdges.length || !isVisible) return;
    const pick = () => {
      const start = nearEdges[Math.floor(Math.random() * nearEdges.length)];
      const chain = [start];
      let frontier = start.target.id;
      for (let i = 0; i < 3; i++) {
        const candidates = nearEdges.filter(
          e => !chain.includes(e) && (e.source.id === frontier || e.target.id === frontier)
        );
        if (!candidates.length) break;
        const next = candidates[Math.floor(Math.random() * candidates.length)];
        chain.push(next);
        frontier = next.source.id === frontier ? next.target.id : next.source.id;
      }
      setActiveEdges(chain.map(e => e.id));
    };
    pick();
    const interval = setInterval(pick, 5200);
    return () => clearInterval(interval);
  }, [nearEdges, showNear, isVisible]);

  // Far plane drifts more than the near plane -> parallax depth (max 10px)
  const depthFactor = showNear && !showFar ? 8 : 20;
  const parallaxX = mousePos.x * depthFactor;
  const parallaxY = mousePos.y * depthFactor;

  const edgeOpacity = (depth: number) =>
    Math.max(0.05, (isLightMode ? 0.42 : 0.36) * (1 - depth * 0.86));
  const nodeOpacity = (depth: number) =>
    Math.max(0.14, (isLightMode ? 0.82 : 0.95) * (1 - depth * 0.8));

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
    >
      {/* Network plane */}
      <div
        className="absolute inset-0 pointer-events-none will-change-transform transition-transform duration-[1100ms] ease-out"
        style={{ transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)` }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id={`nnEdge-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id={`nnPulse-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id={`nnGlow-${uid}`} x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Distant plane is defocused -> depth */}
            <filter id={`nnDeep-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.6" />
            </filter>

            {/* Corridor mask: the near plane only lives between / around the cards */}
            <linearGradient id={`nnCorridor-${uid}`} x1="0%" y1="0%" x2={isVertical ? '0%' : '100%'} y2={isVertical ? '100%' : '0%'}>
              <stop offset="0%" stopColor="#000" />
              <stop offset="22%" stopColor="#fff" />
              <stop offset="78%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
            <linearGradient id={`nnStripA-${uid}`} x1="0%" y1="0%" x2={isVertical ? '100%' : '0%'} y2={isVertical ? '0%' : '100%'}>
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#000" />
            </linearGradient>
            <linearGradient id={`nnStripB-${uid}`} x1="0%" y1="0%" x2={isVertical ? '100%' : '0%'} y2={isVertical ? '0%' : '100%'}>
              <stop offset="0%" stopColor="#000" />
              <stop offset="100%" stopColor="#fff" />
            </linearGradient>
            <mask id={`nnNear-${uid}`}>
              {isVertical ? (
                <>
                  <rect x={0} y={mainCenter - corridor} width={W} height={corridor * 2} fill={`url(#nnCorridor-${uid})`} />
                  <rect x={0} y={0} width={crossCenter - crossCard} height={H} fill={`url(#nnStripA-${uid})`} />
                  <rect x={crossCenter + crossCard} y={0} width={crossCenter - crossCard} height={H} fill={`url(#nnStripB-${uid})`} />
                </>
              ) : (
                <>
                  <rect x={mainCenter - corridor} y={0} width={corridor * 2} height={H} fill={`url(#nnCorridor-${uid})`} />
                  <rect x={0} y={0} width={W} height={crossCenter - crossCard} fill={`url(#nnStripA-${uid})`} />
                  <rect x={0} y={crossCenter + crossCard} width={W} height={crossCenter - crossCard} fill={`url(#nnStripB-${uid})`} />
                </>
              )}
            </mask>
          </defs>

          {/* ---------- FAR PLANE (behind the cards) ---------- */}
          {showFar && (
            <g>
              <g filter={`url(#nnDeep-${uid})`}>
                {farEdges.filter(e => e.depth > 0.66).map(edge => (
                  <path
                    key={edge.id}
                    d={edge.d}
                    fill="none"
                    stroke={`url(#nnEdge-${uid})`}
                    strokeWidth={1}
                    strokeLinecap="round"
                    opacity={edgeOpacity(edge.depth)}
                  />
                ))}
                {farNodes.filter(n => n.depth > 0.66).map(node => (
                  <circle key={node.id} cx={node.x} cy={node.y} r={node.size} fill={node.color} opacity={nodeOpacity(node.depth)} />
                ))}
              </g>

              {farEdges.filter(e => e.depth <= 0.66).map(edge => (
                <path
                  key={edge.id}
                  d={edge.d}
                  fill="none"
                  stroke={`url(#nnEdge-${uid})`}
                  strokeWidth={1}
                  strokeLinecap="round"
                  opacity={edgeOpacity(edge.depth)}
                />
              ))}
              {farNodes.filter(n => n.depth <= 0.66).map(node => (
                <circle key={node.id} cx={node.x} cy={node.y} r={node.size} fill={node.color} opacity={nodeOpacity(node.depth)}>
                  <animate
                    attributeName="r"
                    values={`${node.size};${node.size * 1.15};${node.size}`}
                    dur={`${node.dur}s`}
                    begin={`${node.delay}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;0.5;1"
                    keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
                  />
                </circle>
              ))}
            </g>
          )}

          {/* ---------- NEAR PLANE (above the cards, inside the corridor) ---------- */}
          {showNear && (
            <g mask={`url(#nnNear-${uid})`}>
              {nearEdges.map(edge => (
                <path
                  key={edge.id}
                  d={edge.d}
                  fill="none"
                  stroke={`url(#nnEdge-${uid})`}
                  strokeWidth={1}
                  strokeLinecap="round"
                  opacity={edgeOpacity(edge.depth)}
                />
              ))}

              {/* Electricity rippling through a chain of connected edges */}
              {nearEdges
                .filter(edge => activeEdges.includes(edge.id))
                .map((edge, i) => (
                  <path
                    key={`spark-${edge.id}`}
                    d={edge.d}
                    fill="none"
                    stroke={`url(#nnPulse-${uid})`}
                    strokeWidth={1.3}
                    strokeLinecap="round"
                    filter={`url(#nnGlow-${uid})`}
                    strokeDasharray={`${edge.len * 0.4} ${edge.len * 2}`}
                    opacity={0}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      dur="2.8s"
                      begin={`${i * 0.4}s`}
                      repeatCount="indefinite"
                      values={`${edge.len * 0.4};${-edge.len}`}
                      calcMode="spline"
                      keyTimes="0;1"
                      keySplines="0.4 0 0.2 1"
                    />
                    <animate
                      attributeName="opacity"
                      dur="2.8s"
                      begin={`${i * 0.4}s`}
                      repeatCount="indefinite"
                      values="0;0.6;0.5;0"
                      keyTimes="0;0.2;0.7;1"
                    />
                  </path>
                ))}

              {/* The story pulse: Vision -> AI Core -> Mission, every 8s */}
              <path
                d={net.spine}
                fill="none"
                stroke={`url(#nnPulse-${uid})`}
                strokeWidth={1.7}
                strokeLinecap="round"
                filter={`url(#nnGlow-${uid})`}
                strokeDasharray={`150 ${net.spineLen * 2}`}
                opacity={0}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  dur="8s"
                  repeatCount="indefinite"
                  values={`150;${-net.spineLen};${-net.spineLen}`}
                  keyTimes="0;0.6;1"
                  calcMode="spline"
                  keySplines="0.35 0 0.25 1;0 0 1 1"
                />
                <animate
                  attributeName="opacity"
                  dur="8s"
                  repeatCount="indefinite"
                  values="0;0.55;0.55;0;0"
                  keyTimes="0;0.08;0.5;0.62;1"
                />
              </path>
              <circle r={3} fill={isLightMode ? '#4F46E5' : '#C7D2FE'} filter={`url(#nnGlow-${uid})`} opacity={0}>
                <animateMotion
                  dur="8s"
                  repeatCount="indefinite"
                  path={net.spine}
                  keyPoints="0;1;1"
                  keyTimes="0;0.6;1"
                  calcMode="spline"
                  keySplines="0.35 0 0.25 1;0 0 1 1"
                />
                <animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="0;0.9;0.9;0;0" keyTimes="0;0.06;0.52;0.62;1" />
              </circle>

              {/* Near nodes: bigger, brighter, slow breathing */}
              {nearNodes.map(node => (
                <g key={node.id}>
                  <circle cx={node.x} cy={node.y} r={node.size * 3} fill={node.color} opacity={isLightMode ? 0.06 : 0.1} />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.size}
                    fill={node.color}
                    opacity={nodeOpacity(node.depth)}
                    filter={`url(#nnGlow-${uid})`}
                  >
                    <animate
                      attributeName="r"
                      values={`${node.size};${node.size * 1.15};${node.size}`}
                      dur={`${node.dur}s`}
                      begin={`${node.delay}s`}
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0;0.5;1"
                      keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
                    />
                  </circle>
                </g>
              ))}

              {/* Data packets drifting between neighbouring nodes */}
              {packets.map(p => {
                const edge = nearEdges[p.edgeIndex];
                if (!edge) return null;
                const t = p.reverse ? 1 - p.progress : p.progress;
                const { x, y } = pointOnCurve(edge, t);
                const fade = Math.min(1, Math.sin(Math.PI * p.progress) * 2);
                return (
                  <circle
                    key={p.id}
                    cx={x}
                    cy={y}
                    r={2}
                    fill={isLightMode ? '#2563EB' : '#BFDBFE'}
                    opacity={fade * (isLightMode ? 0.85 : 1)}
                    filter={`url(#nnGlow-${uid})`}
                  />
                );
              })}
            </g>
          )}
        </svg>
      </div>

      {/* Floating AI Core — the hero of the system */}
      {showNear && (
        <div className="relative nn-float will-change-transform">
          {/* Ambient glow */}
          <div className="absolute -inset-24 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.20),rgba(37,99,235,0.10)_45%,transparent_70%)] nn-breathe pointer-events-none" />
          {/* Expanding rings */}
          <div className={`absolute -inset-3 rounded-[38px] border nn-ring pointer-events-none ${isLightMode ? 'border-blue-500/25' : 'border-blue-400/25'}`} />
          <div className={`absolute -inset-3 rounded-[38px] border nn-ring nn-ring-delay pointer-events-none ${isLightMode ? 'border-violet-500/20' : 'border-violet-400/20'}`} />
          {/* Pulse arrival flash, synced with the spine pulse */}
          <div className={`absolute -inset-3 rounded-[38px] border-2 nn-arrive pointer-events-none ${isLightMode ? 'border-indigo-500/35' : 'border-indigo-300/35'}`} />

          <div
            className={`relative w-[132px] h-[132px] rounded-[32px] flex flex-col items-center justify-center overflow-hidden backdrop-blur-2xl border ${
              isLightMode
                ? 'bg-white/80 border-white/90 shadow-[0_28px_70px_rgba(37,99,235,0.18)]'
                : 'bg-slate-900/70 border-white/15 shadow-[0_28px_80px_rgba(59,130,246,0.22)]'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-violet-500/20 pointer-events-none" />
            <div className="absolute inset-0 nn-sheen pointer-events-none" />
            <div className={`absolute inset-[1px] rounded-[31px] pointer-events-none ${isLightMode ? 'ring-1 ring-inset ring-white/70' : 'ring-1 ring-inset ring-white/10'}`} />

            <Cpu className={`relative w-11 h-11 mb-2 ${isLightMode ? 'text-blue-600' : 'text-blue-300'}`} strokeWidth={1.4} />
            <span className={`relative text-[9px] font-bold uppercase tracking-[0.24em] ${isLightMode ? 'text-slate-500' : 'text-slate-300'}`}>
              AI Core
            </span>
          </div>
        </div>
      )}

      <style>{`
        @keyframes nn-float {
          0%, 100% { transform: translate3d(0, -6px, 0); }
          50% { transform: translate3d(0, 6px, 0); }
        }
        .nn-float { animation: nn-float 7s ease-in-out infinite; }

        @keyframes nn-breathe {
          0%, 100% { opacity: 0.55; transform: scale(0.96); }
          50% { opacity: 0.9; transform: scale(1.04); }
        }
        .nn-breathe { animation: nn-breathe 6.5s ease-in-out infinite; }

        @keyframes nn-ring {
          0% { opacity: 0.5; transform: scale(0.94); }
          70% { opacity: 0; transform: scale(1.28); }
          100% { opacity: 0; transform: scale(1.28); }
        }
        .nn-ring { animation: nn-ring 6s cubic-bezier(0.25, 0.6, 0.3, 1) infinite; }
        .nn-ring-delay { animation-delay: 3s; }

        @keyframes nn-arrive {
          0%, 26% { opacity: 0; transform: scale(0.9); }
          31% { opacity: 0.7; transform: scale(1.02); }
          46% { opacity: 0; transform: scale(1.4); }
          100% { opacity: 0; transform: scale(1.4); }
        }
        .nn-arrive { animation: nn-arrive 8s ease-out infinite; }

        @keyframes nn-spin { to { transform: rotate(360deg); } }
        .nn-sheen {
          background: conic-gradient(from 0deg, transparent 0 58%, rgba(99,102,241,0.22) 74%, rgba(59,130,246,0.10) 82%, transparent 92%);
          animation: nn-spin 16s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .nn-float, .nn-breathe, .nn-ring, .nn-arrive, .nn-sheen { animation: none; }
        }
      `}</style>
    </div>
  );
};
