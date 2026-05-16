'use client';

export default function GlowBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Purple blob — top left */}
      <div
        className="animate-blob-1 absolute rounded-full"
        style={{
          width: '400px',
          height: '400px',
          top: '-120px',
          left: '-80px',
          background: 'radial-gradient(circle, rgba(155, 93, 229, 0.22) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Pink blob — top right */}
      <div
        className="animate-blob-2 absolute rounded-full"
        style={{
          width: '350px',
          height: '350px',
          top: '80px',
          right: '-100px',
          background: 'radial-gradient(circle, rgba(247, 37, 133, 0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Cyan blob — bottom */}
      <div
        className="animate-blob-3 absolute rounded-full"
        style={{
          width: '300px',
          height: '300px',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.10) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Subtle vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(9,9,9,0.6) 100%)',
        }}
      />
    </div>
  );
}
