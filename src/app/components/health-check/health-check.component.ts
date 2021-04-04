import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-health-check',
    templateUrl: './health-check.component.html',
    styleUrls: ['./health-check.component.scss'],
})
export class HealthCheckComponent implements OnInit {
    object: any = { status: '200 ok', message: 'ok' };
    constructor(private coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.coffeeLabService.healthCheck().subscribe((res: any) => {
            this.object = res;
        });
    }
}
