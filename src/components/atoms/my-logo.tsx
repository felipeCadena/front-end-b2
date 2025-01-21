type MyLogoProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  variant: keyof typeof variantsMap;
};

const variantsMap = {
  regular: "/logo.png",
  admin: "",
  white: "",
};

export default function MyLogo({ variant, height, width, className }: MyLogoProps) {
  return (
    <img
      src={variantsMap[variant]}
      alt='logo'
      className={className}
      width={width || 125}
      height={height || 125}
    />
  );
}
