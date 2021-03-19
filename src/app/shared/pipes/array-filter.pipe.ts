import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'arrayFilter',
})
export class ArrayFilterPipe implements PipeTransform {
    transform(value: Array<any>, searchString: string, property: string = ''): Array<any> {
        searchString = searchString || '';
        searchString = searchString.trim();

        if (!searchString) {
            return value;
        }

        if (property) {
            return value.filter((x) => x[property] === searchString);
        } else {
            return value.filter((x) => x === searchString);
        }
    }
}
