import { ArrowUpRight, ClipboardText, MapPin, NavigationArrow } from '@phosphor-icons/react'
import { useOutletContext } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import Reveal from '../components/Reveal.jsx'
import ClosingCTA from '../components/ClosingCTA.jsx'
import ContactPlanner from '../components/ContactPlanner.jsx'
import { ADDRESS, MAP_EMBED, MAP_LINK } from '../data/siteContent.jsx'

export default function ContactPage() {
  const { openRequest } = useOutletContext()
  return (
    <>
      <PageHero title="Find the store. Bring the right details." copy="Plan your visit to Max Mobbiles in Vanasthalipuram and prepare the repair request first." action="Prepare my request" onAction={() => openRequest()} />
      <section className="py-24 sm:py-32"><div className="mx-auto max-w-[1240px] px-5 sm:px-8"><Reveal className="max-w-3xl"><h2 className="section-title">Your route to Max Mobbiles.</h2><p className="section-copy">Use the live map for orientation, then open Google Maps for current directions from your location.</p></Reveal><Reveal className="mt-12 grid overflow-hidden rounded-[16px] bg-white shadow-[0_24px_75px_rgba(52,78,114,0.12)] lg:grid-cols-[1.2fr_0.8fr]"><div className="relative min-h-[460px] bg-[#eaf1ff]"><iframe title="Map showing Max Mobbiles in Vanasthalipuram" src={MAP_EMBED} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12"><div><div className="grid size-14 place-items-center rounded-[16px] bg-[#eaf1ff] text-[#1857d8]"><MapPin size={28} weight="duotone" /></div><h3 className="mt-9 text-3xl font-[770] tracking-[-0.03em]">Max Mobbiles</h3><address className="mt-5 not-italic leading-8 text-[#5a6780]">{ADDRESS}</address></div><a className="primary-button mt-10 justify-center" href={MAP_LINK} target="_blank" rel="noreferrer"><NavigationArrow weight="fill" />Open Google Maps<ArrowUpRight weight="bold" /></a></div></Reveal></div></section>
      <section className="bg-white py-24 sm:py-32"><div className="mx-auto max-w-[1240px] px-5 sm:px-8"><Reveal className="max-w-3xl"><h2 className="section-title">When and how to reach us.</h2><p className="section-copy">We recommend building your repair request first, so we have the right context when you arrive or call.</p></Reveal><div className="mt-14 grid gap-5 lg:grid-cols-2"><Reveal className="rounded-[16px] bg-[#f4f7fb] p-8 sm:p-10"><h3 className="text-2xl font-[760] tracking-[-0.03em] text-[#1857d8]">Store Hours</h3><ul className="mt-6 space-y-4 text-[#5a6780]"><li><strong className="text-[#263750]">Monday - Saturday:</strong> 10:00 AM - 8:00 PM</li><li><strong className="text-[#263750]">Sunday:</strong> 11:00 AM - 5:00 PM</li></ul></Reveal><Reveal className="rounded-[16px] bg-[#f4f7fb] p-8 sm:p-10"><h3 className="text-2xl font-[760] tracking-[-0.03em] text-[#1857d8]">Get in Touch</h3><ul className="mt-6 space-y-4 text-[#5a6780]"><li><strong className="text-[#263750]">Phone:</strong> +91 98765 43210</li><li><strong className="text-[#263750]">Email:</strong> support@maxmobbiles.in</li></ul></Reveal></div></div></section>
      <section className="py-24 sm:py-32"><div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.76fr_1.24fr] lg:gap-20"><Reveal><h2 className="section-title">Before you set out.</h2><p className="section-copy">A prepared visit begins with the device, the symptom, and the accessories related to the problem.</p></Reveal><div className="grid gap-4"><Reveal className="contact-row"><DeviceIcon icon={ClipboardText} /><div><h3>Build the request</h3><p>Capture the issue and device details while they are fresh.</p></div></Reveal><Reveal className="contact-row"><DeviceIcon icon={NavigationArrow} /><div><h3>Open current directions</h3><p>Use the supplied Google Maps place link for live routing.</p></div></Reveal><Reveal className="contact-row"><DeviceIcon icon={MapPin} /><div><h3>Check the location</h3><p>Christian Colony, Vanasthalipuram, Hyderabad, Telangana 500070.</p></div></Reveal></div></div></section>
      <ContactPlanner onRequest={() => openRequest()} />
      <ClosingCTA title="Prepare the request before you visit." copy="You will finish with a clean summary that stays on your device until you copy it." onAction={() => openRequest()} />
    </>
  )
}

function DeviceIcon({ icon: Icon }) {
  return <span className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-[#eaf1ff] text-[#1857d8]"><Icon size={24} weight="duotone" /></span>
}
