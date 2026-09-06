import { BatteryCharging, Camera, DeviceMobile, Headphones, Lightning, Sparkle } from '@phosphor-icons/react'

export const MAP_LINK = 'https://maps.app.goo.gl/M2GmRSoDRneZg8jw7'
export const MAP_EMBED = 'https://www.google.com/maps?q=17.3271714,78.5563336&z=16&output=embed'
export const ADDRESS = 'Christian Colony, Vanasthalipuram, Hyderabad, Telangana 500070'

export const services = [
  { id: 'screen', label: 'Screen', icon: DeviceMobile, title: 'Cracked, dim, or unresponsive display', description: 'Choose this for damaged glass, touch issues, display lines, flicker, black spots, or a screen that stays blank.', checks: ['Glass and frame condition', 'Touch response across the panel', 'Display color and brightness'], prepare: 'If touch still works, note where it fails. Avoid pressing loose glass into the display.' },
  { id: 'battery', label: 'Battery', icon: BatteryCharging, title: 'Fast drain or unexpected shutdowns', description: 'Select battery when charge falls quickly, the phone gets unusually warm, or power becomes unreliable.', checks: ['Battery condition', 'Charging behavior', 'Power stability under use'], prepare: 'Mention any recent drop, update, or charger change. Stop using a device if the battery appears swollen.' },
  { id: 'charging', label: 'Charging', icon: Lightning, title: 'Loose cable or no charging response', description: 'Use this path for intermittent charging, a damaged port, or a phone that will not recognize a cable.', checks: ['Port condition', 'Cable connection', 'Power input behavior'], prepare: 'Bring the cable that causes the problem when practical. Do not force a loose connector into the port.' },
  { id: 'camera', label: 'Camera', icon: Camera, title: 'Blur, shake, or camera failure', description: 'Pick camera for focus problems, cracked lens glass, unstable images, or an app that opens to black.', checks: ['Lens glass', 'Focus and stabilization', 'Front and rear camera behavior'], prepare: 'Note whether the issue affects one camera, every camera, or only a particular app.' },
  { id: 'audio', label: 'Audio', icon: Headphones, title: 'Calls, speakers, or microphones', description: 'Choose audio if callers cannot hear you, sound is distorted, or a speaker has become unusually quiet.', checks: ['Microphone input', 'Speaker output', 'Call and media audio'], prepare: 'Describe whether the problem happens on calls, recordings, speaker mode, headphones, or all of them.' },
  { id: 'software', label: 'Software', icon: Sparkle, title: 'Slow, stuck, or behaving strangely', description: 'Choose software for restart loops, frozen apps, update trouble, or unexplained performance issues.', checks: ['System behavior', 'Storage condition', 'Update and restart state'], prepare: 'Write down any error message and the last action you remember before the issue began.' },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Repairs', to: '/repairs' },
  { label: 'Process', to: '/process' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Certificates', to: '/certificate/generate' },
]
