import './ToggleLang.scss';
import { useState } from 'react';
import i18n, { LangType } from '@/locales/i18n';
import FlagBtn from './FlagBtn/FlagBtn';
import { useTranslation } from 'react-i18next';
import FlagBtnSelector from './FlagBtnSelector/FlagBtnSelector';

export default function ToggleLang() {
  const { t } = useTranslation();
  const [isSelectorOpen, setSelectorOpen] = useState(false);

  return (
    <div className="ToggleLang">
      <FlagBtn
        lang={i18n.language as LangType}
        onClick={() => setSelectorOpen(true)}
        title={t('select-lang')}
      />

      {isSelectorOpen && (
        <FlagBtnSelector closeSelector={() => setSelectorOpen(false)} />
      )}
    </div>
  );
}
