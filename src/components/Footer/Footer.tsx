import './Footer.scss';
import { useTranslation } from 'react-i18next';
import GithubIcon from '../Icons/GithubIcon';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import ToggleLang from '../ToggleLang/ToggleLang';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="Footer">
      <a target="_blank" href="https://github.com/nadfri/todo-swr" title={t('to-github')}>
        NadfriJS @2024 <GithubIcon className="github" />
      </a>

      <div className="footer-toggle-container">
        <ToggleLang />
        <ToggleTheme />
      </div>
    </footer>
  );
}
