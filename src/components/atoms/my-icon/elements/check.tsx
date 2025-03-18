const Check = ({
  stroke = "currentColor",
  strokeWidth = "2",
  className,
}: {
  stroke?: string;
  strokeWidth?: string;
  className?: string;
}) => (
  <svg
    width="11"
    height="9"
    viewBox="0 0 11 9"
    stroke={stroke}
    className={className}
  >
    <path fill="none" strokeWidth={strokeWidth} d="M1 4.304L3.696 7l6-6" />
  </svg>
);

export default Check;
