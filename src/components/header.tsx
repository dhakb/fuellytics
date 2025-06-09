import Link from "next/link";
import Image from "next/image";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";


export default function Header() {

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-centet pl-10 pr-10">
        <Link href="/" className="flex items-center space-x-2 mr-6">
          <Image src="/logo.png" alt="logo" width={30} height={30}/>
          <span className="font-bold inline-block">Fuellytics</span>
        </Link>
        <MainNav className="hidden md:flex"/>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle/>
          </nav>
        </div>
      </div>
    </header>
  );
};


