import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import type { I18nChangeLocaleConfig } from '../../types';

export function createUseChangeLocale<LocalesKeys>(locales: LocalesKeys[]) {
  return function useChangeLocale(config?: I18nChangeLocaleConfig) {
    const { push } = useRouter();
    const path = usePathname();
    const searchParams = useSearchParams();

    let pathWithoutLocale = path;

    if (config?.basePath) {
      pathWithoutLocale = pathWithoutLocale.replace(config.basePath, '');
    }

    locales.forEach(locale => {
      pathWithoutLocale = pathWithoutLocale.replace(`/${locale}`, '');
    });

    return function changeLocale(newLocale: LocalesKeys) {
      const search = searchParams.toString();

      push(`/${newLocale}${pathWithoutLocale}${search ? `?${search}` : ''}`);
    };
  };
}
