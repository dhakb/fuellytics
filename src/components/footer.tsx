import Image from "next/image";


export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/guspump.png" alt="logo" width={40} height={40}/>
          <p className="text-sm leading-loose text-muted-foreground md:text-base">
            Fuellytics &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">US fuel price data analytics</div>
      </div>
    </footer>
  );
}