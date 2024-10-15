import { useNavigate } from 'react-router-dom';
import './BackBtn.scss';
import { useTranslation } from 'react-i18next';

export default function BackBtn() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <button className="BackBtn" onClick={handleClick} aria-label={t('back')}>
      <span className="arrow">↼</span> <span>{t('back')}</span>
    </button>
  );
}
