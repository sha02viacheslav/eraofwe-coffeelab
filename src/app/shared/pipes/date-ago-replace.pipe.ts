import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'dateAgoReplace',
})
export class DateAgoReplacePipe implements PipeTransform {
    constructor(private translateService: TranslateService) {}
    transform(value: string, isAgo?: boolean): string {
        if (!value) {
            return '';
        }
        const [amount, unit] = value.split(' ');
        let suffix = amount;
        if (isNaN(+amount)) {
            suffix = this.translateService.instant(amount);
        }
        return `${suffix ?? amount} ${this.translateService.instant(unit)} ${
            !isAgo ? this.translateService.instant('ago') : ''
        }`;
    }
}
