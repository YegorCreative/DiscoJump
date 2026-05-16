'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Place } from '@/types';

interface PlaceDetailHeroProps {
  place: Place;
}

export default function PlaceDetailHero({ place }: PlaceDetailHeroProps) {
  const router = useRouter();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 380,
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Hero image */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Image
          src={place.imageUrl}
          alt={`${place.name} — ${place.category} in ${place.location}`}
          fill
          priority
          sizes="430px"
          style={{ objectFit: 'cover' }}
        />
      </motion.div>

      {/* Multi-stop gradient overlay — image fades to surface at bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, var(--dj-surface) 0%, rgba(14,14,22,0.65) 40%, rgba(14,14,22,0.2) 70%, transparent 100%)',
        }}
      />

      {/* Top row: back button + share button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '52px 20px 0',
        }}
      >
        {/* Back */}
        <button
          id="place-back-btn"
          aria-label="Go back"
          onClick={() => router.back()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '9px 14px',
            borderRadius: 'var(--dj-radius-full)',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(9,9,9,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: 'var(--dj-text)',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          ← Back
        </button>

        {/* Share (mock) */}
        <button
          id="place-share-btn"
          aria-label="Share this place"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)',
            background: 'rgba(9,9,9,0.55)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            color: 'var(--dj-text)',
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ↑
        </button>
      </motion.div>

      {/* Bottom overlay: category + hidden gem badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 12px',
            borderRadius: 'var(--dj-radius-full)',
            background: 'rgba(9,9,9,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--dj-text-secondary)',
          }}
        >
          {place.categoryEmoji} {place.category}
        </div>

        {place.isHiddenGem && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '5px 12px',
              borderRadius: 'var(--dj-radius-full)',
              background: 'rgba(0,245,255,0.15)',
              border: '1px solid rgba(0,245,255,0.35)',
              backdropFilter: 'blur(12px)',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--dj-cyan)',
            }}
          >
            💎 Hidden Gem
          </div>
        )}
      </motion.div>
    </div>
  );
}
