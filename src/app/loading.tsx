import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="/logo.png"
        alt="B2 Adventure Logo"
        width={250}
        height={250}
        className="object-contain animate-pulse"
      />
    </div>
  );
}
