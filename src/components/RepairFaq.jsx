import { CaretDown } from '@phosphor-icons/react'
import Reveal from './Reveal.jsx'

const questions = [
  ['Do I need to know the exact fault?', 'No. Describe what you see, hear, or feel. A hands-on assessment is what separates the symptom from the cause.'],
  ['Should I bring my charger?', 'Bring it when charging is part of the problem. A known cable or adapter can help reproduce an intermittent issue.'],
  ['Can the site confirm a price or completion time?', 'Not responsibly. Device condition, parts, repair scope, price, and timing need to be confirmed after inspection.'],
  ['What if the phone is hot, swollen, or wet?', 'Stop charging and using it. Keep it away from heat and pressure, and bring it for careful professional handling.'],
]

export default function RepairFaq() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
        <Reveal><h2 className="section-title">Good questions before a repair.</h2><p className="section-copy">Clear expectations begin before the phone reaches the bench.</p></Reveal>
        <Reveal className="divide-y divide-[#dce4ef] border-y border-[#dce4ef]">{questions.map(([question, answer], index) => <details key={question} className="faq-row" open={index === 0}><summary><span>{question}</span><CaretDown size={20} weight="bold" /></summary><p>{answer}</p></details>)}</Reveal>
      </div>
    </section>
  )
}
