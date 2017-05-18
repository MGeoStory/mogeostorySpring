import { Component, OnInit, ViewChild } from '@angular/core';
import { SliderBarComponent } from 'app/post/disposable-income/slider-bar/slider-bar.component';
@Component({
    selector: 'post-disposable',
    templateUrl: 'disposable-income.component.html'
})

export class DisposableIncomeComponent implements OnInit {
    @ViewChild(SliderBarComponent) sbc: SliderBarComponent;

    constructor() { }

    ngOnChanges() {
        // console.log("income-ngOnChanges");
    }

    ngAfterViewInit() {
        // console.log("income-ngAfterViewInit");
    }

    ngAfterViewChecked() {
        // console.log("income-ngAfterViewChecked");
    }

    ngOnInit() {
        // console.log("income-ngOnInit");
        // this.sbc.sendData();
    };


}