import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'amTimeAgo',
})
export class AmTimeAgoPipe implements PipeTransform {
    constructor() {}
    transform(value: string | Date): string {
        return moment(new Date(value), 'YYYYMMDD').fromNow() || '';
    }
}
