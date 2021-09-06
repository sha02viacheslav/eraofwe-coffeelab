import { Component, OnInit, Inject } from '@angular/core';
import { CoffeeLabService, GlobalsService, SEOService } from '@services';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';
import { SeoDescription, SeoTitle } from '@constants';
import { RouterSlug } from '@enums';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../../components/signup-modal/signup-modal.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-era-of-we',
    templateUrl: './era-of-we.component.html',
    styleUrls: ['./era-of-we.component.scss'],
})
export class EraOfWeComponent implements OnInit {
    data: any[] = [];
    isLoading = false;
    destroy$: Subject<boolean> = new Subject<boolean>();
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private coffeeLabService: CoffeeLabService,
        private globalsService: GlobalsService,
        private seoService: SEOService,
        private toastService: ToastrService,
        private router: Router,
        public dialogSrv: DialogService,
    ) {}

    ngOnInit(): void {
        this.setSEO();
        this.getData();
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            is_era_of_we: true,
        };

        this.coffeeLabService
            .getForumList('article', params, this.coffeeLabService.currentForumLanguage)
            .subscribe((res) => {
                if (res.success) {
                    this.data = res.result ? res.result : [];

                    this.data = res.result ?? [];
                    this.data.map((item) => {
                        item.content = this.globalsService.getJustText(item.content);
                        item.cardType = 'forum';
                        return item;
                    });
                    const joinCard = {
                        cardType: 'joinCard',
                    };
                    if (this.data.length < 3) {
                        this.data.push(joinCard);
                    } else {
                        this.data.splice(2, 0, joinCard);
                    }
                } else {
                    this.toastService.error('Cannot get Articles data');
                }
                this.isLoading = false;
            });
    }

    setSEO() {
        const title = SeoTitle[this.coffeeLabService.currentForumLanguage][RouterSlug.EOW];
        const description = SeoDescription[this.coffeeLabService.currentForumLanguage][RouterSlug.EOW];
        this.seoService.setSEO(title, description);
    }

    getLink(item) {
        const url = `/${item.language}/articles/${item.slug}`;
        return item.cardType === 'forum' ? url : `/${this.coffeeLabService.currentForumLanguage}/articles`;
    }

    onFocus(event) {
        event.stopPropagation();
        event.preventDefault();
        this.dialogSrv.open(SignupModalComponent, {
            showHeader: false,
            styleClass: 'signup-dialog',
        });
    }
}
