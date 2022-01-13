import { COUNTRY_LIST, LANGUAGES, OrganizationName } from '@constants';
import { OrganizationType } from '@enums';
import { Country, Language } from '@models';

export const getOrgName = (orgType: OrganizationType | string): string => {
    const type = orgType?.toLowerCase() as OrganizationType;
    return OrganizationName[type] || '';
};

export const getCountry = (isoCode: string): Country => {
    if (isoCode) {
        return COUNTRY_LIST.find((c: any) => c.isoCode === isoCode.toUpperCase());
    }
    return null;
};

export const getLanguage = (code: string): Language => {
    if (code) {
        return LANGUAGES.find((c: any) => c.value === code.toLowerCase());
    }
    return null;
};

export const removeImages = (content: string): string => {
    while (1) {
        const img = RegExp(/<img.*?(src)="(.*?)"[^>]*>/g).exec(content);
        if (!img) {
            break;
        }
        content = content.replace(img[0], '');
    }

    return content;
};

export function getCookie(name: string) {
    const ca: Array<string> = decodeURIComponent(document.cookie).split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
    return '';
}
