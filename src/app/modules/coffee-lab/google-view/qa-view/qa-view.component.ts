import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-qa-view',
    templateUrl: './qa-view.component.html',
    styleUrls: ['./qa-view.component.scss'],
})
export class QaViewComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    slug: string;
    id: string;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.slug = params.slug;
            this.id = params.id;
            this.getQaList();
            if (this.slug || this.id) {
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {}

    getQaList() {
        this.coffeeLabService.getForumList('question').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result.questions.filter(
                    (item) => item.id !== this.id || item.slug !== this.slug,
                );
                if (!this.slug && !this.id) {
                    const navigationExtras: NavigationExtras = {
                        queryParams: {
                            id: res.result.questions[0].id,
                        },
                    };
                    this.router.navigate(['/coffee-lab/qa'], navigationExtras);
                }
            }
        });
    }

    getDetails() {
        const idOrSlug = this.slug ?? this.id;
        this.coffeeLabService.getForumDetails('question', idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
            }
        });
    }

    getMenuItemsForItem(item) {
        const items = [
            {
                label: 'Share',
                command: () => {
                    this.onShare(item);
                },
            },
            {
                label: 'Save Post',
                command: () => {
                    this.onSavePost(item);
                },
            },
            {
                label: 'Translate answer',
                command: () => {
                    this.onTranslate(item);
                },
            },
        ];
        return [{ items }];
    }

    onGoRelatedQuestion(item) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                id: item.id,
            },
        };
        console.log(item);
        this.router.navigate(['/coffee-lab/qa'], navigationExtras);
    }

    onShare(postItem) {}
    onSavePost(postItem) {}
    onTranslate(postItem) {}
}
