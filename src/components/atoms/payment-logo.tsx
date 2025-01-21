import { cn } from "@/utils/cn";

export default function PaymentLogo({ imgSrc, className }: { imgSrc: string; className?: string }) {
  return (
    <div
      className={cn(
        "flex h-9 w-16 items-center justify-center rounded-lg border border-gray-300 p-2",
        className,
      )}
    >
      <img
        src={imgSrc}
        alt={imgSrc.split("/").pop()!.split(".").shift()}
      />
    </div>
  );
}
