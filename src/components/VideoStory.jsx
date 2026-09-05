import { useRef, useState } from 'react'
import { Pause, Play } from '@phosphor-icons/react'
import { useReducedMotion } from 'motion/react'
import Reveal from './Reveal.jsx'

export default function VideoStory() {
  const videoRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const [playing, setPlaying] = useState(!reduceMotion)
  const toggle = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) { videoRef.current.play(); setPlaying(true) } else { videoRef.current.pause(); setPlaying(false) }
  }
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="relative mx-auto max-w-[1340px] overflow-hidden rounded-[16px] bg-[#dfe8f6] shadow-[0_28px_90px_rgba(52,78,114,0.15)]">
        <video ref={videoRef} className="aspect-[16/10] w-full object-cover sm:aspect-[16/8]" autoPlay={!reduceMotion} muted loop playsInline preload="metadata" poster="/assets/precision-phone-repair.png">
          <source src="/assets/precision-repair.mp4" type="video/mp4" />
        </video>
        <div className="video-wash" aria-hidden="true" />
        <div className="scan-line" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-6 sm:p-10 lg:p-14">
          <h2 className="max-w-[690px] text-3xl font-[780] leading-tight tracking-[-0.035em] text-white [text-shadow:0_2px_24px_rgba(13,27,46,0.42)] sm:text-5xl">Small components. Careful hands. Clear decisions.</h2>
          <button className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#1857d8] shadow-[0_12px_34px_rgba(20,40,70,0.2)]" onClick={toggle} aria-label={playing ? 'Pause repair video' : 'Play repair video'}>{playing ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}</button>
        </div>
      </Reveal>
    </section>
  )
}
