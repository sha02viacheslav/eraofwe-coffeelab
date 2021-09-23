import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared';

import { ForumMenuComponent } from './forum-menu/forum-menu.component';
import { JoinCommunityComponent } from './join-community/join-community.component';
import { JsonLdComponent } from './json-ld/json-ld.component';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown.component';
import { LikeDividerComponent } from './like-divider/like-divider.component';
import { PublishForumComponent } from './publish-forum/publish-forum.component';
import { SearchForumComponent } from './search-forum/search-forum.component';
import { SignupModalComponent } from './signup-modal/signup-modal.component';
import { TranslationDropdownComponent } from './translation-dropdown/translation-dropdown.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserHeaderComponent } from './user-header/user-header.component';

const COMPONENTS = [
    ForumMenuComponent,
    JoinCommunityComponent,
    JsonLdComponent,
    LanguageDropdownComponent,
    LikeDividerComponent,
    PublishForumComponent,
    SearchForumComponent,
    SignupModalComponent,
    TranslationDropdownComponent,
    UserDetailComponent,
    UserHeaderComponent,
];

@NgModule({
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    imports: [CommonModule, SharedModule],
})
export class CoffeeLabComponentsModule {}
