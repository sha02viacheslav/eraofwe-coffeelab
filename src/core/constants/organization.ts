import { OrganizationType } from '@enums';

export const OrganizationSlug = {
    [OrganizationType.FACILITATOR]: 'facilitator',
    [OrganizationType.ROASTER]: 'roaster',
    [OrganizationType.ESTATE]: 'estate',
    [OrganizationType.MICRO_ROASTER]: 'micro-roaster',
    [OrganizationType.SEWN_ADMIN]: 'sewn-admin',
    [OrganizationType.HORECA]: 'horeca',
    [OrganizationType.CONSUMER]: 'consumer',
    [OrganizationType.EMPTY]: '',
};

export const OrganizationName = {
    [OrganizationType.ESTATE]: 'Estate',
    [OrganizationType.FACILITATOR]: 'Facilitator',
    [OrganizationType.HORECA]: 'Partner',
    [OrganizationType.MICRO_ROASTER]: 'Micro-roaster',
    [OrganizationType.ROASTER]: 'Roaster',
    [OrganizationType.CONSUMER]: 'Consumer',
    [OrganizationType.SEWN_ADMIN]: 'Admin',
};
