import { Pipe, PipeTransform } from '@angular/core';
import { GlobalsService } from '@services';

@Pipe({
    name: 'dateAgoReplace',
})
export class DateAgoReplacePipe implements PipeTransform {
    constructor(private globalService: GlobalsService) {}
    transform(value: string): string {
        if (!value) {
            return '';
        }
        const [amount, unit] = value.split(' ');
        let suffix = amount;
        if (isNaN(+amount)) {
            suffix = this.globalService.languageJson[amount];
        }
        return `${suffix ?? amount} ${this.globalService.languageJson[unit]}`;
    }
}
