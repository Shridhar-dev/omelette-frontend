'use client'

import { useState, useRef, useEffect } from 'react'
import { start, call, hangup } from '../lib/webrtc'

export default function PeerConnection() {
  const [isStarted, setIsStarted] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.addEventListener('loadedmetadata', () => {
        console.log(`Local video videoWidth: ${localVideoRef.current?.videoWidth}px, videoHeight: ${localVideoRef.current?.videoHeight}px`)
      })
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.addEventListener('loadedmetadata', () => {
        console.log(`Remote video videoWidth: ${remoteVideoRef.current?.videoWidth}px, videoHeight: ${remoteVideoRef.current?.videoHeight}px`)
      })
    }
  }, [])

  const handleStart = async () => {
    const stream = await start()
    if (localVideoRef.current && stream) {
      localVideoRef.current.srcObject = stream
      setIsStarted(true)
    }
  }

  const handleCall = async () => {
    await call(remoteVideoRef.current!)
    setIsCalling(true)
  }

  const handleHangup = () => {
    hangup()
    setIsCalling(false)
  }

  return (
    <div>
      <div className="flex mb-4">
        <video ref={localVideoRef} autoPlay muted playsInline className="w-1/2 mr-2" />
        <video ref={remoteVideoRef} autoPlay playsInline className="w-1/2 ml-2" />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleStart}
          disabled={isStarted}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          Start
        </button>
        <button
          onClick={handleCall}
          disabled={!isStarted || isCalling}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
        >
          Call
        </button>
        <button
          onClick={handleHangup}
          disabled={!isCalling}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-400"
        >
          Hang Up
        </button>
      </div>
    </div>
  )
}
