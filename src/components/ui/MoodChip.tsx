'use client';

import { Mood } from '@/types';

interface MoodChipProps {
  mood: Mood;
  onClick?: (id: string) => void;
}

export default function MoodChip({ mood, onClick }: MoodChipProps) {
  return (
    <button
      id={`mood-chip-${mood.id}`}
      aria-pressed={mood.active}
      onClick={() => onClick?.(mood.id)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        paddingLeft: 14,
        paddingRight: 16,
        paddingTop: 9,
        paddingBottom: 9,
        borderRadius: 'var(--dj-radius-full)',
        border: mood.active
          ? `1.5px solid ${mood.color}`
          : '1.5px solid var(--dj-border)',
        background: mood.active
          ? `${mood.color}22`
          : 'var(--dj-card)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: mood.active ? `0 0 16px ${mood.color}40` : 'none',
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }}>{mood.emoji}</span>
      <span
        style={{
          fontSize: 13,
          fontWeight: mood.active ? 600 : 400,
          color: mood.active ? mood.color : 'var(--dj-text-secondary)',
          fontFamily: 'var(--font-body)',
          letterSpacing: '0.01em',
          transition: 'color 0.2s ease',
        }}
      >
        {mood.label}
      </span>
    </button>
  );
}
