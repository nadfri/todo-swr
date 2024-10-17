import { formatDistanceToNow } from 'date-fns';
import { enGB } from 'date-fns/locale';
import i18n, { dateFnsLocales, LangType } from '@/locales/i18n';

export function formatDateByDistance(date: Date): string {
  const locale = dateFnsLocales[i18n.language as LangType] || enGB;

  return formatDistanceToNow(date, { locale, addSuffix: true });
}
