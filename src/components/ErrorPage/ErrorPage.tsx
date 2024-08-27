import { Link } from 'react-router-dom';
import './ErrorPage.scss';

export default function ErrorPage({ error }: { error: unknown }) {
  console.error(error);

  return (
    <div className='ErrorPage'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as Error)?.message || (error as { statusText?: string })?.statusText}
        </i>
      </p>

      <Link to='/'>Go back to the home page</Link>
    </div>
  );
}
