type LoaderProps = React.SVGProps<SVGSVGElement> & {
  color1?: string;
  color2?: string;
};

export default function LoaderIcon({
  color1 = 'var(--danger)',
  color2 = 'var(--success)',
  ...rest
}: LoaderProps) {
  return (
    <svg
      aria-label="loading"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width={100}
      height={100}
      {...rest}
      style={{
        shapeRendering: 'auto',
        display: 'block',
        background: 'transparent',
      }}
    >
      <g>
        <circle
          strokeWidth="2"
          stroke={color1}
          fill="none"
          r="0"
          cy="50"
          cx="50"
        >
          <animate
            begin="0s"
            calcMode="spline"
            keySplines="0 0.2 0.8 1"
            keyTimes="0;1"
            values="0;40"
            dur="1s"
            repeatCount="indefinite"
            attributeName="r"
          />
          <animate
            begin="0s"
            calcMode="spline"
            keySplines="0.2 0 0.8 1"
            keyTimes="0;1"
            values="1;0"
            dur="1s"
            repeatCount="indefinite"
            attributeName="opacity"
          />
        </circle>
        <circle
          strokeWidth="2"
          stroke={color2}
          fill="none"
          r="0"
          cy="50"
          cx="50"
        >
          <animate
            begin="-0.5s"
            calcMode="spline"
            keySplines="0 0.2 0.8 1"
            keyTimes="0;1"
            values="0;40"
            dur="1s"
            repeatCount="indefinite"
            attributeName="r"
          />
          <animate
            begin="-0.5s"
            calcMode="spline"
            keySplines="0.2 0 0.8 1"
            keyTimes="0;1"
            values="1;0"
            dur="1s"
            repeatCount="indefinite"
            attributeName="opacity"
          />
        </circle>
      </g>
    </svg>
  );
}
