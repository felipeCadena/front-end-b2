const X = ({
  width = "16",
  height = "16",
  className,
  stroke = "#000000",
}: {
  width?: string;
  height?: string;
  className?: string;
  stroke?: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    stroke={stroke}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M18 6L6 18M6 6L18 18"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default X;
