import { Link } from 'react-router-dom';
import './Header.scss';

export default function Header() {
  return (
    <div className='Header'>
      <Link to='/'>🚀 TODO with SWR</Link>
    </div>
  );
}
