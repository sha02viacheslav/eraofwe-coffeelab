import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileName',
})
export class FileNamePipe implements PipeTransform {
    transform(value: string = '', limit: number = null): string {
        if (limit) {
            const fileName = value.split('/').pop();
            const ext = fileName.split('.').pop();
            const name = fileName.split('.').slice(0, -1).join('.').slice(0, limit);
            return name + '.' + ext;
        }
        return value.split('/').pop();
    }
}
