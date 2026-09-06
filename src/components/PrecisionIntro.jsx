import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { DeviceMobileCamera } from '@phosphor-icons/react'

export default function PrecisionIntro({ onComplete }) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(onComplete, reduceMotion ? 650 : 3200)

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [onComplete, reduceMotion])

  return (
    <motion.div
      className="precision-intro"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: reduceMotion ? 'none' : 'blur(5px)' }}
      transition={{ duration: reduceMotion ? 0.2 : 0.62, ease: [0.76, 0, 0.24, 1] }}
      role="status"
      aria-live="polite"
      aria-label="Preparing Max Mobbiles"
    >
      <div className="precision-intro__light" aria-hidden="true" />
      <motion.div
        className="precision-intro__panel"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.975 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="precision-intro__brand">
          <img src="/Logo.png" alt="" width="1536" height="1024" />
          <div>
            <strong>MAX MOBBILES</strong>
            <span>Precision mobile care</span>
          </div>
        </div>

        <div className="precision-intro__instrument" aria-hidden="true">
          <span className="precision-intro__corner precision-intro__corner--tl" />
          <span className="precision-intro__corner precision-intro__corner--tr" />
          <span className="precision-intro__corner precision-intro__corner--bl" />
          <span className="precision-intro__corner precision-intro__corner--br" />
          <div className="precision-intro__orbit" />
          <div className="precision-intro__device">
            <DeviceMobileCamera size={58} weight="duotone" />
          </div>
          <div className="precision-intro__beam" />
          <div className="precision-intro__readout">01.00</div>
        </div>

        <div className="precision-intro__copy">
          <p>Preparing your repair experience</p>
          <span>Every detail, carefully aligned.</span>
        </div>

        <div className="precision-intro__progress" aria-hidden="true">
          <span />
        </div>
        <div className="precision-intro__steps" aria-hidden="true">
          <span>Assess</span>
          <span>Clarify</span>
          <span>Repair</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
