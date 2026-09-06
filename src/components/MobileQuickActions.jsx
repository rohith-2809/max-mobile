import { ClipboardText, NavigationArrow } from '@phosphor-icons/react'
import { MAP_LINK } from '../data/siteContent.jsx'

export default function MobileQuickActions({ onRequest }) {
  return (
    <aside className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-md items-center gap-2 rounded-[16px] bg-[#0d1b2e] p-2 shadow-[0_18px_48px_rgba(13,27,46,0.28)] lg:hidden" aria-label="Quick actions">
      <a className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-white/10 text-white transition-colors hover:bg-white/18" href={MAP_LINK} target="_blank" rel="noreferrer" aria-label="Open directions">
        <NavigationArrow size={21} weight="fill" />
      </a>
      <button className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[12px] bg-white px-4 text-sm font-extrabold text-[#0d1b2e] transition-transform active:scale-[0.98]" onClick={onRequest}>
        <ClipboardText size={19} weight="duotone" />Start a repair request
      </button>
    </aside>
  )
}
