'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GlowBackground from '@/components/layout/GlowBackground';
import {
  QUIZ_STEPS,
  VIBE_TYPES,
  computeVibeType,
  QuizAnswers,
  QuizOption,
  QuizStep,
  VibeTypeId,
} from '@/data/quiz';
import { useVibeProfile } from '@/hooks/useVibeProfile';

// ─── Slide variants ────────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '80%' : '-80%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-80%' : '80%', opacity: 0 }),
};
const slideTransition = {
  type: 'spring' as const,
  damping: 32,
  stiffness: 280,
  mass: 0.9,
};

// ─── Option card ───────────────────────────────────────────────────────────────
function OptionCard({
  option,
  selected,
  onSelect,
  disabled,
}: {
  option: QuizOption;
  selected: boolean;
  onSelect: () => void;
  disabled: boolean;
}) {
  return (
    <button
      aria-pressed={selected}
      onClick={onSelect}
      disabled={disabled}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '14px 14px 12px',
        borderRadius: 'var(--dj-radius-lg)',
        border: selected
          ? '1.5px solid rgba(155,93,229,0.7)'
          : '1.5px solid var(--dj-border)',
        background: selected
          ? 'linear-gradient(135deg, rgba(155,93,229,0.2) 0%, rgba(247,37,133,0.1) 100%)'
          : 'var(--dj-card)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.38 : 1,
        transition: 'all 0.18s ease',
        boxShadow: selected
          ? '0 0 22px rgba(155,93,229,0.28), inset 0 0 12px rgba(155,93,229,0.08)'
          : 'none',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
        textAlign: 'left',
        width: '100%',
        minHeight: 92,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow sweep when selected */}
      {selected && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(120deg, transparent 20%, rgba(155,93,229,0.07) 50%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Check mark */}
      {selected && (
        <span
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--dj-purple-light)',
          }}
        >
          ✦
        </span>
      )}

      <span style={{ fontSize: 26, lineHeight: 1, marginBottom: 8 }}>{option.emoji}</span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: selected ? 'var(--dj-text)' : 'var(--dj-text)',
          lineHeight: 1.25,
          marginBottom: 4,
        }}
      >
        {option.label}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 400,
          color: 'var(--dj-text-secondary)',
          lineHeight: 1.4,
        }}
      >
        {option.description}
      </span>
    </button>
  );
}

// ─── Quiz step view ────────────────────────────────────────────────────────────
function QuizStepView({
  step,
  answer,
  onSelect,
}: {
  step: QuizStep;
  answer: string | string[];
  onSelect: (id: string) => void;
}) {
  const selectedIds = Array.isArray(answer) ? answer : answer ? [answer] : [];
  const isMultiple = step.multiple;
  const max = step.max ?? 3;

  return (
    <div
      style={{
        padding: '28px 20px 40px',
        overflowY: 'auto',
        height: '100%',
      }}
    >
      {/* Question */}
      <h2
        className="font-display"
        style={{
          fontSize: 26,
          fontWeight: 800,
          color: 'var(--dj-text)',
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
          marginBottom: 8,
        }}
      >
        {step.question}
      </h2>
      <p
        style={{
          fontSize: 13,
          color: 'var(--dj-text-secondary)',
          lineHeight: 1.5,
          marginBottom: 20,
        }}
      >
        {step.subtitle}
      </p>

      {/* Multi-select hint */}
      {isMultiple && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 16,
            padding: '5px 12px',
            borderRadius: 'var(--dj-radius-full)',
            background: 'rgba(155,93,229,0.12)',
            border: '1px solid rgba(155,93,229,0.2)',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--dj-purple-light)' }}>
            {selectedIds.length} / {max} selected
          </span>
        </div>
      )}

      {/* Options grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}
      >
        {step.options.map((opt) => {
          const isSelected = selectedIds.includes(opt.id);
          const isDisabled =
            isMultiple && !isSelected && selectedIds.length >= max;
          return (
            <OptionCard
              key={opt.id}
              option={opt}
              selected={isSelected}
              onSelect={() => onSelect(opt.id)}
              disabled={isDisabled}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Result view ───────────────────────────────────────────────────────────────
function ResultView({
  vibeTypeId,
  onDiscover,
}: {
  vibeTypeId: VibeTypeId;
  onDiscover: () => void;
}) {
  const vibe = VIBE_TYPES[vibeTypeId];

  return (
    <div
      style={{
        padding: '40px 24px 64px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        overflowY: 'auto',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Colored aura behind emoji */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${vibe.gradientFrom}28 0%, ${vibe.gradientTo}14 50%, transparent 70%)`,
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* "Your Vibe DNA is" label */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--dj-text-secondary)',
          marginBottom: 20,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Your Vibe DNA is
      </motion.p>

      {/* Emoji reveal */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', damping: 14, stiffness: 260 }}
        style={{ fontSize: 88, lineHeight: 1, marginBottom: 20, position: 'relative', zIndex: 1 }}
      >
        {vibe.emoji}
      </motion.div>

      {/* Vibe type name */}
      <motion.h1
        className="font-display"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          marginBottom: 10,
          background: `linear-gradient(135deg, ${vibe.gradientFrom} 0%, ${vibe.gradientTo} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {vibe.label}
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        style={{
          fontSize: 16,
          fontWeight: 500,
          color: 'var(--dj-text)',
          fontStyle: 'italic',
          marginBottom: 18,
          position: 'relative',
          zIndex: 1,
        }}
      >
        &ldquo;{vibe.tagline}&rdquo;
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        style={{
          fontSize: 14,
          color: 'var(--dj-text-secondary)',
          lineHeight: 1.65,
          maxWidth: 320,
          marginBottom: 28,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {vibe.description}
      </motion.p>

      {/* Traits */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 40,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {vibe.traits.map((trait) => (
          <span
            key={trait}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '7px 14px',
              borderRadius: 'var(--dj-radius-full)',
              background: `${vibe.color}1a`,
              border: `1px solid ${vibe.color}40`,
              fontSize: 12,
              fontWeight: 600,
              color: vibe.color,
            }}
          >
            ✦ {trait}
          </span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={onDiscover}
        aria-label="Start discovering places matched to your vibe"
        style={{
          width: '100%',
          maxWidth: 320,
          padding: '17px',
          borderRadius: 'var(--dj-radius-xl)',
          border: 'none',
          background: `linear-gradient(135deg, ${vibe.gradientFrom} 0%, ${vibe.gradientTo} 100%)`,
          color: 'white',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          cursor: 'pointer',
          letterSpacing: '-0.01em',
          boxShadow: `0 8px 32px ${vibe.gradientFrom}40`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Start Discovering ✦
      </motion.button>

      {/* Skip to home */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{ marginTop: 18, position: 'relative', zIndex: 1 }}
      >
        <Link
          href="/"
          style={{
            fontSize: 12,
            color: 'var(--dj-muted)',
            textDecoration: 'none',
          }}
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Main quiz component ───────────────────────────────────────────────────────
const INITIAL_ANSWERS: QuizAnswers = {
  food: '',
  night: '',
  travel: '',
  atmosphere: '',
  dealBreakers: [],
};

export default function OnboardingQuiz() {
  const router = useRouter();
  const { saveProfile } = useVibeProfile();

  const [step, setStep] = useState(0); // 0-4 for quiz questions
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);
  const [isComplete, setIsComplete] = useState(false);
  const [vibeTypeId, setVibeTypeId] = useState<VibeTypeId | null>(null);

  const currentStepDef = QUIZ_STEPS[step];
  const isLastStep = step === QUIZ_STEPS.length - 1;

  // Get the current answer for the active step
  const currentAnswer: string | string[] = currentStepDef.multiple
    ? answers.dealBreakers
    : (answers as unknown as Record<string, string>)[currentStepDef.id] ?? '';

  // Can the user proceed?
  const canProceed = currentStepDef.multiple
    ? true // deal breakers are optional
    : !!(answers as unknown as Record<string, string>)[currentStepDef.id];

  const handleSelect = useCallback(
    (optionId: string) => {
      if (currentStepDef.multiple) {
        setAnswers((prev) => {
          const current = prev.dealBreakers;
          if (current.includes(optionId)) {
            return { ...prev, dealBreakers: current.filter((id) => id !== optionId) };
          }
          if (current.length >= (currentStepDef.max ?? 3)) return prev;
          return { ...prev, dealBreakers: [...current, optionId] };
        });
      } else {
        setAnswers((prev) => ({
          ...prev,
          [currentStepDef.id]: optionId,
        } as QuizAnswers));
      }
    },
    [currentStepDef]
  );

  const handleNext = useCallback(() => {
    if (isLastStep) {
      const vibeId = computeVibeType(answers);
      setVibeTypeId(vibeId);
      saveProfile({
        completedAt: new Date().toISOString(),
        answers,
        vibeTypeId: vibeId,
      });
      setIsComplete(true);
    } else {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  }, [isLastStep, answers, saveProfile]);

  const handleBack = useCallback(() => {
    if (isComplete) {
      setIsComplete(false);
      return;
    }
    if (step === 0) {
      router.push('/');
    } else {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  }, [isComplete, step, router]);

  const handleStartDiscovering = useCallback(() => {
    router.push('/discover');
  }, [router]);

  const progressPct = ((step + 1) / QUIZ_STEPS.length) * 100;

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--dj-surface)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 'var(--dj-max-width)',
        margin: '0 auto',
      }}
    >
      <GlowBackground />

      {/* ── Sticky header ── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          background: 'rgba(14,14,22,0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: isComplete ? 14 : 0,
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px 14px',
          }}
        >
          {/* Back / Close */}
          <button
            onClick={handleBack}
            aria-label={step === 0 && !isComplete ? 'Close quiz' : 'Go back'}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid var(--dj-border)',
              background: 'var(--dj-card)',
              color: 'var(--dj-text-secondary)',
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {isComplete ? '←' : step === 0 ? '✕' : '←'}
          </button>

          {/* Step indicator */}
          <div style={{ textAlign: 'center' }}>
            <p
              className="font-display"
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--dj-text)',
                letterSpacing: '-0.01em',
              }}
            >
              {isComplete ? '✦ Vibe DNA' : 'Disco Jump'}
            </p>
            {!isComplete && (
              <p style={{ fontSize: 11, color: 'var(--dj-muted)', marginTop: 1 }}>
                Step {step + 1} of {QUIZ_STEPS.length}
              </p>
            )}
          </div>

          {/* Skip */}
          {!isComplete ? (
            <button
              onClick={() => router.push('/')}
              aria-label="Skip quiz"
              style={{
                width: 40,
                height: 40,
                background: 'transparent',
                border: 'none',
                color: 'var(--dj-muted)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              Skip
            </button>
          ) : (
            <div style={{ width: 40 }} />
          )}
        </div>

        {/* Progress bar */}
        {!isComplete && (
          <div
            style={{
              height: 3,
              background: 'rgba(255,255,255,0.06)',
              margin: '0 20px 0',
            }}
          >
            <motion.div
              animate={{ width: `${progressPct}%` }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              style={{
                height: '100%',
                borderRadius: 2,
                background: 'var(--dj-gradient-primary)',
              }}
            />
          </div>
        )}
      </div>

      {/* ── Animated content area ── */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence mode="sync" custom={direction}>
          {!isComplete ? (
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              style={{
                position: 'absolute',
                inset: 0,
              }}
            >
              <QuizStepView
                step={currentStepDef}
                answer={currentAnswer}
                onSelect={handleSelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
              }}
            >
              <ResultView
                vibeTypeId={vibeTypeId!}
                onDiscover={handleStartDiscovering}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer buttons (quiz only) ── */}
      {!isComplete && (
        <div
          style={{
            padding: '14px 20px 28px',
            background: 'rgba(14,14,22,0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            gap: 12,
          }}
        >
          {/* Back */}
          <button
            onClick={handleBack}
            aria-label={step === 0 ? 'Cancel quiz' : 'Previous question'}
            style={{
              flex: '0 0 auto',
              padding: '14px 20px',
              borderRadius: 'var(--dj-radius-lg)',
              border: '1.5px solid var(--dj-border)',
              background: 'var(--dj-card)',
              color: 'var(--dj-text-secondary)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {step === 0 ? 'Cancel' : '← Back'}
          </button>

          {/* Next / Finish */}
          <button
            onClick={handleNext}
            disabled={!canProceed}
            aria-label={isLastStep ? 'Reveal my Vibe DNA' : 'Next question'}
            style={{
              flex: 1,
              padding: '14px',
              borderRadius: 'var(--dj-radius-lg)',
              border: 'none',
              background: canProceed
                ? 'var(--dj-gradient-primary)'
                : 'rgba(255,255,255,0.08)',
              color: canProceed ? 'white' : 'var(--dj-muted)',
              fontSize: 15,
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              cursor: canProceed ? 'pointer' : 'default',
              letterSpacing: '-0.01em',
              boxShadow: canProceed ? '0 4px 20px rgba(155,93,229,0.3)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {isLastStep ? 'Reveal My DNA ✦' : 'Next →'}
          </button>
        </div>
      )}
    </div>
  );
}
