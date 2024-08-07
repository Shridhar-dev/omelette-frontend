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


export default Verify