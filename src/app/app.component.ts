import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { I18NService, SEOService } from '@services';
import { environment } from '@env/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { getLangRoute } from '@utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    isStaging = environment.needProtect;
    constructor(
        private seoService: SEOService,
        private i8nService: I18NService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object,
    ) {
        this.seoService.createLinkForCanonicalURL();
        this.document.documentElement.lang = getLangRoute(this.i8nService.currentLang);
        if (this.isStaging) {
            this.seoService.setMetaData('name', 'robots', 'noindex, nofollow');
        }

        this.setDynamicScripts();
    }

    setDynamicScripts() {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                const dynamicScripts = [];
                if (environment.production) {
                    if (environment.needBugherd) {
                        dynamicScripts.push('https://www.bugherd.com/sidebarv2.js?apikey=y5kbdd1ahghgywnjmyw7lg');
                    }
                    dynamicScripts.push(
                        'https://cmp.osano.com/6olZFSThsdZWqs/d3243605-8fd0-446a-9b25-a172e9ae3d67/osano.js',
                    );
                    dynamicScripts.push('https://jscloud.net/x/13391/inlinks.js');
                    dynamicScripts.push('https://www.googletagmanager.com/gtm.js?id=GTM-KZWL6RR');
                }

                for (const value of dynamicScripts) {
                    const node = this.document.createElement('script');
                    node.src = value;
                    node.type = 'text/javascript';
                    node.async = true;
                    this.document.getElementsByTagName('head')[0].appendChild(node);
                }
            }, 7000);
        }
    }
}
