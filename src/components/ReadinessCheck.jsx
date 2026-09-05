import { useState } from 'react'
import { Check, ClipboardText, CloudArrowUp, Key, Package } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'

const items = [
  { id: 'backup', label: 'Important data is backed up', icon: CloudArrowUp },
  { id: 'access', label: 'I know the device passcode', icon: Key },
  { id: 'details', label: 'I noted when the issue started', icon: ClipboardText },
  { id: 'accessory', label: 'I have the related cable or accessory', icon: Package },
]

export default function ReadinessCheck() {
  const [checked, setChecked] = useState([])
  const toggle = (id) => setChecked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const complete = checked.length === items.length

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <Reveal><h2 className="section-title">Make the visit easier before you leave.</h2><p className="section-copy">Use this private checklist as a quick preparation tool. Nothing is saved or sent.</p></Reveal>
        <Reveal className="overflow-hidden rounded-[16px] bg-[#edf3ff] shadow-[0_24px_70px_rgba(52,78,114,0.1)]">
          <div className="flex items-center justify-between border-b border-[#d9e4f3] px-6 py-5 sm:px-8"><p className="font-extrabold text-[#223149]">Visit readiness</p><p className="text-sm font-bold tabular-nums text-[#1857d8]">{checked.length} / {items.length}</p></div>
          <div className="grid gap-3 p-5 sm:p-8">{items.map((item) => { const Icon = item.icon; const active = checked.includes(item.id); return <button key={item.id} className={`readiness-item ${active ? 'readiness-item-active' : ''}`} onClick={() => toggle(item.id)} aria-pressed={active}><span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-white text-[#1857d8]"><Icon size={21} weight="duotone" /></span><span className="flex-1 text-left">{item.label}</span><span className={`grid size-7 place-items-center rounded-full ${active ? 'bg-[#1857d8] text-white' : 'bg-white text-transparent'}`}><Check size={15} weight="bold" /></span></button> })}</div>
          <div className={`px-6 py-5 text-sm font-bold sm:px-8 ${complete ? 'bg-[#e6f5ed] text-[#17633a]' : 'bg-[#1857d8] text-white'}`} role="status">{complete ? 'You have a strong starting point for the visit.' : 'A few minutes of preparation can save a second trip.'}</div>
        </Reveal>
      </div>
    </section>
  )
}
