'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import IFeelLikeCTA from './IFeelLikeCTA';
import MoodEngineModal from '@/components/mood/MoodEngineModal';

export default function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <IFeelLikeCTA onOpen={() => setIsModalOpen(true)} />
      <AnimatePresence>
        {isModalOpen && (
          <MoodEngineModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
