import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '@services';
@Component({
    selector: 'app-coffee-lab',
    templateUrl: './coffee-lab.component.html',
    styleUrls: ['./coffee-lab.component.scss'],
})
export class CoffeeLabComponent implements OnInit {
    constructor(public globalsService: GlobalsService) {}

    ngOnInit(): void {}
}
