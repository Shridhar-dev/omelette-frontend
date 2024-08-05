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
          <button className='bg-brand text-black font-semibold px-5 py-2 rounded-full'>Login</button>
        </div>
      </nav>}

      <div className='grid grid-cols-3 pb-10 sm:pb-0 sm:h-screen overflow-hidden w-screen px-20 relative'>
        <div className='col-span-3 mt-32'>
          <p className='text-4xl text-center sm:text-8xl  font-black text-black mt-5'>Chat Securely, Connect Confidently, Personalized Matches!</p>
          <p className=' text-xl text-center sm:text-2xl mt-5'>Coming out of your shell is hard. Omelette makes it easy.</p>
          <div className='flex items-center justify-center gap-x-5 mt-4'>
            <button  onClick={()=>push("/connect")} className='bg-black text-white font-semibold text-lg rounded-full px-6 py-2'>Start Hatching</button>
            <button className='bg-white  font-semibold text-lg rounded-full px-6 py-2'>Join Farm</button>
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
          <p className='mt-5 text-xl leading-10'>Introducing our revolutionary chat app that puts safety and personalization at the forefront of your online interactions. With Aadhaar-based verification, we ensure that only verified adults can join the conversation, creating a secure environment where you can connect with confidence. Whether you're looking to meet new friends, engage in meaningful conversations, or simply pass the time, our app offers a seamless experience tailored to your preferences. Our intuitive gender filter allows you to choose whether you want to chat with males or females, giving you the power to customize your connections. Say goodbye to the uncertainty of anonymous chats and hello to a community of genuine, like-minded individuals. Join us today and discover the difference of chatting with confidence!</p>
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
          <p>Earth first. Polygon's eco-friendly blockchain allows each publication on Lens Protocol to have a low carbon footprint while being on a low-cost, secure blockchain.</p>
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
