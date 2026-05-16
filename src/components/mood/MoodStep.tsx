'use client';

import MoodOptionButton from './MoodOptionButton';

interface Option {
  id: string;
  label: string;
  emoji: string;
}

interface MoodStepProps {
  question: string;
  stepLabel: string;
  options: Option[];
  selected: string | null;
  onSelect: (id: string) => void;
}

export default function MoodStep({
  question,
  stepLabel,
  options,
  selected,
  onSelect,
}: MoodStepProps) {
  return (
    <div
      style={{
        padding: '8px 24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        minHeight: '100%',
      }}
    >
      {/* Step label */}
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--dj-purple-light)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 10,
        }}
      >
        {stepLabel}
      </p>

      {/* Question */}
      <h2
        className="font-display"
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: 'var(--dj-text)',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: 24,
        }}
      >
        {question}
      </h2>

      {/* Options grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: options.length <= 4 ? '1fr' : '1fr 1fr',
          gap: 10,
        }}
      >
        {options.map((opt) => (
          <MoodOptionButton
            key={opt.id}
            label={opt.label}
            emoji={opt.emoji}
            selected={selected === opt.id}
            onClick={() => onSelect(opt.id)}
          />
        ))}
      </div>
    </div>
  );
}
