'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MoodStep from './MoodStep';
import MoodResultPreview from './MoodResultPreview';
import GlowBackground from '@/components/layout/GlowBackground';
import { places } from '@/data/places';
import { Place } from '@/types';

// ─── Step data ───────────────────────────────────────
type StepNum = 1 | 2 | 3 | 'result';

const STEP_1 = {
  stepLabel: 'Step 1 of 3 · Feeling',
  question: 'What are you feeling right now?',
  options: [
    { id: 'hungry', label: 'Hungry', emoji: '🍽️' },
    { id: 'adventurous', label: 'Adventurous', emoji: '⚡' },
    { id: 'cozy', label: 'Cozy', emoji: '☕' },
    { id: 'social', label: 'Social', emoji: '🥂' },
    { id: 'romantic', label: 'Romantic', emoji: '🌹' },
    { id: 'creative', label: 'Creative', emoji: '🎨' },
    { id: 'dancing', label: 'Dancing', emoji: '🎵' },
    { id: 'chill', label: 'Chill', emoji: '🌊' },
    { id: 'fancy', label: 'Fancy', emoji: '✨' },
    { id: 'curious', label: 'Curious', emoji: '🔍' },
  ],
};

const STEP_2 = {
  stepLabel: 'Step 2 of 3 · Energy',
  question: 'What kind of energy?',
  options: [
    { id: 'low-key', label: 'Low-key', emoji: '🌙' },
    { id: 'balanced', label: 'Balanced', emoji: '⚖️' },
    { id: 'electric', label: 'Electric', emoji: '⚡' },
    { id: 'intimate', label: 'Intimate', emoji: '🕯️' },
    { id: 'loud', label: 'Loud', emoji: '🔊' },
    { id: 'hidden-gem', label: 'Hidden gem', emoji: '💎' },
    { id: 'luxury', label: 'Luxury', emoji: '👑' },
    { id: 'artsy', label: 'Artsy', emoji: '🖼️' },
  ],
};

const STEP_3 = {
  stepLabel: 'Step 3 of 3 · Distance',
  question: 'How far are you willing to go?',
  options: [
    { id: 'near', label: 'Near me', emoji: '📍' },
    { id: '10min', label: '10 minutes', emoji: '🚶' },
    { id: '25min', label: '25 minutes', emoji: '🚗' },
    { id: 'anywhere', label: 'Anywhere in the city', emoji: '🌆' },
  ],
};

// ─── Mood → category mapping ──────────────────────────
const moodCategoryMap: Record<string, string[]> = {
  hungry: ['Restaurant', 'Coffee'],
  cozy: ['Coffee', 'Jazz Bar', 'Bookshop Bar'],
  social: ['Rooftop Bar', 'Beach Club', 'Nightclub'],
  romantic: ['Jazz Bar', 'Bookshop Bar', 'Rooftop Bar'],
  creative: ['Art + Bar', 'Jazz Bar'],
  dancing: ['Nightclub', 'Beach Club'],
  chill: ['Coffee', 'Bookshop Bar', 'Jazz Bar'],
  fancy: ['Rooftop Bar', 'Beach Club'],
  adventurous: ['Beach Club', 'Art + Bar'],
  curious: ['Art + Bar', 'Jazz Bar', 'Bookshop Bar'],
};

function getResultPlaces(feeling: string | null): Place[] {
  const preferred = feeling ? (moodCategoryMap[feeling] ?? []) : [];
  const matched = places
    .filter((p) => preferred.includes(p.category))
    .sort((a, b) => b.vibeMatch - a.vibeMatch);
  const fallback = places
    .filter((p) => !preferred.includes(p.category))
    .sort((a, b) => b.vibeMatch - a.vibeMatch);
  return [...matched, ...fallback].slice(0, 3);
}

function getOption(step: typeof STEP_1 | typeof STEP_2 | typeof STEP_3, id: string | null) {
  return step.options.find((o) => o.id === id) ?? null;
}

// ─── Slide variants ───────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
};

// ─── Progress bar ─────────────────────────────────────
function ProgressBar({ step }: { step: StepNum }) {
  const widths: Record<StepNum, string> = {
    1: '33%',
    2: '66%',
    3: '100%',
    result: '100%',
  };
  return (
    <div
      style={{
        height: 3,
        borderRadius: 2,
        background: 'rgba(255,255,255,0.08)',
        overflow: 'hidden',
        flex: 1,
        margin: '0 12px',
      }}
    >
      <motion.div
        animate={{ width: widths[step] }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
        style={{
          height: '100%',
          borderRadius: 2,
          background: 'var(--dj-gradient-primary)',
        }}
      />
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────
interface MoodEngineModalProps {
  onClose: () => void;
}

export default function MoodEngineModal({ onClose }: MoodEngineModalProps) {
  const [step, setStep] = useState<StepNum>(1);
  const [direction, setDirection] = useState(1);
  const [feeling, setFeeling] = useState<string | null>(null);
  const [energy, setEnergy] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Navigation
  const goBack = () => {
    setDirection(-1);
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 'result') setStep(3);
  };

  const advance = (next: StepNum) => {
    setDirection(1);
    setStep(next);
  };

  const handleFeelingSelect = (id: string) => {
    setFeeling(id);
    setTimeout(() => advance(2), 200);
  };

  const handleEnergySelect = (id: string) => {
    setEnergy(id);
    setTimeout(() => advance(3), 200);
  };

  const handleDistanceSelect = (id: string) => {
    setDistance(id);
    setTimeout(() => advance('result'), 200);
  };

  const resultPlaces = getResultPlaces(feeling);
  const feelingOpt = getOption(STEP_1, feeling);
  const energyOpt = getOption(STEP_2, energy);
  const distanceOpt = getOption(STEP_3, distance);

  const showBack = step !== 1;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="I Feel Like mood engine"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 32, stiffness: 280 }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        overflow: 'hidden',
        background: 'var(--dj-surface)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Ambient glow */}
      <GlowBackground />

      {/* Header */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          padding: '52px 20px 16px',
          gap: 4,
        }}
      >
        {/* Back button */}
        <button
          id="mood-back-btn"
          onClick={showBack ? goBack : undefined}
          aria-label="Go back"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1.5px solid var(--dj-border)',
            background: showBack ? 'var(--dj-card)' : 'transparent',
            color: showBack ? 'var(--dj-text)' : 'transparent',
            fontSize: 18,
            cursor: showBack ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: showBack ? 'var(--dj-border)' : 'transparent',
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
        >
          ←
        </button>

        {/* Progress bar — hide on result */}
        {step !== 'result' ? (
          <ProgressBar step={step} />
        ) : (
          <div style={{ flex: 1, textAlign: 'center' }}>
            <span
              className="font-display"
              style={{
                fontSize: 13,
                fontWeight: 600,
                background: 'var(--dj-gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ✦ Vibe Matched
            </span>
          </div>
        )}

        {/* Close button */}
        <button
          id="mood-close-btn"
          onClick={onClose}
          aria-label="Close mood engine"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1.5px solid var(--dj-border)',
            background: 'var(--dj-card)',
            color: 'var(--dj-text-secondary)',
            fontSize: 18,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'color 0.2s ease',
          }}
        >
          ✕
        </button>
      </div>

      {/* Scrollable step content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step-1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
            >
              <MoodStep
                stepLabel={STEP_1.stepLabel}
                question={STEP_1.question}
                options={STEP_1.options}
                selected={feeling}
                onSelect={handleFeelingSelect}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
            >
              <MoodStep
                stepLabel={STEP_2.stepLabel}
                question={STEP_2.question}
                options={STEP_2.options}
                selected={energy}
                onSelect={handleEnergySelect}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
            >
              <MoodStep
                stepLabel={STEP_3.stepLabel}
                question={STEP_3.question}
                options={STEP_3.options}
                selected={distance}
                onSelect={handleDistanceSelect}
              />
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              style={{ position: 'absolute', inset: 0, overflowY: 'auto' }}
            >
              <MoodResultPreview
                feeling={feeling}
                energy={energy}
                distance={distance}
                places={resultPlaces}
                feelingLabel={feelingOpt?.label ?? ''}
                feelingEmoji={feelingOpt?.emoji ?? ''}
                energyLabel={energyOpt?.label ?? ''}
                energyEmoji={energyOpt?.emoji ?? ''}
                distanceLabel={distanceOpt?.label ?? ''}
                distanceEmoji={distanceOpt?.emoji ?? ''}
                onExplore={onClose}
                onSave={onClose}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
