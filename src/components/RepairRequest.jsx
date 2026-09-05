import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, CaretLeft, Check, ClipboardText, Wrench, X } from '@phosphor-icons/react'
import { services } from '../data/siteContent.jsx'

export default function RepairRequest({ open, initialIssue, onClose }) {
  const [stage, setStage] = useState(0)
  const [copied, setCopied] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({ issue: initialIssue || '', device: '', name: '', contact: '', notes: '' })
  const selected = useMemo(() => services.find((service) => service.label === form.issue), [form.issue])
  const SummaryIcon = selected?.icon || Wrench
  const summary = `Max Mobbiles repair request\nIssue: ${form.issue}\nDevice: ${form.device}\nName: ${form.name}\nContact: ${form.contact}\nNotes: ${form.notes || 'None'}`

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
  }

  const continueRequest = () => {
    const nextErrors = {}
    if (stage === 0 && !form.issue) nextErrors.issue = 'Choose the issue that feels closest.'
    if (stage === 0 && !form.device.trim()) nextErrors.device = 'Add your phone model or a simple description.'
    if (stage === 1 && !form.name.trim()) nextErrors.name = 'Add the name we should use.'
    if (stage === 1 && !form.contact.trim()) nextErrors.contact = 'Add an email address or phone number.'
    if (Object.keys(nextErrors).length) return setErrors(nextErrors)
    setStage((value) => Math.min(2, value + 1))
  }

  const copyRequest = async () => {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied(true)
    } catch {
      setErrors({ copy: 'Copy was blocked. Select the summary and copy it manually.' })
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-end bg-[#17263d]/25 backdrop-blur-sm sm:place-items-center sm:p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
          <motion.section role="dialog" aria-modal="true" aria-labelledby="request-title" className="max-h-[94dvh] w-full overflow-y-auto rounded-t-[16px] bg-[#f8faff] shadow-[0_30px_100px_rgba(26,45,74,0.25)] sm:max-w-2xl sm:rounded-[16px]" initial={{ y: 42 }} animate={{ y: 0 }} exit={{ y: 42 }} transition={{ type: 'spring', stiffness: 280, damping: 28 }}>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#dce4ef] bg-[#f8faff]/95 px-5 py-4 backdrop-blur sm:px-8">
              <div><p className="text-sm font-bold text-[#1857d8]">Request builder</p><p className="mt-1 text-xs font-semibold text-[#718097]">{stage + 1} of 3</p></div>
              <button className="icon-button" onClick={onClose} aria-label="Close request builder"><X size={20} weight="bold" /></button>
            </div>
            <div className="px-5 py-7 sm:px-8 sm:py-9">
              <div className="mb-9 grid grid-cols-3 gap-2" aria-label="Request progress">{[0, 1, 2].map((item) => <span key={item} className={`h-1.5 rounded-full ${item <= stage ? 'bg-[#1857d8]' : 'bg-[#dbe3ef]'}`} />)}</div>
              {stage === 0 && (
                <div>
                  <h2 id="request-title" className="dialog-title">What needs attention?</h2>
                  <p className="dialog-copy">Choose the closest symptom and tell us which phone you use.</p>
                  <fieldset className="mt-7"><legend className="form-label">Main issue</legend><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {services.map((service) => { const Icon = service.icon; const active = form.issue === service.label; return <button type="button" key={service.id} onClick={() => update('issue', service.label)} className={`issue-choice ${active ? 'issue-choice-active' : ''}`}><Icon size={23} weight={active ? 'fill' : 'regular'} />{service.label}</button> })}
                  </div>{errors.issue && <p className="form-error">{errors.issue}</p>}</fieldset>
                  <label className="form-label mt-7" htmlFor="device">Phone model or description</label>
                  <input id="device" className={`form-input ${errors.device ? 'form-input-error' : ''}`} value={form.device} onChange={(event) => update('device', event.target.value)} placeholder="For example, Galaxy S series" />
                  {errors.device && <p className="form-error">{errors.device}</p>}
                </div>
              )}
              {stage === 1 && (
                <div>
                  <h2 id="request-title" className="dialog-title">How should the team reach you?</h2>
                  <p className="dialog-copy">Your details remain in the browser until you copy the finished request.</p>
                  <div className="mt-7 grid gap-6 sm:grid-cols-2"><div><label className="form-label" htmlFor="name">Your name</label><input id="name" className="form-input" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Name" />{errors.name && <p className="form-error">{errors.name}</p>}</div><div><label className="form-label" htmlFor="contact">Email or phone</label><input id="contact" className="form-input" value={form.contact} onChange={(event) => update('contact', event.target.value)} placeholder="Best contact" />{errors.contact && <p className="form-error">{errors.contact}</p>}</div></div>
                  <label className="form-label mt-6" htmlFor="notes">What happened? <span className="font-medium text-[#7b899d]">Optional</span></label><textarea id="notes" className="form-input min-h-32 resize-y" value={form.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Describe when the issue started" />
                </div>
              )}
              {stage === 2 && (
                <div>
                  <h2 id="request-title" className="dialog-title">Your request is ready.</h2><p className="dialog-copy">Nothing has been sent. Review the details, then copy them when ready.</p>
                  <div className="mt-7 rounded-[16px] bg-white p-6 shadow-[0_18px_50px_rgba(52,78,114,0.1)]"><div className="flex items-center gap-3 text-sm font-bold text-[#1857d8]"><SummaryIcon size={21} weight="duotone" />Repair request</div><pre className="mt-6 whitespace-pre-wrap font-sans text-sm leading-7 text-[#33445d]">{summary}</pre></div>
                  {copied && <div className="mt-4 flex items-center gap-3 rounded-[12px] bg-[#e6f5ed] p-4 text-sm font-bold text-[#17633a]" role="status"><Check size={20} weight="bold" />Request copied and ready to share.</div>}{errors.copy && <p className="form-error">{errors.copy}</p>}
                </div>
              )}
              <div className="mt-9 flex items-center justify-between border-t border-[#dce4ef] pt-6">{stage > 0 ? <button className="secondary-button" onClick={() => setStage((value) => value - 1)}><CaretLeft weight="bold" />Back</button> : <span />}{stage < 2 ? <button className="primary-button" onClick={continueRequest}>Continue<ArrowRight weight="bold" /></button> : <button className="primary-button" onClick={copyRequest}>{copied ? <Check weight="bold" /> : <ClipboardText weight="bold" />}{copied ? 'Copied' : 'Copy request'}</button>}</div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
