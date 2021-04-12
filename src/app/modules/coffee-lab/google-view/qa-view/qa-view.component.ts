import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-qa-view',
    templateUrl: './qa-view.component.html',
    styleUrls: ['./qa-view.component.scss'],
})
export class QaViewComponent implements OnInit {
    relatedData: any[] = [];
    detailsData: any;
    idOrSlug: string;
    loading = false;

    constructor(
        private coffeeLabService: CoffeeLabService,
        public router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.activatedRoute.params.subscribe((params) => {
            this.idOrSlug = params.idOrSlug;
            this.getQaList();
            if (this.idOrSlug) {
                this.getDetails();
            }
        });
    }

    ngOnInit(): void {}

    getQaList() {
        this.coffeeLabService.getForumList('question').subscribe((res: any) => {
            if (res.success) {
                this.relatedData = res.result.questions
                    .filter((item) => item.id !== this.idOrSlug && item.slug !== this.idOrSlug)
                    .slice(0, 5);
                if (!this.idOrSlug) {
                    this.router.navigate([`/coffee-lab/qa/${res.result.questions[0].id}`]);
                }
            }
        });
    }

    getDetails() {
        this.loading = true;
        this.coffeeLabService.getForumDetails('question', this.idOrSlug).subscribe((res: any) => {
            if (res.success) {
                this.detailsData = res.result;
            }
            this.loading = false;
        });
    }

    getAnswer(id) {
        this.coffeeLabService.getForumDetails('answer', id).subscribe((res: any) => {
            if (res.success) {
                const temp = this.detailsData.answers.map((item) => {
                    console.log(item.id, res.result.original_details.id);
                    if (item.id === res.result.original_details.id) {
                        item = res.result;
                    }
                    return item;
                });
                this.detailsData.answers = temp;
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
        this.router.navigate([`/coffee-lab/qa/${item.id}`]);
    }

    onShare(postItem) {}
    onSavePost(postItem) {}
    onTranslate(postItem) {}
}
