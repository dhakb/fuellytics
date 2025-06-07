import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/main-nav";


export default function Header() {

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Image src="/guspump.png" alt="logo" width={40} height={40}/>
          <span className="font-bold inline-block">Fuellytics</span>
        </Link>
        <MainNav className="hidden md:flex"/>
      </div>
    </header>
  );
};


