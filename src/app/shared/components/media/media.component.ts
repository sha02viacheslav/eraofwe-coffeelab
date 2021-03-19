import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss'],
})
export class MediaComponent implements OnInit {
    fileUrl = '';
    @Input() title = '';
    @Input() btnCenter = false;
    isVideo = false;
    @Input()
    set url(value: string) {
        this.fileUrl = value;
        if (value) {
            const ext = value.split('.').pop();
            if (ext === 'mp4') {
                this.isVideo = true;
            } else {
                this.isVideo = false;
            }
        }
    }

    constructor(public dialogSrv: DialogService, private cdr: ChangeDetectorRef) {}

    ngOnInit() {}

    openVideo() {
        this.dialogSrv.open(VideoPlayerComponent, {
            data: {
                src: this.fileUrl,
            },
            showHeader: false,
        });
    }
}
