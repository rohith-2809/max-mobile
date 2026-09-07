import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="Max Mobbiles home">
      <img
        src="/Logo.png"
        alt=""
        width="1536"
        height="1024"
        className="h-12 w-[72px] object-contain transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
      />
      <span className="hidden text-[15px] font-extrabold tracking-[-0.025em] text-[#0d1b2e] sm:inline">MAX MOBBILES</span>
    </Link>
  )
}
