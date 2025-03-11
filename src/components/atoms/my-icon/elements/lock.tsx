const Lock = ({ className }: { className?: string }) => (
  <svg
    height="50px"
    width="50px"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="black"
    strokeWidth="6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path
      d="M100 10 L30 40 V100 C30 150 70 180 100 190 C130 180 170 150 170 100 V40 L100 10 Z"
      fill="none"
      stroke="#fff"
    />

    <rect
      x="70"
      y="90"
      width="60"
      height="50"
      rx="8"
      fill="none"
      stroke="#fff"
    />
    <path d="M85 90 V70 A15 15 0 0 1 115 70 V90" fill="none" stroke="#fff" />
  </svg>
);

export default Lock;
