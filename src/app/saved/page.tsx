import type { Metadata } from 'next';
import AppShell from '@/components/layout/AppShell';
import SavedContent from './SavedContent';

export const metadata: Metadata = {
  title: 'Saved — Disco Jump',
  description: 'Your saved place collections on Disco Jump.',
};

export default function SavedPage() {
  return (
    <AppShell activeTab="saved">
      <SavedContent />
    </AppShell>
  );
}
