import './FlagBtn.scss';
import { LangType } from '@/locales/i18n';
import AR_FlagIcon from '../../Icons/AR_FlagIcon';
import EN_FlagIcon from '../../Icons/EN_FlagIcon';
import FR_FlagIcon from '../../Icons/FR_FlagIcon';

const flags = {
  fr: FR_FlagIcon,
  ar: AR_FlagIcon,
  enGB: EN_FlagIcon,
};

type Props = {
  lang: LangType;
  title: string;
  onClick: () => void;
};

export default function FlagBtn({ lang, title, onClick }: Props) {
  const FlagIcon = flags[lang];

  return (
    <button className="FlagBtn" aria-label={title} title={title} onClick={onClick}>
      <FlagIcon className="flag" />
    </button>
  );
}
