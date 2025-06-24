import Image from 'next/image';

type LoadingProps = {
  height?: string;
};

export default function Loading({ height = 'screen' }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center h-${height}`}>
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
