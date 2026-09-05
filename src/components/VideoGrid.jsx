import { useRef, useState } from 'react'
import { ArrowRight, BatteryCharging, DeviceMobile, Pause, Play } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import Reveal from './Reveal.jsx'

const videos = [
  {
    id: 'screen',
    src: 'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4',
    poster: '/assets/screen-repair-poster.png',
    icon: DeviceMobile,
    label: 'Screen symptoms',
    title: 'Layer by layer — done right.',
    copy: 'Every screen replacement starts with full disassembly. We inspect the frame, replace only what needs replacing, and calibrate touch response before the phone leaves the bench.'
  },
  {
    id: 'battery',
    src: 'https://videos.pexels.com/video-files/5082570/5082570-hd_1920_1080_30fps.mp4',
    poster: '/assets/battery-repair-poster.png',
    icon: BatteryCharging,
    label: 'Power symptoms',
    title: 'New cell. Real capacity.',
    copy: 'Genuine-grade cells installed with proper adhesive removal and connector seating. We test charge cycles and thermal behaviour before handing your phone back.'
  }
]

function VideoCard({ video, reduceMotion }) {
  const Icon = video.icon
  const ref = useRef(null)
  const [playing, setPlaying] = useState(!reduceMotion)

  const toggle = () => {
    if (!ref.current) return
    if (ref.current.paused) {
      ref.current.play()
      setPlaying(true)
    } else {
      ref.current.pause()
      setPlaying(false)
    }
  }

  return (
    <Reveal className="video-card-wrap group">
      <video
        ref={ref}
        className="video-card-media"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        poster={video.poster}
      >
        <source src={video.src} type="video/mp4" />
      </video>
      <div className="video-wash" aria-hidden="true" />
      
      <span className="video-card-tag flex items-center gap-1.5">
        <Icon size={15} weight="duotone" />
        {video.label}
      </span>
      
      <div className="video-card-footer">
        <div>
          <h3 className="video-card-title">{video.title}</h3>
          <p className="video-card-copy">{video.copy}</p>
        </div>
        
        <button
          className="video-card-btn"
          onClick={toggle}
          aria-label={playing ? `Pause ${video.label} video` : `Play ${video.label} video`}
        >
          {playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
        </button>
      </div>
    </Reveal>
  )
}

export default function VideoGrid() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="video-grid-section">
      <Reveal className="video-grid-header">
        <h2 className="section-title">The symptom tells the first part of the story.</h2>
        <p className="section-copy">
          Compare the details worth noticing before your visit. These visual guides use distinct 
          repair imagery and never present one video as multiple jobs.
        </p>
      </Reveal>
      <div className="video-grid-cards">
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} reduceMotion={reduceMotion} />
        ))}
      </div>
    </section>
  )
}
