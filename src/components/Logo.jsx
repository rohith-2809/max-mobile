import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="Max Mobbiles home">
      <span className="grid size-9 place-items-center rounded-[12px] bg-[#1857d8] text-sm font-black tracking-[-0.04em] text-white shadow-[0_10px_30px_rgba(24,87,216,0.22)] transition-transform duration-300 group-hover:-rotate-3">MM</span>
      <span className="text-[15px] font-extrabold tracking-[-0.025em] text-[#0d1b2e]">MAX MOBBILES</span>
    </Link>
  )
}
