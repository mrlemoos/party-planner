import FeatureHighlights from './components/feature-highlights'
import GradientPhilosophy from './components/gradient-philosophy'
import WaitingListAnnouncement from './components/waiting-list-announcement'

function LandingPage(): JSX.Element {
  return (
    <main className='mt-[30vh] min-h-screen'>
      <WaitingListAnnouncement />
      <FeatureHighlights />
      <GradientPhilosophy />
    </main>
  )
}

export default LandingPage
