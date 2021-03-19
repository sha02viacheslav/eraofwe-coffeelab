import { Pipe, PipeTransform } from '@angular/core';
import { FileType } from '@enums';

@Pipe({
    name: 'fileIcon',
})
export class FileIconPipe implements PipeTransform {
    transform(type: FileType): string {
        switch (type) {
            case FileType.FOLDER: {
                return 'assets/images/folder.svg';
            }
            case FileType.DOCUMENT: {
                return 'assets/images/pdf.svg';
            }
            case FileType.CSV: {
                return 'assets/images/csv.svg';
            }
            case FileType.VIDEO: {
                return 'assets/images/video.svg';
            }
            case FileType.IMAGE: {
                return 'assets/images/image.svg';
            }
        }
    }
}
