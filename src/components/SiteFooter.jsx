import { ArrowUpRight, MapPin } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { ADDRESS, MAP_EMBED, MAP_LINK, navLinks } from '../data/siteContent.jsx'

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#dce4ef] bg-[#f1f5fb] px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto grid max-w-[1340px] overflow-hidden rounded-[16px] bg-white shadow-[0_22px_70px_rgba(52,78,114,0.1)] lg:grid-cols-[0.78fr_1.22fr]">
        <div className="flex flex-col justify-between p-7 sm:p-10 lg:p-12">
          <div>
            <Logo />
            <h2 className="mt-14 max-w-[470px] text-3xl font-[780] leading-tight tracking-[-0.035em] text-[#0d1b2e] sm:text-4xl">Visit Max Mobbiles in Vanasthalipuram.</h2>
            <div className="mt-7 flex items-start gap-3 text-[#53627a]">
              <MapPin size={23} className="mt-0.5 shrink-0 text-[#1857d8]" weight="duotone" />
              <address className="max-w-[42ch] text-sm not-italic leading-6">{ADDRESS}</address>
            </div>
            <a className="primary-button mt-7" href={MAP_LINK} target="_blank" rel="noreferrer">Open directions <ArrowUpRight weight="bold" /></a>
          </div>
          <nav className="mt-14 grid grid-cols-2 gap-x-7 gap-y-3 border-t border-[#e1e7f0] pt-7 text-sm font-bold text-[#5c6a80]" aria-label="Footer navigation">
            {navLinks.map((link) => <Link key={link.to} to={link.to} className="hover:text-[#1857d8]">{link.label}</Link>)}
          </nav>
        </div>
        <div className="relative min-h-[370px] overflow-hidden bg-[#eaf1ff] lg:min-h-[520px]">
          <iframe title="Map showing Max Mobbiles in Vanasthalipuram" src={MAP_EMBED} className="absolute inset-0 h-full w-full border-0 grayscale-[0.15]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
      <div className="mx-auto mt-7 flex max-w-[1340px] flex-col gap-2 text-xs font-semibold text-[#738097] sm:flex-row sm:items-center sm:justify-between">
        <p>Mobile repair requests, made clear.</p><p>Max Mobbiles, Hyderabad</p>
      </div>
    </footer>
  )
}
