import { RouterSlug } from '@enums';

export const ROUTER_SLUG_ITEMS: string[] = [RouterSlug.QA, RouterSlug.ARTICLE, RouterSlug.RECIPE, RouterSlug.EOW];

export const RouterMap = {
    en: {
        [RouterSlug.QA]: 'qa-forum',
        [RouterSlug.ARTICLE]: 'articles',
        [RouterSlug.RECIPE]: 'coffee-recipes',
        [RouterSlug.EOW]: 'about-era-of-we',
    },
    sv: {
        [RouterSlug.QA]: 'fragor-och-svar',
        [RouterSlug.ARTICLE]: 'artiklar-och-kunskap',
        [RouterSlug.RECIPE]: 'recept-och-bryggningsmetoder',
        [RouterSlug.EOW]: 'om-era-of-we',
    },
    pt: {
        [RouterSlug.QA]: 'qa-forum',
        [RouterSlug.ARTICLE]: 'articles',
        [RouterSlug.RECIPE]: 'coffee-recipes',
        [RouterSlug.EOW]: 'about-era-of-we',
    },
    es: {
        [RouterSlug.QA]: 'qa-forum',
        [RouterSlug.ARTICLE]: 'articles',
        [RouterSlug.RECIPE]: 'coffee-recipes',
        [RouterSlug.EOW]: 'about-era-of-we',
    },
};

export const SlugMap = {
    'qa-forum': RouterSlug.QA,
    articles: RouterSlug.ARTICLE,
    'coffee-recipes': RouterSlug.RECIPE,
    'about-era-of-we': RouterSlug.EOW,
    'fragor-och-svar': RouterSlug.QA,
    'artiklar-och-kunskap': RouterSlug.ARTICLE,
    'recept-och-bryggningsmetoder': RouterSlug.RECIPE,
    'om-era-of-we': RouterSlug.EOW,
};
