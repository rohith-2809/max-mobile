import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, Info } from '@phosphor-icons/react'
import { useSearchParams } from 'react-router-dom'
import { services } from '../data/siteContent.jsx'
import Reveal from './Reveal.jsx'

export default function ServiceExplorer({ onBook }) {
  const [searchParams] = useSearchParams()
  const requestedId = searchParams.get('issue')
  const [activeId, setActiveId] = useState(() => services.some((service) => service.id === requestedId) ? requestedId : 'screen')
  const active = services.find((service) => service.id === activeId)
  const ActiveIcon = active.icon

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="max-w-3xl"><h2 className="section-title">Start with what the phone is doing.</h2><p className="section-copy">You do not need a technical diagnosis. Choose the symptom that feels closest and use the guidance to prepare.</p></Reveal>
        <Reveal className="mt-12" delay={0.08}>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Repair categories">
            {services.map((service) => { const Icon = service.icon; const selected = service.id === activeId; return <button key={service.id} role="tab" aria-selected={selected} onClick={() => setActiveId(service.id)} className={`service-tab ${selected ? 'service-tab-active' : ''}`}><Icon size={19} weight={selected ? 'fill' : 'regular'} />{service.label}</button> })}
          </div>
          <div role="tabpanel" className="mt-5 grid overflow-hidden rounded-[16px] bg-white shadow-[0_24px_70px_rgba(52,78,114,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
            <AnimatePresence mode="wait">
              <motion.div key={active.id} className="p-7 sm:p-10 lg:p-14" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.3 }}>
                <div className="grid size-14 place-items-center rounded-[16px] bg-[#eaf1ff] text-[#1857d8]"><ActiveIcon size={28} weight="duotone" /></div>
                <h3 className="mt-8 max-w-xl text-3xl font-[760] leading-tight tracking-[-0.03em] text-[#0d1b2e] sm:text-4xl">{active.title}</h3>
                <p className="mt-5 max-w-[62ch] leading-7 text-[#5a6780]">{active.description}</p>
                <div className="mt-7 flex items-start gap-3 rounded-[12px] bg-[#f2f6fc] p-4 text-sm leading-6 text-[#43536b]"><Info size={21} className="mt-0.5 shrink-0 text-[#1857d8]" weight="duotone" />{active.prepare}</div>
                <button className="primary-button mt-8" onClick={() => onBook(active.label)}>Choose {active.label.toLowerCase()}<ArrowRight weight="bold" /></button>
              </motion.div>
            </AnimatePresence>
            <div className="relative flex min-h-[330px] flex-col justify-between overflow-hidden bg-[#edf3ff] p-7 sm:min-h-[390px] sm:p-10 lg:p-14"><div className="calibration-lines" aria-hidden="true" /><div className="relative"><p className="text-sm font-bold text-[#1857d8]">A useful assessment can check</p><div className="mt-8 space-y-4">{active.checks.map((item, index) => <motion.div key={`${active.id}-${item}`} className="flex items-center gap-4 rounded-[12px] bg-white/85 p-4 text-[15px] font-bold text-[#263750] shadow-[0_10px_30px_rgba(73,101,145,0.08)]" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}><span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#1857d8] text-white"><Check size={16} weight="bold" /></span>{item}</motion.div>)}</div></div><p className="relative mt-8 max-w-sm text-sm leading-6 text-[#61708a] sm:mt-10">The exact repair and quote depend on the device and its physical condition.</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
