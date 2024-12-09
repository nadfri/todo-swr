import { Link } from 'react-router-dom';
import './ErrorPage.scss';
import { useErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

type ErrorPageProps = {
  error?: unknown;
  notFound?: boolean;
};

export default function ErrorPage({ error, notFound }: ErrorPageProps) {
  const { t } = useTranslation();
  if (error) console.error(error);

  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="ErrorPage">
      <h1>{t('oops')}</h1>
      <p>{t('sorry')}</p>
      <p>
        <i>
          {(error as Error)?.message || (error as { statusText?: string })?.statusText}
        </i>

        <i>{notFound && t('not-found')}</i>
      </p>

      <Link to="/" onClick={resetBoundary}>
        {t('back-to-home')}
      </Link>
    </div>
  );
}
