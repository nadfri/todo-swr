import './Header.scss';
import { Link } from 'react-router-dom';
import CounterTask from '../CounterTask/CounterTask';

export default function Header() {
  return (
    <div className='Header'>
      <Link to='/' className='header-link'>🚀 TODO with SWR</Link>
      <CounterTask />
    </div>
  );
}
