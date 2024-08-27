import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  return (
    <div className='Header'>
      <Link to='/' className='header-link'>🚀 TODO with SWR</Link>
    </div>
  );
}
