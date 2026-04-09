import { useParams } from 'react-router-dom';
import type { Language } from '../translations';

export function useLanguage(): Language {
  const { lang } = useParams<{ lang: string }>();
  return lang === 'it' ? 'IT' : 'EN';
}
