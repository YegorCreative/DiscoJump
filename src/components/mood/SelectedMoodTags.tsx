'use client';

interface Tag {
  label: string;
  emoji: string;
  color?: string;
}

interface SelectedMoodTagsProps {
  tags: Tag[];
}

export default function SelectedMoodTags({ tags }: SelectedMoodTagsProps) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <div
          key={tag.label}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '7px 13px',
            borderRadius: 'var(--dj-radius-full)',
            background: 'linear-gradient(135deg, rgba(155,93,229,0.2), rgba(247,37,133,0.15))',
            border: '1px solid rgba(155,93,229,0.35)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span style={{ fontSize: 15 }}>{tag.emoji}</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--dj-purple-light)',
            }}
          >
            {tag.label}
          </span>
        </div>
      ))}
    </div>
  );
}
