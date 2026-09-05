import { useState } from 'react'
import { Check, ClipboardText, DeviceMobile, NavigationArrow } from '@phosphor-icons/react'
import { ADDRESS, MAP_LINK } from '../data/siteContent.jsx'
import Reveal from './Reveal.jsx'

export default function ContactPlanner({ onRequest }) {
  const [copied, setCopied] = useState(false)
  const copyAddress = async () => {
    try { await navigator.clipboard.writeText(ADDRESS); setCopied(true) } catch { setCopied(false) }
  }
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <Reveal className="max-w-3xl"><h2 className="section-title">Choose the useful next step.</h2><p className="section-copy">Plan the route, save the location, or prepare the repair details before setting out.</p></Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[16px] bg-[#dce4ef] shadow-[0_24px_70px_rgba(52,78,114,0.1)] lg:grid-cols-3">
          <Reveal className="planner-panel"><NavigationArrow size={30} weight="duotone" /><h3>Navigate now</h3><p>Open live directions from your current location in Google Maps.</p><a className="secondary-button mt-auto" href={MAP_LINK} target="_blank" rel="noreferrer">Open directions</a></Reveal>
          <Reveal className="planner-panel"><ClipboardText size={30} weight="duotone" /><h3>Save the address</h3><p>{ADDRESS}</p><button className="secondary-button mt-auto" onClick={copyAddress}>{copied ? <Check weight="bold" /> : <ClipboardText weight="bold" />}{copied ? 'Address copied' : 'Copy address'}</button></Reveal>
          <Reveal className="planner-panel"><DeviceMobile size={30} weight="duotone" /><h3>Prepare the phone</h3><p>Build a concise symptom summary before the in-store conversation.</p><button className="primary-button mt-auto" onClick={onRequest}>Build request</button></Reveal>
        </div>
      </div>
    </section>
  )
}
