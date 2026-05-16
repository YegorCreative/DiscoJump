'use client';

interface MoodOptionButtonProps {
  label: string;
  emoji: string;
  selected: boolean;
  onClick: () => void;
}

export default function MoodOptionButton({
  label,
  emoji,
  selected,
  onClick,
}: MoodOptionButtonProps) {
  return (
    <button
      aria-pressed={selected}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        padding: '14px 16px',
        borderRadius: 'var(--dj-radius-lg)',
        border: selected
          ? '1.5px solid var(--dj-purple)'
          : '1.5px solid var(--dj-border)',
        background: selected
          ? 'linear-gradient(135deg, rgba(155,93,229,0.2) 0%, rgba(247,37,133,0.12) 100%)'
          : 'var(--dj-card)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.18s ease',
        boxShadow: selected
          ? '0 0 20px rgba(155,93,229,0.3), inset 0 0 12px rgba(155,93,229,0.08)'
          : 'none',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow sweep on selected */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, transparent, rgba(155,93,229,0.08), transparent)',
            pointerEvents: 'none',
          }}
        />
      )}
      <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>{emoji}</span>
      <span
        style={{
          fontSize: 15,
          fontWeight: selected ? 600 : 400,
          color: selected ? 'var(--dj-text)' : 'var(--dj-text-secondary)',
          fontFamily: 'var(--font-body)',
          transition: 'color 0.18s ease',
        }}
      >
        {label}
      </span>
      {selected && (
        <span
          style={{
            marginLeft: 'auto',
            fontSize: 16,
            color: 'var(--dj-purple-light)',
            flexShrink: 0,
          }}
        >
          ✦
        </span>
      )}
    </button>
  );
}
