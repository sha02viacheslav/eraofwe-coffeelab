import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertToShortDescription',
})
export class ConvertToShortDescriptionPipe implements PipeTransform {
    transform(description: string, count: number): string {
        description = description.trim();
        const wordCount = description.split(' ').length;
        if (wordCount <= count) {
            return description;
        } else {
            return description.split(' ').slice(0, count).join(' ') + '...';
        }
    }
}
