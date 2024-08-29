import { Link } from 'react-router-dom';
import './ErrorPage.scss';

type ErrorPageProps = {
  error?: unknown;
  notFound?: boolean;
};

export default function ErrorPage({ error, notFound }: ErrorPageProps) {
  console.error(error);

  return (
    <div className='ErrorPage'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as Error)?.message || (error as { statusText?: string })?.statusText}
        </i>

        <i>
          {notFound && 'Page not found'}
        </i>
      </p>

      <Link to='/'>Go back to the home page</Link>
    </div>
  );
}
