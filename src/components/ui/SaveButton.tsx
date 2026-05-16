'use client';

import { useSavedPlaces } from '@/hooks/useSavedPlaces';

interface SaveButtonProps {
  placeId: string;
  /** 'sm' — compact icon for cards  |  'lg' — full-width pill for detail page */
  size?: 'sm' | 'lg';
  /** Stop click event from bubbling (needed inside Link wrappers) */
  stopPropagation?: boolean;
}

export default function SaveButton({
  placeId,
  size = 'lg',
  stopPropagation = false,
}: SaveButtonProps) {
  const { isSaved, toggleSaved } = useSavedPlaces();
  const saved = isSaved(placeId);

  const handleClick = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleSaved(placeId);
  };

  if (size === 'sm') {
    return (
      <button
        id={`save-btn-sm-${placeId}`}
        aria-label={saved ? `Unsave ${placeId}` : `Save ${placeId}`}
        aria-pressed={saved}
        onClick={handleClick}
        style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          width: 30,
          height: 30,
          borderRadius: '50%',
          border: saved
            ? '1.5px solid rgba(155,93,229,0.6)'
            : '1.5px solid rgba(255,255,255,0.18)',
          background: saved
            ? 'linear-gradient(135deg, rgba(155,93,229,0.55), rgba(247,37,133,0.45))'
            : 'rgba(9,9,9,0.55)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: saved ? '0 0 14px rgba(155,93,229,0.5)' : 'none',
          transform: saved ? 'scale(1.1)' : 'scale(1)',
          zIndex: 10,
        }}
      >
        {saved ? '🔖' : '＋'}
      </button>
    );
  }

  // lg — full-width detail page button
  return (
    <button
      id={`save-btn-lg-${placeId}`}
      aria-label={saved ? 'Remove from collection' : 'Save to collection'}
      aria-pressed={saved}
      onClick={handleClick}
      style={{
        width: '100%',
        padding: '15px',
        borderRadius: 'var(--dj-radius-xl)',
        border: saved ? '1.5px solid rgba(155,93,229,0.4)' : 'none',
        background: saved
          ? 'linear-gradient(135deg, rgba(155,93,229,0.22), rgba(247,37,133,0.14))'
          : 'var(--dj-gradient-primary)',
        color: 'white',
        fontSize: 15,
        fontWeight: 700,
        fontFamily: 'var(--font-display)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        boxShadow: saved
          ? '0 0 24px rgba(155,93,229,0.3), inset 0 0 16px rgba(155,93,229,0.08)'
          : '0 6px 28px rgba(155,93,229,0.3)',
        letterSpacing: '-0.01em',
        transition: 'all 0.25s ease',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          transition: 'transform 0.2s ease',
          transform: saved ? 'scale(1.2)' : 'scale(1)',
        }}
      >
        {saved ? '🔖' : '🔖'}
      </span>
      {saved ? 'Saved to Collection ✦' : 'Save to Collection'}
    </button>
  );
}
