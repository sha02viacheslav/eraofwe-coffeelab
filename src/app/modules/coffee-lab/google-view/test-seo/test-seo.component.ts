import { Component, OnInit } from '@angular/core';
import { SEOService } from '@services';

@Component({
    selector: 'app-test-seo',
    templateUrl: './test-seo.component.html',
    styleUrls: ['./test-seo.component.css'],
})
export class TestSeoComponent implements OnInit {
    constructor(private seoService: SEOService) {}

    ngOnInit(): void {
        this.seoService.setPageTitle('this is test seo page');
        this.seoService.setMetaData('description', 'this is test seo page');
    }
}
