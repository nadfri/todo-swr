import './Header.scss';
import { Link } from 'react-router-dom';
import CounterTask from '../CounterTask/CounterTask';

export default function Header() {
  return (
    <header className='Header'>
      <Link to='/' className='header-link'>
        🚀 <span className='header-title'>TODO with SWR</span>
      </Link>

      <CounterTask />
    </header>
  );
}
