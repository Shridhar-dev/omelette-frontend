import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { GithubIcon } from "lucide-react"
import Link from "next/link"

  
function Dropdown() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger><GithubIcon /></DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem>
                <Link href="https://github.com/Shridhar-dev/omelette-frontend">Frontend</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href="https://github.com/Quantaindew/anon-aadhaar-backend">Backend</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href="https://github.com/Quantaindew/anon-aadhaar-contract">Contract</Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default Dropdown