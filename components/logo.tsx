import Image from "next/image";
import Link from "next/link";

/** The pixel plum and the wordmark, linking home. */
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-md" aria-label="Plumlang home">
      <Image src="/plum.svg" width={30} height={30} alt="" priority className="[image-rendering:pixelated]" />
      <span className="font-pixel text-[0.8rem] leading-none tracking-tight text-foreground">PLUM</span>
    </Link>
  );
}
