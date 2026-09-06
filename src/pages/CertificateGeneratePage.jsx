import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import QRCode from 'qrcode'
import Reveal from '../components/Reveal.jsx'
import CertificatePreview from '../components/CertificatePreview.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const INITIAL_FORM = {
  certificateType: 'Internship',
  studentName: '',
  course: '',
  duration: '3-Month',
  startDate: '',
  endDate: '',
  issueDate: '',
}

const DURATIONS = ['1-Month', '2-Month', '3-Month', '6-Month', '1-Year']
const TYPES = ['Internship', 'Course', 'Workshop']

export default function CertificateGeneratePage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(null) // { certificate, qrDataUrl }
  const [step, setStep] = useState('form') // 'form' | 'preview'
  const [qrPreview, setQrPreview] = useState(null)
  const previewRef = useRef(null)

  // Live QR preview while typing
  useEffect(() => {
    if (!form.studentName) return
    const url = `${window.location.origin}/certificate/verify/PREVIEW`
    QRCode.toDataURL(url, { width: 160, margin: 2, errorCorrectionLevel: 'H' })
      .then(setQrPreview)
      .catch(() => {})
  }, [form.studentName])

  function validate() {
    const e = {}
    if (!form.studentName.trim()) e.studentName = 'Student name is required'
    if (!form.course.trim()) e.course = 'Course name is required'
    if (!form.startDate) e.startDate = 'Start date is required'
    if (!form.endDate) e.endDate = 'End date is required'
    if (!form.issueDate) e.issueDate = 'Issue date is required'
    return e
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    try {
      const payload = {
        ...form,
        startDate: formatDisplayDate(form.startDate),
        endDate: formatDisplayDate(form.endDate),
        issueDate: formatDisplayDate(form.issueDate),
      }

      const res = await fetch(`${API}/api/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to generate certificate')

      setGenerated({
        certificate: data.certificate,
        qrDataUrl: data.certificate.qrCodeDataUrl,
      })
      setStep('preview')

      setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  function handleDownloadPdf() {
    if (!generated) return
    const id = encodeURIComponent(generated.certificate.certificateId)
    window.open(`${API}/api/certificates/${id}/pdf`, '_blank')
  }

  function handleReset() {
    setForm(INITIAL_FORM)
    setGenerated(null)
    setStep('form')
    setQrPreview(null)
  }

  function handleChange(field, value) {
    setForm((p) => ({ ...p, [field]: value }))
    setErrors((p) => { const e = { ...p }; delete e[field]; return e })
  }

  return (
    <div className="cert-gen-page">
      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <Reveal>
        <div className="cert-gen-hero">
          <div className="cert-gen-hero-eyebrow">
            <span className="cert-gen-dot" />
            InnovateEdLabs LMS
          </div>
          <h1 className="cert-gen-hero-title">Certificate Generator</h1>
          <p className="cert-gen-hero-sub">
            Fill in student details below. The system will automatically generate a unique
            Certificate ID, QR verification code, and downloadable PDF.
          </p>

          {/* Pipeline indicator */}
          <div className="cert-pipeline">
            {['MongoDB Record', 'Unique ID', 'Verification URL', 'QR Code', 'PDF Certificate'].map((s, i, arr) => (
              <div key={s} className="cert-pipeline-step">
                <div className="cert-pipeline-node">{i + 1}</div>
                <span>{s}</span>
                {i < arr.length - 1 && <div className="cert-pipeline-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="cert-gen-layout">

        {/* ── FORM ────────────────────────────────────────── */}
        <Reveal>
          <section className="cert-gen-form-card">
            <h2 className="cert-gen-section-title">Student Details</h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="cert-gen-grid">

                {/* Certificate Type */}
                <div className="cert-gen-field cert-gen-field--full">
                  <label className="form-label" htmlFor="certType">Certificate Type</label>
                  <div className="cert-type-tabs">
                    {TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        id={`certType-${t}`}
                        className={`cert-type-tab ${form.certificateType === t ? 'cert-type-tab--active' : ''}`}
                        onClick={() => handleChange('certificateType', t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Student Name */}
                <div className="cert-gen-field cert-gen-field--full">
                  <label className="form-label" htmlFor="studentName">
                    Student Full Name <span className="cert-required">*</span>
                  </label>
                  <input
                    id="studentName"
                    type="text"
                    className={`form-input ${errors.studentName ? 'form-input-error' : ''}`}
                    placeholder="e.g. Nikhil Joshi"
                    value={form.studentName}
                    onChange={(e) => handleChange('studentName', e.target.value)}
                  />
                  {errors.studentName && <p className="form-error">{errors.studentName}</p>}
                </div>

                {/* Course */}
                <div className="cert-gen-field cert-gen-field--full">
                  <label className="form-label" htmlFor="course">
                    Course / Program <span className="cert-required">*</span>
                  </label>
                  <input
                    id="course"
                    type="text"
                    className={`form-input ${errors.course ? 'form-input-error' : ''}`}
                    placeholder="e.g. Full Stack Web Development"
                    value={form.course}
                    onChange={(e) => handleChange('course', e.target.value)}
                  />
                  {errors.course && <p className="form-error">{errors.course}</p>}
                </div>

                {/* Duration */}
                <div className="cert-gen-field">
                  <label className="form-label" htmlFor="duration">Duration</label>
                  <select
                    id="duration"
                    className="form-input"
                    value={form.duration}
                    onChange={(e) => handleChange('duration', e.target.value)}
                  >
                    {DURATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                {/* Issue Date */}
                <div className="cert-gen-field">
                  <label className="form-label" htmlFor="issueDate">
                    Date of Issue <span className="cert-required">*</span>
                  </label>
                  <input
                    id="issueDate"
                    type="date"
                    className={`form-input ${errors.issueDate ? 'form-input-error' : ''}`}
                    value={form.issueDate}
                    onChange={(e) => handleChange('issueDate', e.target.value)}
                  />
                  {errors.issueDate && <p className="form-error">{errors.issueDate}</p>}
                </div>

                {/* Start Date */}
                <div className="cert-gen-field">
                  <label className="form-label" htmlFor="startDate">
                    Internship Start Date <span className="cert-required">*</span>
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    className={`form-input ${errors.startDate ? 'form-input-error' : ''}`}
                    value={form.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                  />
                  {errors.startDate && <p className="form-error">{errors.startDate}</p>}
                </div>

                {/* End Date */}
                <div className="cert-gen-field">
                  <label className="form-label" htmlFor="endDate">
                    Internship End Date <span className="cert-required">*</span>
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    className={`form-input ${errors.endDate ? 'form-input-error' : ''}`}
                    value={form.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                  />
                  {errors.endDate && <p className="form-error">{errors.endDate}</p>}
                </div>

              </div>

              {errors.submit && (
                <div className="cert-gen-error-banner">
                  <span>⚠️</span>
                  <span>{errors.submit}</span>
                </div>
              )}

              <div className="cert-gen-actions">
                <button
                  type="submit"
                  id="generate-cert-btn"
                  className="primary-button cert-gen-submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="cert-spinner" />
                      Generating Certificate…
                    </>
                  ) : (
                    <>
                      <span>✦</span>
                      Generate Certificate
                    </>
                  )}
                </button>

                {step === 'preview' && (
                  <button type="button" className="secondary-button" onClick={handleReset}>
                    ↩ New Certificate
                  </button>
                )}
              </div>
            </form>

            {/* Live pipeline status */}
            {loading && (
              <div className="cert-gen-pipeline-status">
                <div className="cert-pipeline-progress">
                  {['Creating DB record', 'Generating unique ID', 'Building verification URL', 'Generating QR code', 'Ready to export PDF'].map((s, i) => (
                    <div key={s} className="cert-pipeline-progress-item">
                      <span className="cert-pipeline-loader" style={{ animationDelay: `${i * 0.3}s` }} />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </Reveal>

        {/* ── LIVE PREVIEW SIDE ──────────────────────────── */}
        <Reveal>
          <section className="cert-gen-info-card">
            <h2 className="cert-gen-section-title">How it works</h2>
            <div className="cert-how-steps">
              {[
                { n: '01', t: 'Unique Certificate ID', d: 'Auto-generated in format IEL/INT/YEAR/SEQ (e.g. IEL/INT/2026/0327)' },
                { n: '02', t: 'MongoDB Record', d: 'All details securely stored in your Atlas cluster with timestamps' },
                { n: '03', t: 'Verification URL', d: 'A unique public URL is created: innovateedlabs.in/verify/IEL/INT/...' },
                { n: '04', t: 'QR Code', d: 'Dynamically generated QR pointing to the verification URL, embedded in the certificate' },
                { n: '05', t: 'PDF Export', d: 'Puppeteer renders the exact template and streams a pixel-perfect PDF' },
              ].map((s) => (
                <div key={s.n} className="cert-how-step">
                  <div className="cert-how-step-num">{s.n}</div>
                  <div>
                    <strong>{s.t}</strong>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* QR mini preview */}
            {qrPreview && (
              <div className="cert-qr-mini-preview">
                <img src={qrPreview} alt="QR Preview" />
                <div>
                  <strong>QR code preview</strong>
                  <p>The actual QR will point to the real verification URL after generation.</p>
                </div>
              </div>
            )}
          </section>
        </Reveal>
      </div>

      {/* ── CERTIFICATE PREVIEW ──────────────────────────── */}
      {generated && step === 'preview' && (
        <Reveal>
          <section className="cert-gen-result" ref={previewRef}>
            <div className="cert-gen-result-header">
              <div className="cert-gen-success-badge">
                <span>✅</span>
                Certificate Generated Successfully!
              </div>
              <div className="cert-gen-result-meta">
                <span className="cert-result-id">
                  ID: <strong>{generated.certificate.certificateId}</strong>
                </span>
                <span className="cert-result-url">
                  Verify at:{' '}
                  <a href={generated.certificate.verificationUrl} target="_blank" rel="noreferrer">
                    {generated.certificate.verificationUrl}
                  </a>
                </span>
              </div>
            </div>

            {/* The actual certificate */}
            <CertificatePreview
              cert={generated.certificate}
              qrDataUrl={generated.qrDataUrl}
            />

            {/* Download actions */}
            <div className="cert-gen-download-bar">
              <button
                id="download-pdf-btn"
                className="primary-button"
                onClick={handleDownloadPdf}
              >
                ⬇ Download PDF Certificate
              </button>
              <Link
                to={`/certificate/verify/${encodeURIComponent(generated.certificate.certificateId)}`}
                target="_blank"
                className="secondary-button"
                id="verify-link"
              >
                🔍 Open Verification Page
              </Link>
              <button className="secondary-button" onClick={handleReset} id="new-cert-btn">
                ↩ Generate Another
              </button>
            </div>
          </section>
        </Reveal>
      )}
    </div>
  )
}
