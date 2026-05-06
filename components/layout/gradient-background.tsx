'use client'

const SPARKS = [
  { left: '10%', top: '15%', delay: '0s', size: 7.5 },
  { left: '75%', top: '20%', delay: '1.4s', size: 6 },
  { left: '42%', top: '55%', delay: '2.8s', size: 6.75 },
  { left: '85%', top: '65%', delay: '0.6s', size: 5.25 },
  { left: '25%', top: '78%', delay: '3.5s', size: 7.5 },
  { left: '58%', top: '10%', delay: '2s', size: 6 },
  { left: '92%', top: '45%', delay: '1s', size: 5.25 },
  { left: '5%', top: '50%', delay: '4s', size: 6.75 },
]

export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, var(--background), var(--surface-tint), var(--background))',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 16% 16%, var(--surface-veil), transparent 34%), radial-gradient(circle at 85% 22%, var(--glow-gold), transparent 24%), radial-gradient(circle at 18% 78%, var(--glow-blue), transparent 26%)',
        }}
      />

      <div className="aurora-orb-1 absolute top-[-12%] -left-[10%] h-[26rem] w-[26rem] rounded-full bg-[var(--glow-gold)] opacity-70 blur-[110px]" />
      <div className="aurora-orb-2 absolute top-[10%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-[var(--glow-blue)] opacity-60 blur-[120px]" />
      <div className="aurora-orb-3 absolute bottom-[-18%] left-[22%] h-[28rem] w-[28rem] rounded-full bg-[var(--brand-blue-soft)] opacity-40 blur-[125px]" />

      {SPARKS.map((spark, i) => (
        <div
          key={i}
          className="spark-particle absolute rounded-full"
          style={{
            left: spark.left,
            top: spark.top,
            width: spark.size,
            height: spark.size,
            background:
              'radial-gradient(circle, var(--brand-gold-soft), oklch(0.82 0.12 85 / 0.2))',
            animationDelay: spark.delay,
            boxShadow: `0 0 ${spark.size * 3}px ${spark.size}px var(--glow-gold)`,
            opacity: 0.45,
          }}
        />
      ))}
    </div>
  )
}
