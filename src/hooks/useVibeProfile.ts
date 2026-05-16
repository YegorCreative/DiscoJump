'use client';

import { useState, useEffect, useCallback } from 'react';
import { VibeTypeId, QuizAnswers } from '@/data/quiz';

const STORAGE_KEY = 'dj_vibe_profile';

export interface VibeProfile {
  completedAt: string;
  answers: QuizAnswers;
  vibeTypeId: VibeTypeId;
}

export function useVibeProfile() {
  const [profile, setProfile] = useState<VibeProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProfile(JSON.parse(raw) as VibeProfile);
    } catch {
      // Storage unavailable
    }
    setHydrated(true);
  }, []);

  const saveProfile = useCallback((p: VibeProfile) => {
    setProfile(p);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {
      // Storage unavailable
    }
  }, []);

  const clearProfile = useCallback(() => {
    setProfile(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable
    }
  }, []);

  return { profile, hydrated, saveProfile, clearProfile };
}
