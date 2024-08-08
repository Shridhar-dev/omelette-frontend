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
    <div className='w-full h-fit top-[73%] sm:top-[63%] md:top-[50%] lg:top-[23%] absolute' id="egg" ref={animationContainer}></div>
  );
}