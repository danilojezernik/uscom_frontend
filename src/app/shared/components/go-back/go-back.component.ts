import {Component} from '@angular/core';
import {Location} from '@angular/common';


@Component({
    selector: 'app-go-back',
    templateUrl: './go-back.component.html'
})
export class GoBackComponent {
    constructor(
        private location: Location
    ) {
    }

    // Method to navigate back
    goBack() {
        this.location.back()
    }
}
