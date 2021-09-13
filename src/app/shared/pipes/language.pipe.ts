import { Pipe, PipeTransform } from '@angular/core';
import { getLanguage } from '@utils';

@Pipe({
    name: 'language',
})
export class LanguagePipe implements PipeTransform {
    constructor() {}
    transform(value: string): string {
        return getLanguage(value)?.name;
    }
}
