import { LANGUAGE_PREFIXES } from '@constants';

export function getLangRoute(language: string) {
    return language === 'pt' ? 'pt-br' : language;
}

export const extractLangPrefix = (str: string = ''): string => {
    const matches = str.match(/\/([a-z]{2}(-[a-z]{2})?)(\/|$)/);
    const lang = matches && LANGUAGE_PREFIXES.indexOf(matches[1]) !== -1 ? matches[1] : '';
    return lang;
};
