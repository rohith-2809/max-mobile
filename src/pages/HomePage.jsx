import { ArrowRight, ClipboardText, DeviceMobileCamera, MapPin, MagnifyingGlass, ShieldCheck } from '@phosphor-icons/react'
import { Link, useOutletContext } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import VideoStory from '../components/VideoStory.jsx'
import VideoGrid from '../components/VideoGrid.jsx'
import Reveal from '../components/Reveal.jsx'
import ClosingCTA from '../components/ClosingCTA.jsx'
import { services } from '../data/siteContent.jsx'

export default function HomePage() {
  const { openRequest } = useOutletContext()
  return (
    <>
      <PageHero title="Phone repair, handled with precision." copy="Describe the issue, prepare your request, and know what happens before you visit." action="Start a repair request" onAction={() => openRequest()} />
      <section className="border-b border-[#e0e7f0] bg-white"><div className="no-scrollbar mx-auto flex max-w-[1240px] gap-3 overflow-x-auto px-5 py-6 sm:px-8">{services.map((service) => { const Icon = service.icon; return <Link to="/repairs" key={service.id} className="flex shrink-0 items-center gap-2.5 rounded-full bg-[#f1f5fb] px-4 py-2.5 text-sm font-bold text-[#40516a] transition-colors hover:bg-[#eaf1ff] hover:text-[#1857d8]"><Icon size={18} weight="duotone" />{service.label}</Link> })}</div></section>
      <VideoStory />
      <VideoGrid />
      <section className="bg-white py-24 sm:py-32"><div className="mx-auto max-w-[1240px] px-5 sm:px-8"><Reveal className="max-w-3xl"><h2 className="section-title">Three ways to move forward.</h2><p className="section-copy">Start wherever you are: identify the closest symptom, understand the handoff, or plan the visit.</p></Reveal><div className="mt-14 border-y border-[#dce4ef]">{[
        { to: '/repairs', icon: MagnifyingGlass, title: 'Explore by symptom', copy: 'Compare screen, battery, charging, camera, audio, and software problems.' },
        { to: '/process', icon: ClipboardText, title: 'Understand the process', copy: 'See what happens before assessment, approval, repair, and collection.' },
        { to: '/contact', icon: MapPin, title: 'Plan the store visit', copy: 'Open the confirmed Vanasthalipuram location and prepare what to bring.' },
      ].map((item) => { const Icon = item.icon; return <Reveal key={item.to}><Link to={item.to} className="home-path"><span className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-[#eaf1ff] text-[#1857d8]"><Icon size={24} weight="duotone" /></span><span className="flex-1"><strong>{item.title}</strong><small>{item.copy}</small></span><ArrowRight size={22} weight="bold" /></Link></Reveal> })}</div></div></section>
      <section className="bg-white py-24 sm:py-32"><div className="mx-auto max-w-[1240px] px-5 sm:px-8"><Reveal className="max-w-3xl"><h2 className="section-title">Repair should feel understandable.</h2><p className="section-copy">A damaged phone is stressful enough. The website turns a vague problem into a focused request without pretending to know more than an inspection can reveal.</p></Reveal><div className="mt-14 grid gap-5 lg:grid-cols-12"><Reveal className="relative overflow-hidden rounded-[16px] bg-[#1857d8] p-8 text-white lg:col-span-7 lg:min-h-[430px] lg:p-12"><ShieldCheck size={42} weight="duotone" /><h3 className="mt-20 max-w-xl text-4xl font-[770] leading-[1.04] tracking-[-0.035em] sm:text-5xl">Clarity before commitment.</h3><p className="mt-5 max-w-[55ch] leading-7 text-[#dce7ff]">The request separates what you can observe from what still needs assessment, keeping expectations useful and honest.</p></Reveal><div className="grid gap-5 lg:col-span-5"><Reveal className="rounded-[16px] bg-[#edf3ff] p-8 lg:p-10"><DeviceMobileCamera size={36} className="text-[#1857d8]" weight="duotone" /><h3 className="mt-8 text-2xl font-[760] tracking-[-0.025em]">Guided by symptoms</h3><p className="mt-3 leading-7 text-[#5a6780]">Start with cracked glass, fast drain, weak audio, or whatever you can see and hear.</p></Reveal><Reveal className="rounded-[16px] bg-white p-8 shadow-[0_20px_60px_rgba(52,78,114,0.1)] lg:p-10"><ClipboardText size={36} className="text-[#1857d8]" weight="duotone" /><h3 className="mt-8 text-2xl font-[760] tracking-[-0.025em]">Ready to share</h3><p className="mt-3 leading-7 text-[#5a6780]">Review a clean summary before you copy it and choose where to send it.</p></Reveal></div></div></div></section>
      <section className="py-24 sm:py-32"><div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><Reveal><h2 className="section-title">From symptom to store visit.</h2><p className="section-copy">The process page explains what to prepare, what an assessment can cover, and which decisions happen next.</p><Link to="/process" className="secondary-button mt-8">See the process<ArrowRight weight="bold" /></Link></Reveal><div className="space-y-4">{['Describe what changed', 'Review the request', 'Visit the Vanasthalipuram store'].map((item, index) => <Reveal key={item} delay={index * 0.06} className="flex items-center gap-5 rounded-[16px] bg-white p-6 shadow-[0_16px_45px_rgba(52,78,114,0.08)]"><span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-[#eaf1ff] font-black text-[#1857d8]">{index + 1}</span><p className="text-lg font-bold text-[#223149]">{item}</p></Reveal>)}</div></div></section>
      <ClosingCTA onAction={() => openRequest()} />
    </>
  )
}
