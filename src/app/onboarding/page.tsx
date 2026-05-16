import type { Metadata } from 'next';
import OnboardingQuiz from './OnboardingQuiz';

export const metadata: Metadata = {
  title: 'Vibe DNA Quiz — Disco Jump',
  description:
    'Take the 5-step Vibe DNA quiz and discover your unique nightlife personality on Disco Jump.',
};

export default function OnboardingPage() {
  return <OnboardingQuiz />;
}
