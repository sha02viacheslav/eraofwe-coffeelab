import { OrganizationType } from '@enums';

export interface UserProfile {
    about_me: string;
    banner_url: string;
    certificates: any;
    city: string;
    converse_languages: string[];
    country: string;
    firstname: string;
    id: number;
    lastname: string;
    organization_city: string;
    organization_country: string;
    organization_name: string;
    organization_type: OrganizationType;
    profile_image_thumb_url: string;
    profile_image_url: string;
    slug: string;
}
