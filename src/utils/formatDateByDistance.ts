import { formatDistanceToNow } from 'date-fns';
import { enGB, fr } from 'date-fns/locale';

export function formatDateByDistance(date: Date): string {
  const language = navigator.language;

  const locale = language.includes('fr') ? fr : enGB;

  return formatDistanceToNow(date, { locale });
}
