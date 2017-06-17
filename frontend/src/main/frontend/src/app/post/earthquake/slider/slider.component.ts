import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'article-earthquake-slider',
    templateUrl: 'slider.component.html',
    styleUrls: ['slider.component.css'],
    encapsulation: ViewEncapsulation.None //no shoadow DOM.
})

export class SliderComponent implements OnInit {
    private show: boolean = false;
    private defaultYearRange;
    private defScaleRange;
    private sliderYearConfig: any;
    private sliderScaleConfig: any;
    private region: string = 'tw';

    constructor() {
    }

    ngOnInit() {
        this.setYearNouiSlider();
        this.setScaleNouiSlider();

        this.loadingHTML();
    }

    /**
    * monitor the user slecet in slider bar
    */
    onYearChange(range: number[]): void {
        console.log(range);
    }

    onScaleChange(scale: number[]): void {
        console.log(scale);
    }

    onRegionChange(region: string): void {
        //when user dobubel click the same bottom will return the undefined
        //thus, dont pass the value to this.region
        if (region == undefined) {
        } else {
            this.region = region;
        }
        console.log(this.region);
    }


    /**
     * set the all values of nouiSlider
     */
    setYearNouiSlider(): void {
        this.defaultYearRange = [1995, 2017];
        this.sliderYearConfig = {
            behaviour: 'drag',
            connect: true,
            margin: 0,
            step: 1,
            // limit: 5, // NOTE: overwritten by [limit]="10"
            range: {
                min: 1995,
                max: 2017
            },
            pips: {
                mode: 'count',
                values: 6,
                density: 5,
                stepped: true
            }
        };
    }

    setScaleNouiSlider(): void {
        this.defScaleRange = [1, 7];
        this.sliderScaleConfig = {
            behaviour: 'drag',
            connect: true,
            margin: 0,
            step: 1,
            // limit: 5, // NOTE: overwritten by [limit]="10"
            range: {
                min: 1,
                max: 7
            },
            pips: {
                mode: 'count',
                values: 7,
                density: 100,
                stepped: true
            }
        };
    }//..setNouiSlider
    loadingHTML() {
        //when show = true, open class in html, and go to loading properties on nouislider
        this.show = true;
    }
}
