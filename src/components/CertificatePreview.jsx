import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

/**
 * CertificatePreview
 * Renders the exact InnovateEdLabs certificate template in-browser.
 * Mirrors the Puppeteer HTML template for a WYSIWYG experience.
 *
 * @param {object} cert  — certificate data object
 * @param {string} qrDataUrl — pre-generated QR code base64 data URL
 */
export default function CertificatePreview({ cert, qrDataUrl }) {
  if (!cert) return null

  const {
    certificateId = 'IEL/INT/2026/0001',
    certificateType = 'Internship',
    studentName = 'Student Name',
    course = 'Course Name',
    duration = '3-Month',
    startDate = '01 January 2026',
    endDate = '31 March 2026',
    issueDate = '31 March 2026',
    verificationUrl = '',
  } = cert

  return (
    <div className="cert-preview-scale-wrap">
      <div className="cert-page-preview" id="certificate-preview">

        {/* ═══ LEFT SIDEBAR ════════════════════════════════════════════ */}
        <aside className="cert-sidebar-preview">
          <div className="cert-sidebar-gold-top" />
          <div className="cert-sidebar-gold-stripe" />

          <div className="cert-sidebar-tagline">
            LEARN.<br />INNOVATE.<br />SUCCEED.
          </div>

          <div className="cert-sidebar-features">
            {[
              { icon: '🖥️', label: 'Industry\nRelevant\nTraining' },
              { icon: '📦', label: 'Real-World\nProjects' },
              { icon: '👥', label: 'Expert\nMentorship' },
              { icon: '📊', label: 'Career\nGrowth Support' },
              { icon: '🌐', label: 'Globally\nRelevant Skills' },
            ].map((f) => (
              <div key={f.label} className="cert-sidebar-feature">
                <span className="cert-sidebar-feature-icon">{f.icon}</span>
                <span className="cert-sidebar-feature-label">
                  {f.label.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
                </span>
              </div>
            ))}
          </div>

          <div className="cert-sidebar-quote">
            "Empowering<br />Next-Gen Talent<br />for a Better<br />Tomorrow"
          </div>

          <div className="cert-sidebar-gold-bottom" />
        </aside>

        {/* ═══ MAIN BODY ═══════════════════════════════════════════════ */}
        <main className="cert-main-preview">

          {/* Gold seal */}
          <div className="cert-seal-preview">
            <div className="cert-seal-ring-preview">
              <div className="cert-seal-inner-preview">
                <span>PRACTICE</span>
                <span>BUILD</span>
                <span>GROW</span>
                <span className="cert-seal-stars-preview">★ ★ ★ ★ ★</span>
              </div>
            </div>
          </div>

          {/* Watermark */}
          <div className="cert-watermark-preview">
            SKILLED INDIA STRONGER TOMORROW
          </div>

          {/* ── HEADER ──────────────────────────────────────────── */}
          <div className="cert-header-preview">
            {/* Logo */}
            <div className="cert-logo-block-preview">
              <div className="cert-logo-icon-preview">
                i<span>E</span>
              </div>
              <div>
                <div className="cert-logo-name-preview">
                  Innovate<strong>Ed</strong>Labs
                </div>
                <div className="cert-logo-sub-preview">
                  LEARN <span>•</span> INNOVATE <span>•</span> ELEVATE
                </div>
              </div>
            </div>

            {/* Govt badges + cert ID */}
            <div className="cert-govt-preview">
              {/* MSME box */}
              <div className="cert-msme-preview">
                <div className="cert-msme-box-preview">
                  <div className="cert-msme-lines-preview">
                    {[18, 14, 18, 10, 16].map((w, i) => (
                      <div key={i} style={{ width: w }} />
                    ))}
                  </div>
                </div>
                <div className="cert-msme-text-preview">
                  MICRO, SMALL &amp; MEDIUM<br />ENTERPRISES<br />GOVERNMENT OF INDIA
                </div>
              </div>
              <div className="cert-divider-v-preview" />

              {/* Startup India */}
              <div className="cert-startup-preview">
                <div className="cert-startup-badge-preview">
                  <span className="hash-color">#</span>
                  <span className="startup-color">startup</span>
                  <span className="india-color">india</span>
                </div>
                <div className="cert-startup-flag-preview">🇮🇳</div>
              </div>
              <div className="cert-divider-v-preview" />

              {/* Recognized + cert ID */}
              <div>
                <div className="cert-recognized-preview">
                  <div className="cert-recognized-title-preview">Recognized<br />Training &amp; Internship Partner</div>
                  <div className="cert-recognized-sub-preview">Building a Skilled India</div>
                </div>
                <div className="cert-id-preview">
                  <div className="cert-id-label-preview">Certificate ID</div>
                  <div className="cert-id-value-preview">{certificateId}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── TITLE ──────────────────────────────────────────── */}
          <div className="cert-title-preview">
            <div className="cert-type-heading-preview">{certificateType.toUpperCase()}</div>
            <div className="cert-subtitle-preview">COMPLETION CERTIFICATE</div>
            <div className="cert-certify-line-preview">THIS IS TO CERTIFY THAT</div>
          </div>

          {/* ── STUDENT NAME ─────────────────────────────────── */}
          <div className="cert-student-name-preview">{studentName}</div>
          <div className="cert-name-underline-preview" />

          {/* ── COMPLETION TEXT ──────────────────────────────── */}
          <div className="cert-completion-preview">
            has successfully completed a <strong>{duration} {certificateType}</strong> in
            <div className="cert-course-name-preview">{course}</div>
            at <strong>InnovateEdLabs</strong>, from <strong>{startDate}</strong> to <strong>{endDate}</strong>.
          </div>

          {/* ── DESCRIPTION ──────────────────────────────────── */}
          <p className="cert-desc-preview">
            During this internship, the student worked on real-world projects, gained hands-on
            experience with modern technologies, and demonstrated strong technical skills,
            problem-solving ability, and a passion for learning.
            We appreciate their dedication, hard work, and valuable contributions
            during the internship period.
          </p>

          {/* ── GOLD DIVIDER ─────────────────────────────────── */}
          <div className="cert-gold-divider-preview">
            REAL EXPERIENCE &nbsp;|&nbsp; REAL SKILLS &nbsp;|&nbsp; BRIGHTER TOMORROWS
          </div>

          {/* ── FOOTER ───────────────────────────────────────── */}
          <div className="cert-footer-preview">
            {/* Sig 1 */}
            <div className="cert-sig-block-preview">
              <div className="cert-sig-text-preview">Rahul Sharma</div>
              <div className="cert-sig-line-preview" />
              <div className="cert-sig-name-preview">ACADEMIC DIRECTOR</div>
              <div className="cert-sig-role-preview">InnovateEdLabs</div>
            </div>

            {/* Date */}
            <div className="cert-date-block-preview">
              <div className="cert-date-value-preview">{issueDate}</div>
              <div className="cert-date-label-preview">DATE OF ISSUE</div>
            </div>

            {/* Sig 2 */}
            <div className="cert-sig-block-preview">
              <div className="cert-sig-text-preview">Hemanth</div>
              <div className="cert-sig-line-preview" />
              <div className="cert-sig-name-preview">HEMANTH</div>
              <div className="cert-sig-role-preview">MANAGING DIRECTOR<br />InnovateEdLabs</div>
            </div>

            {/* QR Code */}
            <div className="cert-qr-preview">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="Verification QR" className="cert-qr-img-preview" />
              ) : (
                <div className="cert-qr-placeholder-preview">
                  <span>QR</span>
                </div>
              )}
              <div className="cert-qr-label-preview">Scan to Verify</div>
              <div className="cert-qr-sub-preview">Verify authenticity at<br />innovateedlabs.in/verify</div>
            </div>
          </div>

          {/* ── BOTTOM BAR ───────────────────────────────────── */}
          <div className="cert-bottom-bar-preview">
            <span className="cert-bottom-item-preview">🌐 www.innovateedlabs.in</span>
            <span className="cert-bottom-item-preview">✉ support@innovateedlabs.in</span>
            <span className="cert-bottom-item-preview">📍 Hyderabad, India</span>
            <span className="cert-bottom-tagline-preview">Learn. Innovate. Elevate. Together.</span>
          </div>
        </main>
      </div>
    </div>
  )
}
