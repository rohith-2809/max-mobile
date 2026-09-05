import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, List, X } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo.jsx'
import { navLinks } from '../data/siteContent.jsx'

export default function SiteHeader({ onBook }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-[#dce4f0]/80 bg-[#f8faff]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>{link.label}</NavLink>
          ))}
        </nav>
        <button className="primary-button hidden lg:inline-flex" onClick={() => onBook()}>
          Request an assessment <ArrowRight weight="bold" />
        </button>
        <button className="grid size-11 place-items-center rounded-[12px] border border-[#d6dfec] bg-white text-[#0d1b2e] lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Close navigation' : 'Open navigation'}>
          {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav className="border-t border-[#dce4f0] bg-[#f8faff] px-5 pb-5 pt-2 lg:hidden" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center justify-between border-b border-[#e4eaf3] py-4 text-base font-bold ${isActive ? 'text-[#1857d8]' : 'text-[#223149]'}`}>
                {link.label}<ArrowRight size={18} />
              </NavLink>
            ))}
            <button className="primary-button mt-5 w-full justify-center" onClick={() => { setOpen(false); onBook() }}>Request an assessment</button>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
