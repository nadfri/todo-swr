import { Link } from 'react-router-dom';
import './ErrorPage.scss';

export default function NotFound() {
  return (
    <div className='ErrorPage'>
      <h1>4 • 0 • 4</h1>
      <p>Page not found</p>
      <Link to='/'>Go back to the home page</Link>
    </div>
  );
}
