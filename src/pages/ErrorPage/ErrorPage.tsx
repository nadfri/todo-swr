import { Link } from 'react-router-dom';
import './ErrorPage.scss';
import { useErrorBoundary } from "react-error-boundary";

type ErrorPageProps = {
  error?: unknown;
  notFound?: boolean;
};

export default function ErrorPage({ error, notFound }: ErrorPageProps) {
  if (error) console.error(error);

  const { resetBoundary } = useErrorBoundary();

  return (
    <div className='ErrorPage'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as Error)?.message || (error as { statusText?: string })?.statusText}
        </i>

        <i>{notFound && 'Page not found'}</i>
      </p>

      <Link to='/' onClick={resetBoundary}>Go back to the home page</Link>
    </div>
  );
}
