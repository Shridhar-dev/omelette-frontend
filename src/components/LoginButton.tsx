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
}