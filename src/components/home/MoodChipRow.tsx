'use client';

import { useState } from 'react';
import { moods } from '@/data/moods';
import MoodChip from '@/components/ui/MoodChip';

export default function MoodChipRow() {
  const [activeMoods, setActiveMoods] = useState<Set<string>>(
    new Set(moods.filter((m) => m.active).map((m) => m.id))
  );

  const toggle = (id: string) => {
    setActiveMoods((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="mood-chip-row"
      aria-label="Mood filter chips"
      style={{ marginBottom: 32 }}
    >
      <div
        style={{
          paddingLeft: 24,
          paddingRight: 8,
          overflowX: 'auto',
          display: 'flex',
          gap: 10,
          paddingBottom: 4,
          scrollbarWidth: 'none',
        }}
      >
        {moods.map((mood) => (
          <MoodChip
            key={mood.id}
            mood={{ ...mood, active: activeMoods.has(mood.id) }}
            onClick={toggle}
          />
        ))}
      </div>
    </section>
  );
}
