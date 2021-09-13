import { Pipe, PipeTransform } from '@angular/core';
import { getCountry } from '@utils';

@Pipe({
    name: 'country',
})
export class CountryPipe implements PipeTransform {
    constructor() {}
    transform(value: string): string {
        return getCountry(value)?.name || 'NA';
    }
}
