"use client"
import React from 'react'
import { useState } from 'react';
import jsQR from 'jsqr';
import { LoaderCircle, UploadIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { packGroth16Proof } from '@anon-aadhaar/core';
import { generateAccount } from 'thirdweb/wallets';
import { client } from '../../components/LoginButton';


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

  
  async function gaslessAnonAadhaarIdentity(proofData:any, address:string) {
    const account = await generateAccount({ client });
    
    const nullifierSeed = proofData.proof.nullifierSeed;
    const nullifier = proofData.proof.nullifier;
    const timestamp = proofData.proof.timestamp;
    const signal = BigInt(account.address);
    const revealArray = [
      proofData.proof.ageAbove18,
      proofData.proof.gender,
      proofData.proof.pincode,
      proofData.proof.state
    ];

    const groth16Proof = packGroth16Proof(proofData.proof.groth16Proof);
    const nonce = BigInt(Date.now());

    console.log('NullifierSeed:', nullifierSeed);
    console.log('Nullifier:', nullifier);
    console.log('Timestamp:', timestamp);
    console.log('Signal:', signal);
    console.log('RevealArray:', revealArray);
    console.log('Groth16Proof:', groth16Proof);
    console.log('Nonce:', nonce);

    const messageHash = ethers.solidityPackedKeccak256(
      ['address', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256[4]', 'uint256[8]', 'uint256'],
      [account?.address, nullifierSeed, nullifier, timestamp, signal, revealArray, groth16Proof, nonce]
    );

    // Create the Ethereum Signed Message
    const message = ethers.getBytes(ethers.solidityPackedKeccak256(
      ['string', 'bytes32'],
      ['\x19Ethereum Signed Message:\n32', messageHash]
    ));
    const signature = await account?.signMessage({message:{ raw : message}});
    console.log("sig: ", signature)
    const body = JSON.stringify({address:account?.address, nullifierSeed, nullifier, timestamp, signal:account?.address, revealArray, groth16Proof, nonce:Date.now(), signature});
    const response = await fetch("https://aab-plum.vercel.app/api/user/transact",{
      method:"POST",
      headers:{
          "Content-Type": "application/json",
      },
      body
    });
    let res = await response.json()
  }

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
              console.log(qr)
              const body = JSON.stringify({qrCode:qr, signal:account?.address});
              const response = await fetch("https://aab-plum.vercel.app/api/proof/generate",{
                      method:"POST",
                      headers:{
                          "Content-Type": "application/json",
                      },
                      body
              });
              let userProofData = await response.json()
              localStorage.setItem("user-proof", JSON.stringify(userProofData));
              addUser()
              setLoading(false)
            }
          };
          img.src = e.target?.result?.toString() || "";
          
        };
        reader.readAsDataURL(file);
        
      }
      
  };

  useEffect(()=>{
    if(localStorage.getItem("user-proof")) push("/connect");
  },[])

  const addUser = async() => {
    const userProofData = localStorage.getItem("user-proof");
    const proof = await JSON.parse(userProofData!).proof;
      //await gaslessAnonAadhaarIdentity(proof, account?.address);
    push("/connect")
  }
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
            <p>{loading && "Good things take time, whether it's verifying Aadhaar or making an omelette"}</p>
        </div>
    </div>
  )
}


export default Verify