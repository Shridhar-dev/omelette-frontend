"use client"
import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { inAppWallet } from "thirdweb/wallets";
 // secret = t-IiNPsO_nZXjO3up6gBuom7kJddv9BCSckGWLiXro7jjZMdJ1wg6O9s1CH2PRkMcmpJBznAimQCT0K5nEjxpw
const client = createThirdwebClient({ clientId:"ad116970a6f30c3c42f6306c6a702eae" });
const wallets = [inAppWallet()];
 
export default function LoginButton() {
  return (
      <ConnectButton connectButton={{label:"Login"}} client={client} wallets={wallets} />
  );
}