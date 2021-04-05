import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-health-check',
    templateUrl: './health-check.component.html',
    styleUrls: ['./health-check.component.scss'],
})
export class HealthCheckComponent implements OnInit {
    object: any = { 'lab-status': '200 ok', message: 'ok' };
    constructor() {}

    ngOnInit(): void {}
}
