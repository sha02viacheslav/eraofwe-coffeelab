import { Component, OnInit } from '@angular/core';
import { CoffeeLabService } from '@services';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-era-of-we',
    templateUrl: './era-of-we.component.html',
    styleUrls: ['./era-of-we.component.scss'],
})
export class EraOfWeComponent implements OnInit {
    data: any[] = [];
    isLoading = false;
    constructor(private coffeeLabService: CoffeeLabService, private toastService: ToastrService) {}

    ngOnInit(): void {
        this.getData();
    }

    getData(): void {
        this.isLoading = true;
        const params = {
            is_era_of_we: true,
        };

        this.coffeeLabService
            .getForumList('article', params, this.coffeeLabService.currentForumLanguage)
            .subscribe((res) => {
                if (res.success) {
                    this.data = res.result ? res.result.slice(0, 2) : [];
                } else {
                    this.toastService.error('Cannot get Articles data');
                }
                this.isLoading = false;
            });
    }
}
