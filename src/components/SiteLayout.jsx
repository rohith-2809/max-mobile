import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Outlet, useLocation } from 'react-router-dom'
import SiteHeader from './SiteHeader.jsx'
import SiteFooter from './SiteFooter.jsx'
import RepairRequest from './RepairRequest.jsx'
import MobileQuickActions from './MobileQuickActions.jsx'

export default function SiteLayout() {
  const location = useLocation()
  const [request, setRequest] = useState({ open: false, issue: '', session: 0 })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const titles = {
      '/': 'Max Mobbiles | Precision mobile repair',
      '/repairs': 'Phone repair services | Max Mobbiles',
      '/process': 'Our repair process | Max Mobbiles',
      '/about': 'About Max Mobbiles | Vanasthalipuram',
      '/contact': 'Visit Max Mobbiles | Vanasthalipuram',
    }
    document.title = titles[location.pathname] || 'Max Mobbiles'
  }, [location.pathname])

  const openRequest = (issue = '') => setRequest((current) => ({ open: true, issue, session: current.session + 1 }))

  return (
    <div className="min-h-[100dvh] bg-[#f8faff] text-[#0d1b2e]">
      <SiteHeader onBook={openRequest} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, clipPath: 'inset(0 0 2% 0)' }}
          animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet context={{ openRequest }} />
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
      <MobileQuickActions onRequest={openRequest} />
      <RepairRequest key={request.session} open={request.open} initialIssue={request.issue} onClose={() => setRequest((current) => ({ ...current, open: false }))} />
    </div>
  )
}
