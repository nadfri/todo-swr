import './Header.scss';
import { Link } from 'react-router-dom';
import CounterTask from '../CounterTask/CounterTask';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="Header">
      <Link to="/" className="header-link">
        🚀 <span className="header-title">{t('header-title')}</span>
      </Link>

      <CounterTask />
    </header>
  );
}
