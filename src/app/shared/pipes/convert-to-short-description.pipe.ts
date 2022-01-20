import { Pipe, PipeTransform } from '@angular/core';
import { getWordCount } from '@utils';

@Pipe({
    name: 'convertToShortDescription',
})
export class ConvertToShortDescriptionPipe implements PipeTransform {
    transform(description: string, count: number, seperator?: string): string {
        const plainString = getWordCount(description);
        const wordCount = plainString?.split(seperator ? seperator : ' ').length;
        if (wordCount <= count) {
            return description;
        } else {
            return (
                description
                    ?.split(seperator ? seperator : ' ')
                    .slice(0, count)
                    .join(' ') + '...'
            );
        }
    }
}
