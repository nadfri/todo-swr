import './CircleLed.scss';

export default function CircleLed({ isCompleted }: { isCompleted: boolean }) {
  return <div className={isCompleted ? 'Circle completed' : 'Circle'}></div>;
}
