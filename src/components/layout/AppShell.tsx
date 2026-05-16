'use client';

import { ReactNode } from 'react';
import GlowBackground from './GlowBackground';
import BottomNav from './BottomNav';

interface AppShellProps {
  children: ReactNode;
  activeTab: string;
}

export default function AppShell({ children, activeTab }: AppShellProps) {
  return (
    /* Outer centering wrapper — visible on desktop as dark outer area */
    <div
      className="min-h-screen w-full flex items-start justify-center"
      style={{ background: 'var(--dj-black)' }}
    >
      {/* Phone-frame container */}
      <div
        className="relative flex flex-col w-full overflow-hidden"
        style={{
          maxWidth: 'var(--dj-max-width)',
          minHeight: '100dvh',
          background: 'var(--dj-surface)',
        }}
      >
        {/* Animated glow blobs behind content */}
        <GlowBackground />

        {/* Main scrollable content area */}
        <main
          className="relative flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            paddingBottom: 'calc(var(--dj-nav-height) + var(--dj-safe-bottom) + 16px)',
            zIndex: 1,
          }}
        >
          {children}
        </main>

        {/* Bottom navigation — fixed inside the phone frame */}
        <BottomNav activeTab={activeTab} />
      </div>
    </div>
  );
}
