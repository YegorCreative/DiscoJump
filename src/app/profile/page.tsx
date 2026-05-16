import type { Metadata } from 'next';
import AppShell from '@/components/layout/AppShell';
import ProfileVibeSection from './ProfileVibeSection';

export const metadata: Metadata = {
  title: 'Profile — Disco Jump',
  description: 'Your Disco Jump profile and vibe settings.',
};

const settingsItems = [
  { id: 'notifications', emoji: '🔔', label: 'Notifications', value: 'On' },
  { id: 'location', emoji: '📍', label: 'Location Access', value: 'Always' },
  { id: 'privacy', emoji: '🔒', label: 'Privacy', value: 'Friends only' },
  { id: 'language', emoji: '🌍', label: 'Language & Region', value: 'English · NYC' },
  { id: 'appearance', emoji: '🎨', label: 'Appearance', value: 'Dark mode' },
];

export default function ProfilePage() {

  return (
    <AppShell activeTab="profile">
      <div style={{ paddingTop: 56 }}>
        {/* Profile hero */}
        <div
          className="section-px"
          style={{ marginBottom: 28, textAlign: 'center' }}
        >
          {/* Avatar */}
          <div
            id="profile-avatar"
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'var(--dj-gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 800,
              color: 'white',
              fontFamily: 'var(--font-display)',
              boxShadow: '0 0 40px rgba(155,93,229,0.4)',
              margin: '0 auto 16px',
              border: '3px solid rgba(155,93,229,0.4)',
            }}
          >
            Y
          </div>

          {/* Name */}
          <h1
            className="font-display"
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: 'var(--dj-text)',
              letterSpacing: '-0.03em',
              marginBottom: 4,
            }}
          >
            Yegor
          </h1>
          <p style={{ fontSize: 14, color: 'var(--dj-text-secondary)', marginBottom: 16 }}>
            @yegor · New York City
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 32,
              marginBottom: 20,
            }}
          >
            {[
              { label: 'Places Saved', value: '57' },
              { label: 'Collections', value: '6' },
              { label: 'Vibe Score', value: '94%' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div
                  className="font-display"
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: 'var(--dj-text)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, color: 'var(--dj-muted)', marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Edit profile button */}
          <button
            id="edit-profile-btn"
            aria-label="Edit profile"
            style={{
              padding: '10px 28px',
              borderRadius: 'var(--dj-radius-full)',
              border: '1.5px solid var(--dj-border)',
              background: 'var(--dj-card)',
              color: 'var(--dj-text)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Edit Profile
          </button>
        </div>

        {/* Vibe DNA section — dynamic, reads from localStorage */}
        <ProfileVibeSection />

        {/* Settings */}
        <div className="section-px" style={{ marginBottom: 32 }}>
          <h2
            className="font-display"
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: 'var(--dj-text-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Settings
          </h2>
          <div
            className="glass-card"
            style={{ padding: 0, overflow: 'hidden', borderRadius: 'var(--dj-radius-lg)' }}
          >
            {settingsItems.map((item, i) => (
              <div
                key={item.id}
                id={`setting-${item.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom:
                    i < settingsItems.length - 1 ? '1px solid var(--dj-border)' : 'none',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 18 }}>{item.emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--dj-text)' }}>
                    {item.label}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13, color: 'var(--dj-muted)' }}>{item.value}</span>
                  <span style={{ fontSize: 14, color: 'var(--dj-muted)' }}>›</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <div className="section-px" style={{ marginBottom: 16 }}>
          <button
            id="sign-out-btn"
            aria-label="Sign out"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--dj-radius-xl)',
              border: '1.5px solid rgba(247,37,133,0.3)',
              background: 'rgba(247,37,133,0.06)',
              color: 'var(--dj-pink)',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </AppShell>
  );
}
