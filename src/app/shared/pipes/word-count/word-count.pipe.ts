import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'wordCount',
})
export class WordCountPipe implements PipeTransform {
    transform(value: string = ''): number {
        const stringData = value
            .replace(/(^\s*)|(\s*$)/gi, '')
            .replace(/[ ]{2,}/gi, ' ')
            .replace(/\n /, '\n');
        return stringData ? stringData.split(' ').length : 0;
    }
}
