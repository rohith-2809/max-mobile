import { ArrowRight, BatteryCharging, DeviceMobile } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

const stories = [
  { id: 'screen', image: '/assets/screen-repair-poster.png', icon: DeviceMobile, label: 'Screen symptoms', title: 'Glass, display, and touch are different clues.', copy: 'A crack may be visible, but lines, black areas, flicker, and missed touches help describe which layers need attention.' },
  { id: 'battery', image: '/assets/battery-repair-poster.png', icon: BatteryCharging, label: 'Power symptoms', title: 'Fast drain and charging trouble need separate notes.', copy: 'Heat, unexpected shutdowns, loose cables, and slow charging each point the assessment toward a different starting check.' },
]

function StoryCard({ story }) {
  const Icon = story.icon

  return (
    <Reveal className="video-card-wrap group">
      <img className="video-card-media transition-transform duration-700 ease-out group-hover:scale-[1.035]" src={story.image} alt="" />
      <div className="video-wash" aria-hidden="true" />
      <span className="video-card-tag"><Icon size={15} weight="duotone" />{story.label}</span>
      <div className="video-card-footer">
        <div>
          <h3 className="video-card-title">{story.title}</h3>
          <p className="video-card-copy">{story.copy}</p>
        </div>
        <Link className="video-card-btn" to="/repairs" aria-label={`Explore ${story.label}`}><ArrowRight size={18} weight="bold" /></Link>
      </div>
    </Reveal>
  )
}

export default function VideoGrid() {
  return (
    <section className="video-grid-section">
      <Reveal className="video-grid-header">
        <h2 className="section-title">The symptom tells the first part of the story.</h2>
        <p className="section-copy">Compare the details worth noticing before your visit. These visual guides use distinct repair imagery and never present one video as multiple jobs.</p>
      </Reveal>
      <div className="video-grid-cards">
        {stories.map((story) => <StoryCard key={story.id} story={story} />)}
      </div>
    </section>
  )
}
