import { ArrowRight } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'

export default function ClosingCTA({ title = 'Ready to make the problem clear?', copy = 'Prepare a focused repair request and review every detail before sharing.', onAction }) {
  return (
    <section className="px-5 pb-24 pt-8 sm:px-8 sm:pb-32"><Reveal className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[16px] bg-[#eaf1ff] px-6 py-16 sm:px-12 sm:py-20 lg:px-20"><div className="calibration-lines opacity-45" aria-hidden="true" /><div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end"><div><h2 className="max-w-[760px] text-4xl font-[780] leading-[1.02] tracking-[-0.04em] text-[#0d1b2e] sm:text-6xl">{title}</h2><p className="mt-5 max-w-[580px] text-lg leading-8 text-[#56647b]">{copy}</p></div><button className="primary-button shrink-0" onClick={onAction}>Build my request<ArrowRight weight="bold" /></button></div></Reveal></section>
  )
}
