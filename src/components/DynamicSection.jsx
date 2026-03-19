import { motion } from 'framer-motion'

const MotionArticle = motion.article

function DynamicSection({ section, reverse = false }) {
  return (
    <MotionArticle
      className="grid items-center gap-8 rounded-2xl bg-surface p-5 shadow-xl shadow-slate-900/5 md:grid-cols-2 md:p-8"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      <div className={`overflow-hidden rounded-xl ${reverse ? 'md:order-2' : ''}`}>
        <img
          src={section.image}
          alt={section.title}
          className="h-72 w-full object-cover transition duration-500 hover:scale-110"
        />
      </div>

      <div className={reverse ? 'md:order-1' : ''}>
        <h2 className="text-3xl font-bold text-slate-900">{section.title}</h2>
        <p className="mt-4 text-base leading-relaxed text-slate-600">{section.description}</p>
      </div>
    </MotionArticle>
  )
}

export default DynamicSection
