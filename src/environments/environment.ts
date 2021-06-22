// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    apiURL: 'https://fed-api.sewnstaging.com',
    wsEndpoint: 'wss://messaging.sewnstaging.com/v1',
    encryptionKey: 'sewen_secrete_key',
    ssoWeb: 'http://localhost:4300',
    estatesWeb: 'https://estates.sewnstaging.com',
    facilitatorWeb: 'https://operator.sewnstaging.com',
    roasterWeb: 'https://roaster.sewnstaging.com',
    microRoasterWeb: 'https://microroaster.sewnstaging.com',
    horecaWeb: 'https://partners.sewnstaging.com',
    adminWeb: 'https://admin.sewnstaging.com',
    agroUrl: 'https://api.agromonitoring.com/agro/1.0/',
    estateBrandProfileUrl: 'https://www.sewnstaging.com/estate',
    roasterBrandProfileUrl: 'https://www.sewnstaging.com/roaster',
    coffeeLabWeb: 'http://localhost:4200/coffee-lab/',
    supportEmailAddress: 'support@eraofwe.com',
    termsUserUrl: 'https://support.eraofwe.com/en/kb/articles/general-terms-conditions-user',
    termsEntityUrl: 'https://support.eraofwe.com/en/kb/articles/general-terms-conditions-legal-entity',
    privacyPolicyUrl: 'https://support.eraofwe.com/en/kb/articles/privacy-policy',
    cookiePolicyUrl: 'https://support.eraofwe.com/en/kb/articles/cookie-policy',
    production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
