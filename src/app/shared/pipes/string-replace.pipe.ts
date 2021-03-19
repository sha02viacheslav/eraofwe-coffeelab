import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'strReplace',
})
export class StringReplacePipe implements PipeTransform {
    transform(value: string, regexValue: string, replaceValue: string): string {
        if (!value) {
            return '';
        }

        const regex = new RegExp(regexValue, 'g');
        return value.toString().replace(regex, replaceValue);
    }
}
