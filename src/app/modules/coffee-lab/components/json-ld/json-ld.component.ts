import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'app-json-ld',
    templateUrl: './json-ld.component.html',
    styleUrls: ['./json-ld.component.scss'],
})
export class JsonLdComponent implements OnInit, OnChanges {
    html: SafeHtml;
    @Input() jsonLD: any;

    constructor(private sanitizer: DomSanitizer) {}
    ngOnChanges(changes: SimpleChanges): void {
        this.html = this.getSafeHTML(this.jsonLD);
    }

    ngOnInit(): void {}

    getSafeHTML(jsonLD: { [key: string]: any }): SafeHtml {
        const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
        const html = `<script type="application/ld+json">${json}</script>`;
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
