import { useState } from 'react'
import { CaretDown } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'

const questions = [
  ['Do I need to know the exact fault?', 'No. Describe what you see, hear, or feel. A hands-on assessment is what separates the symptom from the cause.'],
  ['Should I bring my charger?', 'Bring it when charging is part of the problem. A known cable or adapter can help reproduce an intermittent issue.'],
  ['Can the site confirm a price or completion time?', 'Not responsibly. Device condition, parts, repair scope, price, and timing need to be confirmed after inspection.'],
  ['What if the phone is hot, swollen, or wet?', 'Stop charging and using it. Keep it away from heat and pressure, and bring it for careful professional handling.'],
  ['Should I back up my phone first?', 'Back up important photos, contacts, and app data when the phone still works well enough. A backup is useful protection before any service conversation.'],
  ['Do I need to share my passcode?', 'Only share access when a technician explains why a test needs it. Remove sensitive accessories and ask which functions need to be checked before you hand over the device.'],
]

export default function RepairFaq() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <Reveal><h2 className="section-title">Good questions before a repair.</h2><p className="section-copy">Clear expectations begin before the phone reaches the bench.</p></Reveal>
        <Reveal className="divide-y divide-[#dce4ef] border-y border-[#dce4ef]">{questions.map(([question, answer], index) => {
          const open = openIndex === index
          return (
            <article key={question} className="faq-row">
              <button className="flex min-h-[78px] w-full items-center justify-between gap-5 py-5 text-left text-lg font-[780] text-[#223149]" onClick={() => setOpenIndex(open ? -1 : index)} aria-expanded={open} aria-controls={`faq-answer-${index}`}>
                <span>{question}</span><CaretDown size={20} className={`shrink-0 text-[#1857d8] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} weight="bold" />
              </button>
              {open && <p id={`faq-answer-${index}`} className="max-w-[68ch] pb-6 pr-0 leading-7 text-[#5a6780] sm:pr-12">{answer}</p>}
            </article>
          )
        })}</Reveal>
      </div>
    </section>
  )
}
