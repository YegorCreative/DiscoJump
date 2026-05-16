'use client';

// ─── Deterministic tile palette ──────────────────────────────────────────────
// Using a fixed palette + deterministic index math avoids hydration mismatches.
const PALETTE = [
  'rgba(255,255,255,0.82)',
  'rgba(155,93,229,0.72)',
  'rgba(247,37,133,0.65)',
  'rgba(0,245,255,0.60)',
  'rgba(255,107,53,0.55)',
  'rgba(255,225,77,0.50)',
  'rgba(255,255,255,0.35)',
  'rgba(180,122,255,0.60)',
  'rgba(247,37,133,0.38)',
  'rgba(0,245,255,0.30)',
  'rgba(155,93,229,0.42)',
  'rgba(255,255,255,0.55)',
];

const GRID = 10; // 10×10 = 100 tiles

function tileColor(row: number, col: number): string {
  return PALETTE[(row * 3 + col * 7 + ((row * col) % 5)) % PALETTE.length];
}

// ─── Light particle positions (fixed, not random) ─────────────────────────────
const PARTICLES = [
  { x: -18, y: 64,  size: 14, color: '#9b5de5', dur: '5s',   delay: '0s'    },
  { x: -10, y: 140, size: 9,  color: '#f72585', dur: '6.5s', delay: '1.8s'  },
  { x: 38,  y: 220, size: 11, color: '#00f5ff', dur: '4.5s', delay: '0.6s'  },
  { x: 170, y: 18,  size: 7,  color: '#ffe14d', dur: '5.5s', delay: '2.4s'  },
  { x: 190, y: 155, size: 10, color: '#f72585', dur: '7s',   delay: '1.1s'  },
  { x: 80,  y: 240, size: 6,  color: '#9b5de5', dur: '4s',   delay: '3s'    },
];

export default function DiscoBallHeroBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        right: -24,
        width: 280,
        height: 280,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* ── Scattered light particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="disco-particle"
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            filter: `blur(${Math.round(p.size * 0.55)}px)`,
            opacity: 0.55,
            animation: `discoBallParticle ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* ── Float wrapper ── */}
      <div
        className="disco-float"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 200,
          height: 200,
          animation: 'discoBallFloat 7s ease-in-out infinite',
        }}
      >
        {/* Hanging string */}
        <div
          style={{
            position: 'absolute',
            top: -28,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 1.5,
            height: 28,
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 100%)',
            borderRadius: 1,
          }}
        />

        {/* Outer ambient glow — behind the ball */}
        <div
          style={{
            position: 'absolute',
            inset: -20,
            borderRadius: '50%',
            background: 'transparent',
            boxShadow:
              '0 0 48px rgba(155,93,229,0.35), 0 0 90px rgba(247,37,133,0.18), 0 0 140px rgba(0,245,255,0.10)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Spin container — clips tiles to circle ── */}
        <div
          className="disco-spin"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            position: 'relative',
            animation: 'discoBallSpin 28s linear infinite',
            opacity: 0.88,
          }}
        >
          {/* Tile grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID}, 1fr)`,
              gridTemplateRows: `repeat(${GRID}, 1fr)`,
              gap: '2px',
              width: '100%',
              height: '100%',
              padding: '2px',
            }}
          >
            {Array.from({ length: GRID * GRID }, (_, i) => {
              const row = Math.floor(i / GRID);
              const col = i % GRID;
              return (
                <div
                  key={i}
                  style={{
                    background: tileColor(row, col),
                    borderRadius: 2,
                  }}
                />
              );
            })}
          </div>

          {/* Sphere depth + highlight overlay — stays inside circle clip */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background:
                'radial-gradient(circle at 36% 28%, rgba(255,255,255,0.42) 0%, transparent 42%, rgba(0,0,0,0.48) 82%, rgba(0,0,0,0.72) 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}
