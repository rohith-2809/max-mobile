import { CheckCircle, DeviceMobile, WarningCircle } from '@phosphor-icons/react'
import { useOutletContext } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import ServiceExplorer from '../components/ServiceExplorer.jsx'
import Reveal from '../components/Reveal.jsx'
import ClosingCTA from '../components/ClosingCTA.jsx'
import RepairFaq from '../components/RepairFaq.jsx'

export default function RepairsPage() {
  const { openRequest } = useOutletContext()
  return (
    <>
      <PageHero title="Start with the symptom, not the jargon." copy="Explore common phone problems, learn what to note, and build a clearer request." action="Choose a repair" onAction={() => openRequest()} image="/assets/screen-repair-poster.png" imageAlt="Phone screen repair detail" />
      <ServiceExplorer onBook={openRequest} />
      <section className="bg-white py-24 sm:py-32"><div className="mx-auto max-w-[1240px] px-5 sm:px-8"><Reveal className="max-w-3xl"><h2 className="section-title">A little preparation protects your time.</h2><p className="section-copy">Before a store visit, capture the details that are easy to forget once the phone is on the counter.</p></Reveal><div className="mt-14 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"><Reveal className="rounded-[16px] bg-[#eaf1ff] p-8 sm:p-10"><DeviceMobile size={38} className="text-[#1857d8]" weight="duotone" /><h3 className="mt-10 text-3xl font-[760] tracking-[-0.03em]">What to note</h3><div className="mt-7 grid gap-4 sm:grid-cols-2">{['When the problem began', 'What happened just before it', 'Which parts still work', 'Any message shown on screen'].map((item) => <div key={item} className="flex items-center gap-3 rounded-[12px] bg-white/80 p-4 font-bold text-[#34455e]"><CheckCircle size={21} className="shrink-0 text-[#1857d8]" weight="fill" />{item}</div>)}</div></Reveal><Reveal className="rounded-[16px] bg-[#1857d8] p-8 text-white sm:p-10"><WarningCircle size={38} weight="duotone" /><h3 className="mt-10 text-3xl font-[760] tracking-[-0.03em]">Stop and power down</h3><p className="mt-5 leading-7 text-[#dce7ff]">If the phone is swollen, extremely hot, wet, smoking, or smells unusual, stop charging it and avoid further use. Bring it for professional handling.</p></Reveal></div></div></section>
      <section className="py-24 sm:py-32"><div className="mx-auto grid max-w-[1240px] gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-24"><Reveal><h2 className="section-title">What the website does.</h2><p className="section-copy">It helps you organize symptoms, device details, contact preference, and notes into one readable request.</p></Reveal><Reveal><h2 className="section-title">What still needs a person.</h2><p className="section-copy">The exact fault, repair choice, parts availability, final price, and completion time depend on a real device assessment.</p></Reveal></div></section>
      <RepairFaq />
      <ClosingCTA title="Know which repair path to start with?" copy="Choose the closest issue and prepare the details for an in-store assessment." onAction={() => openRequest()} />
    </>
  )
}
