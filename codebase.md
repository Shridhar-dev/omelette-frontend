# Codebase Contents
## File: ./app/connect/page.tsx
```
import PeerConnection from '@/components/PeerConnection'

export default function Home() {
  return (
    <main className="bg-brandgrad h-screen max-h-screen overflow-hidden mx-auto">
      <PeerConnection />
    </main>
  )
}
```

## File: ./app/globals.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

#egg > svg {
  height: auto !important;
}

.tw-connect-wallet {
  background: black !important;
  color: white !important;
  font-weight: 700 !important;
  border-radius: 50px !important;
  font-size: 1rem !important;
  padding: 0.6rem 0rem 0.6rem 0rem !important;
  min-width: 100px !important;
}```

## File: ./app/layout.tsx
```
"use client"
import './globals.css'
import { Montserrat } from 'next/font/google'
import { ThirdwebProvider } from "thirdweb/react";

const inter = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  )
}
```

## File: ./app/page.tsx
```
"use client"
import { useRouter } from 'next/navigation'
import PeerConnection from '../components/PeerConnection'
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo.png'
import Women from '@/assets/stockw.jpeg'
import { CameraIcon, LeafIcon, MusicIcon } from 'lucide-react';
import EggAnimation from '@/components/EggAnimation';
import LoginButton from '@/components/LoginButton';


export default function Home() {
  const { push } = useRouter();
  return (
    <main className="bg-brandgrad flex flex-col items-center justify-center overflow-hidden mx-auto">
      {<nav className='flex justify-between items-center fixed z-10 top-0 w-full px-20 py-10'>
        <p className='text-xl font-semibold text-black'>Omelette.</p>
        <div className='flex items-center gap-x-5 font-semibold'>
          <Link href="/">Farm</Link>
          <Link href="/">FAQ</Link>
          <Link href="/">Discord</Link>
          <LoginButton />
        </div>
      </nav>}

      <div className='grid grid-cols-3 pb-10 sm:pb-0 sm:h-screen overflow-hidden w-screen px-20 relative'>
        <div className='col-span-3 mt-32'>
          <p className='text-4xl text-center sm:text-8xl  font-black text-black mt-5'>Chat Securely, Connect Confidently, Personalized Matches!</p>
          <p className=' text-xl text-center sm:text-2xl mt-5'>Coming out of your shell is hard. Omelette makes it easy.</p>
          <div className='flex items-center justify-center gap-x-5 mt-4'>
            <button  onClick={()=>push("/connect")} className='bg-black relative z-10 text-white font-semibold text-lg rounded-full px-6 py-2'>Start Hatching</button>
            <button className='bg-white  font-semibold text-lg relative z-10 rounded-full px-6 py-2'>Join Farm</button>
          </div>
        </div>
        <EggAnimation />
      </div>
      
      <div className='min-h-screen bg-white relative grid grid-cols-1 md:grid-cols-2 w-full'>
        <div className=' sticky top-0 left-0 col-span-1 flex justify-center items-center p-5'>
          <Card />
        </div>
        <div className='border-l border-brand p-10'>
          <p className='text-4xl md:text-7xl font-black md:leading-[5rem]'>Verify your Identify. Make new Frens</p>
          <p className='mt-5 text-xl leading-10'>Introducing our revolutionary chat app that puts safety and personalization at the forefront of your online interactions. With Aadhaar-based verification, we ensure that only verified adults can join the conversation, creating a secure environment where you can connect with confidence. Whether youre looking to meet new friends, engage in meaningful conversations, or simply pass the time, our app offers a seamless experience tailored to your preferences. Our intuitive gender filter allows you to choose whether you want to chat with males or females, giving you the power to customize your connections. Say goodbye to the uncertainty of anonymous chats and hello to a community of genuine, like-minded individuals. Join us today and discover the difference of chatting with confidence!</p>
        </div>
      </div>
      {/*<div className='min-h-screen py-10 flex flex-col items-center relative justify-center bg-black bg-opacity-[2%] w-full'>
          <Card />
          <Card styles=' scale-[50%] absolute top-[-15%] left-[0%] opacity-50'/>
          <Card styles=' scale-[40%] absolute top-[-10%] right-[0%] opacity-50'/>
          <Card styles=' scale-[30%] absolute top-[30%] right-[5%] opacity-50'/>
          <Card styles=' scale-[30%] absolute top-[35%] left-[5%] opacity-50'/>
          <p className='text-5xl mt-20'>Over 1069+ people have already hatched!</p>
          <button className='bg-brand mt-5 font-semibold text-black text-lg rounded-full px-6 py-2'>Get fried now!</button>
      </div>*/}
      <section className='bg-black text-brand  grid grid-cols-1 md:grid-cols-3 px-10 md:px-20 w-full'>
        <div className=' py-10'>
          <p className='mb-2'>WHY OMELETTE?</p>
          <p>Verified Adults Only: Experience Secure and Real Connections! Say Goodbye to Minors: Safe and Verified Adult Chats. Chat with Confidence: Verified Adults and Personalized Filters!</p>
        </div>
        <div className='border-t border-b md:border-t md:border-b md:border-l md:border-r border-brand md:px-10 py-10'>
          <p className='mb-2'>WHY POLYGON?</p>
          <p>Earth first. Polygon&apos; eco-friendly blockchain allows each publication on Lens Protocol to have a low carbon footprint while being on a low-cost, secure blockchain.</p>
        </div>
        <div className='md:pl-10 py-10'>
          <p className='mb-2'>LEARN MORE</p>
          <Link href="" className='block'>Farm Hatching</Link>
          <Link href="" className='block'>Join Omelette</Link>
          <Link href="" className='block'>FAQ</Link>
        </div>
        
      </section>
      <footer className='bg-brand w-full p-10'>
        <p className='text-xl md:text-9xl font-black'>Omelette.</p>
      </footer>
      {/*<p className='text-9xl font-semibold text-[#2e5af6]'>Omellete</p>
      <p className='text-xl mb-10 mt-2'>An app to get out of your shell</p>
      <button onClick={()=>push("/connect")} className='bg-[#2e5af6] text-white font-semibold border-none p-3 px-5 rounded-xl'>Chalo fry kare</button>*/}
    </main>
  )
}

function Card({styles=""}:{styles?:string}) {
  return (
    <div className={`bg-white shadow-sm max-w-[500px] w-fit p-10  rounded-xl ${styles}`}>
            <Image 
              src={Women.src}
              height={Women.height}
              width={Women.width}
              alt=''
              className='rounded-xl'
            />
            <div className='flex flex-wrap gap-2 mt-4'>
              Likes: 
              <div className='bg-brand px-3 text-sm rounded-full flex items-center gap-2'><MusicIcon className='h-3 w-3'/> Music</div>
              <div className='bg-brand px-3 text-sm rounded-full flex items-center gap-2'><CameraIcon className='h-3 w-3'/> Movies</div>
              <div className='bg-brand px-3 text-sm rounded-full flex items-center gap-2'><LeafIcon className='h-3 w-3'/> Nature</div>
              <div className='bg-brand px-3 text-sm rounded-full flex items-center gap-2'><MusicIcon className='h-3 w-3'/> Music</div>
              <div className='bg-brand px-3 text-sm rounded-full flex items-center gap-2'><MusicIcon className='h-3 w-3'/> Music</div>
            </div>
    </div>
  )
}
```

## File: ./app/verify/page.tsx
```
"use client"
import React from 'react'
import { useState } from 'react';
import jsQR from 'jsqr';
import { Loader, LoaderCircle, UploadIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { useRouter } from 'next/navigation';

function Verify() {
    const [qrResult, setQrResult] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const account = useActiveAccount();
    const [loading, setLoading] = useState(false)
    const { push } = useRouter();
    
    useEffect(()=>{
      
      if(!account?.address){
        push("/");
      }
    },[account])


    const submitQR = async() => {
      setLoading(true)
      if (file) {
        const reader = new FileReader();
        let qr:string;
        reader.onload = (e) => {
          const img = new Image();
          img.onload = async() => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context?.drawImage(img, 0, 0, img.width, img.height);
            const imageData = context?.getImageData(0, 0, img.width, img.height);
            if(imageData){
              const code = jsQR(imageData.data, imageData.width, imageData.height);
              
              if (code) {
                setQrResult(code.data);
                qr=code.data;
              } else {
                setQrResult('No QR code found');
              }
              const body = JSON.stringify({qrCode:qr, signal:account?.address});
              const response = await fetch("http://192.168.102.234:3000/api/proof/generate",{
                      method:"POST",
                      headers:{
                          "Content-Type": "application/json",
                      },
                      body
              });
              let userProofData = await response.json()
              localStorage.setItem("user-proof", JSON.stringify(userProofData));
              setLoading(false)
            }
          };
          img.src = e.target?.result?.toString() || "";
          
        };
        reader.readAsDataURL(file);
        
      }
      
    };

  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center bg-brandgrad'>
        <div className='bg-white text-black font-bold text-3xl rounded-xl p-8'>
            <p className='text-center'>Verify with Anon Aadhaar</p>
            <div className='h-52 mt-5 w-full overflow-hidden relative border-2 border-dashed rounded-xl'>
                <input
                    type="file"
                    accept="image/*"
                    className='w-full h-full absolute'
                    onChange={(e)=>{setFile(e.target.files ? e.target.files[0] : null)}}
                />
                <div className='bg-white text-base font-normal flex flex-col items-center justify-center absolute top-0 left-0 h-full w-full pointer-events-none'>
                    {!file && <UploadIcon />}
                    {!file && <p className='mt-2'>Upload Aadhaar QR Code</p>}
                    {file && <p>{file.name}</p>}
                </div>
            </div>
            <button disabled={loading} onClick={submitQR} className='text-lg flex items-center justify-center gap-x-2 font-semibold bg-black text-white w-full rounded-md py-2 mt-2'>Submit {loading && <LoaderCircle className=' animate-spin duration-500 text-white'/>}</button>
        </div>
    </div>
  )
}


export default Verify```

## File: ./components/EggAnimation.tsx
```
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
let v=0;
export default function EggAnimation() {
  const animationContainer = useRef(null);

  useEffect(() => {
    if(v) return;

    lottie.loadAnimation({
      //@ts-ignore
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/egg.json'
    });
    v=1;
  }, []);

  return (
    <div className='w-full h-fit top-[23%] absolute' id="egg" ref={animationContainer}></div>
  );
}```

## File: ./components/EggModel.tsx
```

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { MeshComponent } from './Model'
import { Suspense } from 'react'
import * as THREE from 'three';

function EggModel() {
  return (
    <>
    <Canvas id="hello" shadows
        onCreated={(state) => {
          state.gl.shadowMap.enabled = true;
          state.gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }} style={{width:"100vw", height:"100vh", background:"black"}}>
        <Suspense fallback={null}>
            <ambientLight intensity={2}  color={'white'}/>
            <spotLight
                position={[0, 0, 0]}
                angle={0.15}
                penumbra={1}
                decay={0}
                intensity={Math.PI}
                color={'rgba(255,255,255)'}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
          /> 
          <MeshComponent onLoad={()=>{console.log("hi")}}/>
        </Suspense>
      </Canvas>
    </>
  )
}

export default EggModel```

## File: ./components/LoginButton.tsx
```
"use client"
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { inAppWallet } from "thirdweb/wallets";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const client = createThirdwebClient({ clientId:"ad116970a6f30c3c42f6306c6a702eae" });
const wallets = [inAppWallet()];
 
export default function LoginButton() {
  const account = useActiveAccount();
  const { push } = useRouter();
  useEffect(()=>{
    if(account?.address){
      //push("/verify");
    }
  },[account])

  return (
      <ConnectButton connectButton={{label:"Login"}} client={client} wallets={wallets} />
  );
}```

## File: ./components/Model.tsx
```
//@ts-nocheck
'use client'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three';



export const MeshComponent: React.FC<{ onLoad: () => void }> = ({ onLoad }) => {
    const fileUrl = 'egg.glb';
    const gltf = useLoader(GLTFLoader, fileUrl, () => onLoad());
    const meshRef = useRef<THREE.Mesh>(null);
  
    useFrame(({ clock, camera, controls }) => {
        
        camera.position.x = meshRef.current?.position.x-5;
        camera.position.y = meshRef.current?.position.y-5;
        camera.position.z = meshRef.current?.position.z-5;
       
    });
  
    return gltf ? (
      <mesh position={[0,0,0]} rotation={[0,0,0]} scale={32} ref={meshRef} castShadow receiveShadow>
        <primitive object={gltf.scene} />
      </mesh>
    ) : null;
  };
  ```

## File: ./components/PeerConnection.tsx
```
//@ts-nocheck
'use client'

import { useState, useRef, useEffect } from 'react'
import { CameraIcon, Check, LeafIcon, MicIcon, MicOffIcon, MusicIcon, Phone, Power, Rocket, Search, SearchCheck, VideoIcon, VideoOffIcon } from 'lucide-react'
import Peer from 'peerjs';

export default function PeerConnection() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const [isCalling, setIsCalling] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isSecureContext, setIsSecureContext] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const connectionRef = useRef(null);
  const userStreamRef = useRef(null);

  var iceArray = [{ "Credential": null, "Username": null, "Url": "stun:global.stun.twilio.com:3478?transport=udp", "Urls": "stun:global.stun.twilio.com:3478?transport=udp" }];
  useEffect(() => {
    setIsSecureContext(window.isSecureContext);

    const peer = new Peer(undefined, {
      config: {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:global.stun.twilio.com:3478' },
          // Add your TURN server here
        ]
      }
    });
    
    peer.on('open', (id) => {
      setPeerId(id)
    });

    peer.on('call', (call) => {
      if (isSecureContext) {
        handleIncomingCall(call);
      } else {
        alert("Incoming call received, but video is not available in non-secure context. You can use text chat.");
      }
    });

    peer.on('connection', (conn) => {
      connectionRef.current = conn;
      setupConnectionListeners(conn);
    });

    peerInstance.current = peer;
  }, [isSecureContext]);

  const handleIncomingCall = (call) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        userStreamRef.current = mediaStream;
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
  }

  const call = (remotePeerId) => {
    if (isSecureContext) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          userStreamRef.current = mediaStream;
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
    } else {
      alert("Video call is not available in non-secure context. You can use text chat.");
    }

    const conn = peerInstance.current.connect(remotePeerId);
    connectionRef.current = conn;
    setupConnectionListeners(conn);
  }

  const setupConnectionListeners = (conn) => {
    conn.on('open', () => {
      console.log("Text chat connection established");
    });

    conn.on('data', (data) => {
      setMessages(prevMessages => [...prevMessages, { text: data, sender: 'remote' }]);
    });
  }

  const sendMessage = () => {
    if (currentMessage && connectionRef.current) {
      connectionRef.current.send(currentMessage);
      setMessages(prevMessages => [...prevMessages, { text: currentMessage, sender: 'local' }]);
      setCurrentMessage('');
    }
  }

  const toggleMic = () => {
    if (userStreamRef.current) {
      const audioTrack = userStreamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMicOn(audioTrack.enabled);
    }
  }

  const toggleVideo = () => {
    if (userStreamRef.current) {
      const videoTrack = userStreamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
    }
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
              onClick={toggleMic}
              className="h-14 w-14 flex items-center justify-center rounded-xl bg-white text-black disabled:brightness-75"
            >
              {isMicOn ? <MicIcon  className='h-5 w-5'/> : <MicOffIcon  className='h-5 w-5'/>}
            </button>
            <button
              onClick={toggleVideo}
              className="h-14 w-14 flex items-center justify-center rounded-xl bg-white text-black disabled:brightness-75"
            >
              {isVideoOn ? <VideoIcon  className='h-5 w-5'/> : <VideoOffIcon  className='h-5 w-5'/>}
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
            <div className='bg-white rounded-lg min-h-52 p-3 px-3 w-[300px]'>
              <div style={{ height: '200px', overflowY: 'scroll', marginBottom: '10px' }}>
                {messages.map((msg, index) => (
                  <div className={`font-semibold text-sm  rounded-xl p-1 px-3 ${ msg.sender === 'local' ? "rounded-tr-none bg-yellow-100" : " rounded-tl-none bg-orange-100"} mb-2 w-fit`} key={index} style={{ marginLeft: msg.sender === 'local' ? 'auto' : '0%' }}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <input 
                type="text" 
                className='border w-full'
                value={currentMessage} 
                onChange={e => setCurrentMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
              />
            </div>
            {/*<UserCard />*/}
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
```

## File: ./lib/utils.ts
```
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

