export default function FR_FlagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      id="flag-icons-fr"
      className={props.className || ''}
      viewBox="0 0 640 480"
    >
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#fff" d="M0 0h640v480H0z"></path>
        <path fill="#00267f" d="M0 0h213.3v480H0z"></path>
        <path fill="#f31830" d="M426.7 0H640v480H426.7z"></path>
      </g>
    </svg>
  );
}
