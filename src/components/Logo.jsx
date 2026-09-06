import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="Max Mobbiles home">
      <img
        src="/Logo.png"
        alt=""
        width="1536"
        height="1024"
        className="h-12 w-[72px] rounded-[10px] object-cover shadow-[0_10px_26px_rgba(36,39,5,0.2)] transition-transform duration-300 group-hover:scale-[1.04]"
      />
      <span className="hidden text-[15px] font-extrabold tracking-[-0.025em] text-[#0d1b2e] sm:inline">MAX MOBBILES</span>
    </Link>
  )
}
