import { motion } from 'framer-motion'

const MotionDiv = motion.div

function HeroSection({ hero }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={hero.image} alt="Fabrication line" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-slate-950/50" />
      </div>

      <MotionDiv
        className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <div className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.28em] text-emerald-200">Industrial Fabrication Excellence</p>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {hero.heading}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate-100 sm:text-lg">{hero.subheading}</p>
        </div>
      </MotionDiv>
    </section>
  )
}

export default HeroSection
