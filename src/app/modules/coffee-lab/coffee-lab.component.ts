import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from '@env/environment';
import { protectPassword } from '@constants';
import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DestroyableComponent } from '@base-components';
@Component({
    selector: 'app-coffee-lab',
    templateUrl: './coffee-lab.component.html',
    styleUrls: ['./coffee-lab.component.scss'],
})
export class CoffeeLabComponent extends DestroyableComponent implements OnInit, AfterViewInit {
    readonly env = environment;
    isMatched = !environment.needProtect;
    showAll = true;

    constructor(@Inject(PLATFORM_ID) private platformId: object) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.showAll = false;
        }
    }

    ngOnInit(): void {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            const scrollEvent = fromEvent(window, 'scroll')
                .pipe(debounceTime(100))
                .pipe(takeUntil(this.unsubscribeAll$))
                .subscribe((res) => {
                    if (window.scrollY > 10) {
                        scrollEvent.unsubscribe();
                        this.showAll = true;
                    }
                });
        }
    }

    onCheckPassword(password: string) {
        this.isMatched = password === protectPassword || !environment.needProtect;
    }
}
