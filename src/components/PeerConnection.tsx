//@ts-nocheck
'use client'

import { useState, useRef, useEffect } from 'react'
import { CameraIcon, Check, LeafIcon, MusicIcon, Phone, Power, Rocket, Search, SearchCheck } from 'lucide-react'
import Peer from 'peerjs';

export default function PeerConnection() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    
    peer.on('open', (id) => {
      setPeerId(id)
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream)
          call.on('stream', function(remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream
            remoteVideoRef.current.play();
          });
        })
        .catch(err => {
          console.error("Error accessing media devices.", err);
        });
    })

    peerInstance.current = peer;
  }, [])

  const call = (remotePeerId:string) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream)

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      })
      .catch(err => {
        console.error("Error accessing media devices.", err);
      });
  }

  const hangup = () => {
    currentUserVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
    navigator.mediaDevices.getUserMedia({ video: false, audio: false })
  }

  return (
    <div className='flex flex-col h-screen p-4 max-h-screen'>
      <div className="flex flex-col flex-1 bg-black rounded-2xl overflow-hidden mb-4 relative">
        <div className={`absolute top-2 left-2 text-5xl duration-500 ${isCalling ? "translate-y-0" : " -translate-y-40"}`}>🚺</div>
        <video ref={currentUserVideoRef} autoPlay muted playsInline className="w-1/5 rounded-2xl border-white bg-black border-2 ml-2 absolute bottom-5 right-5" />
        <video ref={remoteVideoRef} autoPlay playsInline  className="w-full h-full mr-2" />
          
          <div className='bg-gray-400 bg-opacity-80 absolute bottom-7 right-[16.5%] items-center rounded-full text-xs px-3 py-1 font-semibold flex gap-x-2'><div className={`h-2 w-2 rounded-full ${isStarted ? "bg-green-500" : "bg-red-500"}`}></div>You</div>
          <div className='flex flex-col gap-y-2 absolute top-5 left-5'>
            <button
              onClick={call}
              disabled={!isStarted || isCalling}
              className="h-14 w-14 flex items-center justify-center rounded-xl bg-white text-white disabled:brightness-75"
            >
              <Search className='text-black'/>
            </button>
            <button
              onClick={hangup}
              disabled={!isCalling}
              className="h-14 w-14 flex items-center justify-center rounded-xl bg-[#ec6761] text-white disabled:brightness-75"
            >
              <Power />
            </button>
            <h2 className='text-white'>{peerId}</h2>
            <input className='text-black' type="text" value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
            <button className='bg-red-500'  onClick={() => call(remotePeerIdValue)}>Call</button>
          </div>
          <div className="flex flex-col space-x-4 absolute bottom-5 left-5">    
            <UserCard />
            {/*<button
              onClick={handleStart}
              disabled={isStarted}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
            >
              <Rocket />
            </button>*/}
        </div>
      </div>
      
      
    </div>
  )
}


function UserCard() {
  return (
    <div className='bg-white shadow rounded-2xl p-5 px-2  w-2/3'>
              <div className='h-14 w-14 bg-yellow-400 rounded-2xl mx-auto'>

              </div>
              <div className='flex items-center justify-center gap-x-1 mt-2'>
                <p className='font-semibold text-sm text-center'>tanjiro.<span className='text-orange-500 font-semibold'>eth</span></p>
                <p className='bg-orange-500 w-fit p-0.5 rounded-full'><Check  className='h-2.5 w-2.5 text-white'/></p>
                <p>🚺</p>
              </div>
             
              <div className='flex justify-center flex-wrap gap-2 mt-4'>
                <div className='border px-3 text-xs rounded-full flex items-center gap-2'><MusicIcon className='h-3 w-3'/> Music</div>
                <div className='border px-3 text-xs rounded-full flex items-center gap-2'><CameraIcon className='h-3 w-3'/> Movies</div>
                <div className='border px-3 text-xs rounded-full flex items-center gap-2'><LeafIcon className='h-3 w-3'/> Nature</div>
                <div className='border px-3 text-xs rounded-full flex items-center gap-2'><MusicIcon className='h-3 w-3'/> Music</div>
                <div className='border px-3 text-xs rounded-full flex items-center gap-2'><MusicIcon className='h-3 w-3'/> Music</div>
              </div>
      </div>
  )
}
