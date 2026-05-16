'use client';

import { VibeDNATrait } from '@/types';

interface DNAStatProps {
  trait: VibeDNATrait;
  animationDelay?: number;
}

export default function DNAStat({ trait, animationDelay = 0 }: DNAStatProps) {
  const circumference = 2 * Math.PI * 28; // radius = 28
  const progress = circumference - (trait.percentage / 100) * circumference;

  return (
    <div
      id={`dna-stat-${trait.id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        flex: '0 0 auto',
        width: 90,
      }}
    >
      {/* Circular progress */}
      <div style={{ position: 'relative', width: 70, height: 70 }}>
        <svg width="70" height="70" viewBox="0 0 70 70" style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx="35"
            cy="35"
            r="28"
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="5"
          />
          {/* Progress */}
          <circle
            cx="35"
            cy="35"
            r="28"
            fill="none"
            stroke={trait.color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            style={{
              filter: `drop-shadow(0 0 6px ${trait.color}80)`,
              transition: 'stroke-dashoffset 1s ease',
            }}
          />
        </svg>
        {/* Center icon */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>{trait.icon}</span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: trait.color,
              lineHeight: 1,
            }}
          >
            {trait.percentage}%
          </span>
        </div>
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--dj-text-secondary)',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {trait.trait}
      </span>
    </div>
  );
}
