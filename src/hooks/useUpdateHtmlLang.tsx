import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useUpdateHtmlLang = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    document.documentElement.lang = lang === 'enGB' ? 'en' : lang;
    document.body.classList.toggle('ar', lang === 'ar');
  }, [lang]);
};

export default useUpdateHtmlLang;
