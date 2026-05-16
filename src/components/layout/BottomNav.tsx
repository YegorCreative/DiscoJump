'use client';

import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'url(#grad)' : 'none'} stroke={active ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b5de5" />
            <stop offset="100%" stopColor="#f72585" />
          </linearGradient>
        </defs>
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" stroke={active ? 'rgba(255,255,255,0.5)' : 'currentColor'} strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    id: 'discover',
    label: 'Discover',
    href: '/discover',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'url(#grad2)' : 'none'} stroke={active ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b5de5" />
            <stop offset="100%" stopColor="#f72585" />
          </linearGradient>
        </defs>
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" stroke={active ? 'rgba(255,255,255,0.5)' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'vibe',
    label: 'Vibe DNA',
    href: '/vibe',
    icon: (active) => (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: active ? 'var(--dj-gradient-primary)' : 'rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -20,
          boxShadow: active ? '0 0 24px rgba(155,93,229,0.5)' : 'none',
          border: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
          transition: 'all 0.25s ease',
        }}
      >
        <span style={{ fontSize: 20 }}>✨</span>
      </div>
    ),
  },
  {
    id: 'saved',
    label: 'Saved',
    href: '/saved',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'url(#grad3)' : 'none'} stroke={active ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b5de5" />
            <stop offset="100%" stopColor="#f72585" />
          </linearGradient>
        </defs>
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'url(#grad4)' : 'none'} stroke={active ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <defs>
          <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b5de5" />
            <stop offset="100%" stopColor="#f72585" />
          </linearGradient>
        </defs>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

interface BottomNavProps {
  activeTab: string;
}

export default function BottomNav({ activeTab }: BottomNavProps) {
  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--dj-nav-height)',
        paddingBottom: 'var(--dj-safe-bottom)',
        background: 'rgba(14, 14, 22, 0.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid var(--dj-border)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <Link
            key={item.id}
            href={item.href}
            id={`nav-${item.id}`}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              textDecoration: 'none',
              color: isActive ? 'var(--dj-purple-light)' : 'var(--dj-muted)',
              transition: 'color 0.2s ease',
              position: 'relative',
              paddingTop: item.id === 'vibe' ? 0 : 4,
            }}
          >
            {/* Active indicator line */}
            {isActive && item.id !== 'vibe' && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 24,
                  height: 2,
                  borderRadius: 2,
                  background: 'var(--dj-gradient-primary)',
                }}
              />
            )}
            {item.icon(isActive)}
            {item.id !== 'vibe' && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.02em',
                }}
              >
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
