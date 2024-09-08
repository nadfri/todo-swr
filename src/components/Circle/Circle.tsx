import './Circle.scss';

export default function Circle({ isCompleted }: { isCompleted: boolean }) {
  return <div className={isCompleted ? 'Circle completed' : 'Circle'}></div>;
}
