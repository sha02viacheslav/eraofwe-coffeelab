import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '@env/environment';
import { CoffeeLabService, I18NService } from '@services';
import { RouterMap } from '@constants';
import { RouterSlug } from '@enums';

@Component({
    selector: 'app-join-community',
    templateUrl: './join-community.component.html',
    styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
    readonly RouterMap = RouterMap;
    readonly RouterSlug = RouterSlug;
    ssoWeb = environment.ssoWeb;
    isStaging = environment.needProtect;
    questionList = [
        {
            question:
                'Hey, could someone explain to me more about Omni roasts and the benefits from a business (Roaster) perspective?',
        },
        {
            question:
                'Hi Everyone, Our family have estates at Sumatera, Indonesia. Is there any buyers here who like to try our sample?',
        },
        {
            question: 'What are coffee flavour profiles? How many profiles can a coffee have?',
        },
        {
            question: 'What are coffee flavour profiles? How many profiles can a coffee have?',
        },
        {
            question: 'What are coffee flavour profiles? How many profiles can a coffee have?',
        },
    ];
    constructor(
        @Inject(DOCUMENT) private document: Document,
        public coffeeLabService: CoffeeLabService,
        public i18nService: I18NService,
    ) {}

    ngOnInit(): void {}

    gotoSignup() {
        this.document.location.href = `${environment.ssoWeb}/sign-up`;
    }
}
