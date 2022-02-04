import { Component, Input, OnInit } from '@angular/core';
import { PostType } from '@enums';
import { getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-popular-posts',
    templateUrl: './popular-posts.component.html',
    styleUrls: ['./popular-posts.component.scss'],
})
export class PopularPostsComponent implements OnInit {
    readonly PostType = PostType;
    @Input() relatedData: any[] = [];
    @Input() type: string;

    constructor(private dialogSrv: DialogService) {}

    ngOnInit(): void {}

    onFocus() {
        this.dialogSrv.open(SignupModalComponent, {});
    }

    onRealtedRoute(langCode: string, slug: string) {
        return `/${getLangRoute(langCode)}/${this.type === 'article' ? 'articles' : 'coffee-recipes'}/${slug}`;
    }
}
