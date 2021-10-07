import { Pipe, PipeTransform } from '@angular/core';
import { OrganizationType } from '@enums';
import { getOrgName } from '@utils';

@Pipe({
    name: 'orgType',
})
export class OrgTypePipe implements PipeTransform {
    transform(orgType: OrganizationType): string {
        return getOrgName(orgType);
    }
}
