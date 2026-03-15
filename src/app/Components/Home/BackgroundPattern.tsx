export default function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <div className="absolute inset-0 bg-linear-to-br from-[#f4f7fb] via-[#e9eff7] to-[#cfe0f6]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.9),transparent_60%)]" />

      <svg
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 opacity-60"
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          fill="url(#waveGradient1)"
          d="M0,160 C240,120 480,200 720,170 C960,140 1200,100 1440,150 L1440,0 L0,0 Z"
        />
        <defs>
          <linearGradient id="waveGradient1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#dbe7f7" />
            <stop offset="100%" stopColor="#b7cff1" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 opacity-50"
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          fill="url(#waveGradient2)"
          d="M0,200 C300,150 600,260 900,210 C1200,160 1440,200 1440,200 L1440,0 L0,0 Z"
        />
        <defs>
          <linearGradient id="waveGradient2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#e6eefb" />
            <stop offset="100%" stopColor="#c1d5f5" />
          </linearGradient>
        </defs>
      </svg>

    </div>
  );
}