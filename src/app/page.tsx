import PeerConnection from '../components/PeerConnection'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">WebRTC Peer Connection</h1>
      <PeerConnection />
    </main>
  )
}
