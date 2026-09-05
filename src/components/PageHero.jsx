import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from '@phosphor-icons/react'

export default function PageHero({ title, copy, action, onAction, image = '/assets/precision-phone-repair.png', imageAlt = 'Precision mobile repair workspace' }) {
  const reduceMotion = useReducedMotion()
  return (
    <section className="relative overflow-hidden border-b border-[#e1e7f0]">
      <div className="hero-halo" aria-hidden="true" />
      <div className="mx-auto grid min-h-[660px] max-w-[1400px] items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:px-12">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>
          <h1 className="max-w-[11ch] text-[clamp(3.25rem,6.5vw,5.8rem)] font-[790] leading-[0.97] tracking-[-0.04em] text-[#0d1b2e]">{title}</h1>
          <p className="mt-7 max-w-[600px] text-lg leading-8 text-[#55637a]">{copy}</p>
          {action && <button className="primary-button mt-9" onClick={onAction}>{action}<ArrowRight weight="bold" /></button>}
        </motion.div>
        <motion.img src={image} alt={imageAlt} className="relative aspect-[1.15/1] w-full rounded-[16px] object-cover shadow-[0_32px_90px_rgba(48,76,119,0.18)]" initial={reduceMotion ? false : { opacity: 0, scale: 0.96, clipPath: 'inset(0 0 18% 0 round 16px)' }} animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0 round 16px)' }} transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} />
      </div>
    </section>
  )
}
