'use client'

export default function ViewSwitcher({ viewMode, onSwitch }) {
  return (
    <div
      className="inline-flex items-center rounded-full border border-amber-500/30 bg-black/60 backdrop-blur-sm"
      style={{ padding: '3px', gap: '2px' }}
    >
      {[
        { mode: 'scroll', label: '≡ Scroll' },
        { mode: 'graph',  label: '⚡ Graph'  },
      ].map(({ mode, label }) => (
        <button
          key={mode}
          onClick={() => onSwitch(mode)}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
            viewMode === mode
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-amber-400/60 hover:text-amber-400'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
