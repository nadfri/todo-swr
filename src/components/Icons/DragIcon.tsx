export default function DragIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      className={props.className || ''}
      width={16}
      height={16}
      viewBox='0 0 18 18'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fill='currentColor'
        d='M8 16v1c0 .5-.4 1-1 1H6c-.6 0-1-.5-1-1v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M13 16v1c0 .5-.4 1-1 1h-1c-.6 0-1-.5-1-1v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M8 11v1c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M13 11v1c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M8 6v1c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M13 6v1c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h1c.6 0 1 .4 1 1M8 1v1c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V1c0-.5.4-1 1-1h1c.6 0 1 .5 1 1M13 1v1c0 .6-.4 1-1 1h-1c-.6 0-1-.4-1-1V1c0-.5.4-1 1-1h1c.6 0 1 .5 1 1'
      />
    </svg>
  );
}
