const Options = ({ fill = "#8F9BB3" }: { fill?: string }) => (
  <svg
    width="13"
    height="3"
    viewBox="0 0 13 3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="1.5" cy="1.5" r="1.5" fill={fill} />
    <circle cx="6.5" cy="1.5" r="1.5" fill={fill} />
    <circle cx="11.5" cy="1.5" r="1.5" fill={fill} />
  </svg>
);

export default Options;
