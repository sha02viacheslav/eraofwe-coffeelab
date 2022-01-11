import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { DestroyableComponent } from '@base-components';
import { environment } from '@env/environment';
import { SquareAdsComponent } from '@modules/coffee-lab/components/square-ads/square-ads.component';
import { I18NService, SEOService } from '@services';
import { getLangRoute } from '@utils';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent extends DestroyableComponent implements AfterViewInit {
    isStaging = environment.needProtect;

    constructor(
        private seoService: SEOService,
        private i8nService: I18NService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object,
        private dialogSrv: DialogService, // public ref: DynamicDialogRef,
    ) {
        super();
        this.seoService.createLinkForCanonicalURL();
        this.document.documentElement.lang = getLangRoute(this.i8nService.currentLang);
        if (this.isStaging) {
            this.seoService.setMetaData('name', 'robots', 'noindex, nofollow');
        }

        this.setDynamicScripts();
    }

    ngAfterViewInit(): void {
        this.document.querySelector('html').addEventListener('pointerleave', (event) => {
            if (event) {
                console.log('called');
                // this.dialogSrv.open(SquareAdsComponent, {});
            } else {
                // this.ref.close(null);
            }
        });
    }

    setDynamicScripts() {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(
                () => {
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
                },
                this.isStaging ? 0 : 7000,
            );
        }
    }
}
