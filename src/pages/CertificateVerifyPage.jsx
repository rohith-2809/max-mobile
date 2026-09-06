import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import CertificatePreview from '../components/CertificatePreview.jsx'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function CertificateVerifyPage() {
  const { id } = useParams()
  const [state, setState] = useState('loading') // loading | found | notfound | error
  const [cert, setCert] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    setState('loading')

    fetch(`${API}/api/certificates/${encodeURIComponent(id)}`)
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Not found')
        return data
      })
      .then((data) => {
        setCert(data.certificate)
        setState(data.certificate.status === 'revoked' ? 'revoked' : 'found')
      })
      .catch((err) => {
        if (err.message.toLowerCase().includes('not found') || err.message.includes('404')) {
          setState('notfound')
        } else {
          setError(err.message)
          setState('error')
        }
      })
  }, [id])

  return (
    <div className="cert-verify-page">

      {/* ── Loading ─────────────────────────────────────── */}
      {state === 'loading' && (
        <div className="cert-verify-loading">
          <div className="cert-verify-spinner" />
          <p>Verifying certificate authenticity…</p>
        </div>
      )}

      {/* ── Not Found ────────────────────────────────────── */}
      {state === 'notfound' && (
        <Reveal>
          <div className="cert-verify-status cert-verify-status--invalid">
            <div className="cert-verify-status-icon cert-verify-invalid-icon">✗</div>
            <h1 className="cert-verify-status-title">Certificate Not Found</h1>
            <p className="cert-verify-status-copy">
              The certificate ID <strong>{id}</strong> does not exist in our records.
              This may be an invalid, forged, or expired certificate.
            </p>
            <Link to="/" className="secondary-button" id="go-home-link">← Return Home</Link>
          </div>
        </Reveal>
      )}

      {/* ── Revoked ──────────────────────────────────────── */}
      {state === 'revoked' && (
        <Reveal>
          <div className="cert-verify-status cert-verify-status--revoked">
            <div className="cert-verify-status-icon cert-verify-revoked-icon">⚠</div>
            <h1 className="cert-verify-status-title">Certificate Revoked</h1>
            <p className="cert-verify-status-copy">
              This certificate has been revoked by InnovateEdLabs and is no longer valid.
            </p>
            <Link to="/" className="secondary-button" id="go-home-revoked">← Return Home</Link>
          </div>
        </Reveal>
      )}

      {/* ── Error ────────────────────────────────────────── */}
      {state === 'error' && (
        <Reveal>
          <div className="cert-verify-status cert-verify-status--error">
            <div className="cert-verify-status-icon">⚡</div>
            <h1 className="cert-verify-status-title">Verification Error</h1>
            <p className="cert-verify-status-copy">{error}</p>
            <button className="secondary-button" id="retry-verify-btn" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        </Reveal>
      )}

      {/* ── Found & Valid ─────────────────────────────────── */}
      {state === 'found' && cert && (
        <>
          <Reveal>
            <div className="cert-verify-hero">
              {/* Verified banner */}
              <div className="cert-verified-banner">
                <div className="cert-verified-check">✓</div>
                <div>
                  <h1 className="cert-verified-title">Certificate Verified</h1>
                  <p className="cert-verified-sub">
                    This certificate is authentic and was issued by InnovateEdLabs.
                  </p>
                </div>
              </div>

              {/* Details grid */}
              <div className="cert-verify-details">
                {[
                  { label: 'Certificate ID', value: cert.certificateId },
                  { label: 'Student Name', value: cert.studentName },
                  { label: 'Program', value: cert.course },
                  { label: 'Type', value: cert.certificateType },
                  { label: 'Duration', value: cert.duration },
                  { label: 'From', value: cert.startDate },
                  { label: 'To', value: cert.endDate },
                  { label: 'Date of Issue', value: cert.issueDate },
                  { label: 'Status', value: '✅ VALID & AUTHENTIC', highlight: true },
                ].map((d) => (
                  <div key={d.label} className={`cert-verify-detail ${d.highlight ? 'cert-verify-detail--highlight' : ''}`}>
                    <span className="cert-verify-detail-label">{d.label}</span>
                    <span className="cert-verify-detail-value">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Full certificate preview */}
          <Reveal>
            <div className="cert-verify-preview-wrap">
              <h2 className="cert-verify-preview-title">Certificate Preview</h2>
              <CertificatePreview
                cert={cert}
                qrDataUrl={cert.qrCodeDataUrl}
              />
            </div>
          </Reveal>

          {/* Actions */}
          <Reveal>
            <div className="cert-verify-actions">
              <button
                id="download-verified-pdf"
                className="primary-button"
                onClick={() => window.open(`${API}/api/certificates/${encodeURIComponent(cert.certificateId)}/pdf`, '_blank')}
              >
                ⬇ Download PDF
              </button>
              <Link to="/" className="secondary-button" id="verify-go-home">← InnovateEdLabs Home</Link>
            </div>
          </Reveal>

          {/* Issued by footer */}
          <Reveal>
            <div className="cert-verify-footer">
              <div className="cert-verify-footer-logo">
                <div className="cert-logo-icon-preview">i<span>E</span></div>
                <div>
                  <strong>InnovateEdLabs</strong>
                  <p>LEARN • INNOVATE • ELEVATE</p>
                </div>
              </div>
              <p className="cert-verify-footer-copy">
                This certificate was issued by InnovateEdLabs, a recognized Training &amp; Internship
                Partner under the Government of India's MSME and Startup India programs.
                For queries, contact <a href="mailto:support@innovateedlabs.in">support@innovateedlabs.in</a>.
              </p>
            </div>
          </Reveal>
        </>
      )}
    </div>
  )
}
