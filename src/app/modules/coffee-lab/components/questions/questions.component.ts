import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CoffeeLabService } from '@services';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
    @Input() questions: any[] = [];
    @Input() viewMode = 'list';
    questionMenuItems: MenuItem[] = [];
    totalRecords = 0;
    displayData: any[] = [];

    constructor(private router: Router, public coffeeLabService: CoffeeLabService) {}

    ngOnInit(): void {
        this.displayData = this.questions.slice(0, 10);
        this.totalRecords = this.questions.length;
    }

    paginate(event: any) {
        this.displayData = this.questions.slice(event.first, event.first + event.rows);
    }
}
