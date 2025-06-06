type MyLogoProps = {
  width?: number | string;
  height?: number | string;
  className?: string;
  variant: keyof typeof variantsMap;
};

const variantsMap = {
  mobile: "/logo.png",
  web: "/logo-web.png",
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
