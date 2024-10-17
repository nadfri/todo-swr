import './FlagBtnSelector.scss';
import { useRef } from 'react';
import FlagBtn from '../FlagBtn/FlagBtn';
import useClickOutside from '@/hooks/useClickOutside';
import { langs, LangType } from '@/locales/i18n';
import { moveToLastInArray } from '@/utils/moveToLastInArray';
import { useTranslation } from 'react-i18next';

type Props = {
  closeSelector: () => void;
};

export default function FlagBtnSelector({ closeSelector }: Props) {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const lang = i18n.language as LangType;

  const langsByOrder = moveToLastInArray(langs, lang);

  const handleClose = () => {
    ref.current?.classList.replace('scaleToOne', 'scaleToZero');
    setTimeout(closeSelector, 200);
  };

  const handleChangeLang = (lang: LangType) => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  useClickOutside(ref, handleClose);

  return (
    <div className="FlagBtnSelector scaleToOne" ref={ref}>
      {langsByOrder.map((lang) => (
        <FlagBtn
          key={lang}
          lang={lang}
          onClick={() => handleChangeLang(lang)}
          title={t(`select-${lang}`)}
        />
      ))}
    </div>
  );
}
