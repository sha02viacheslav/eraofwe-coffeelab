import { AfterViewInit, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import * as Plyr from 'plyr';

@Component({
    selector: 'app-video-player',
    templateUrl: './video-player.component.html',
    styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
    src: SafeResourceUrl;

    player: any;

    constructor(private sanitizer: DomSanitizer, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

    ngOnInit() {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.data.src);
    }

    ngAfterViewInit() {
        this.player = new Plyr('#player');
        this.player.on('ready', (event) => {
            event.detail.plyr.play();
        });
    }

    close() {
        this.player.destroy();
        this.ref.close();
    }
}
