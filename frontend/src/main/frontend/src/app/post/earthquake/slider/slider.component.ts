import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EarthquakeService } from 'app/services/backend/earthquake.service';

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
    private range: number[] = [1995, 2017];
    private scale: number[] = [1, 7]
    private region: string = 'A';
    private geoData: Object;


    constructor(private es: EarthquakeService) {
    }

    ngOnInit() {
        this.setYearNouiSlider();
        this.setScaleNouiSlider();
        this.loadingHTML();

        this.es.getEarthquakesG().subscribe(
            (geoData) => {
                console.log(geoData);
                //pushTo
            }
        )
    }

    /**
    * monitor the user slecet in slider bar
    */
    onYearChange(range: number[]): void {
        this.range = range;
        this.reloadData(true);
    }

    onScaleChange(scale: number[]): void {
        this.scale = scale;
        this.reloadData(false);
    }

    onRegionChange(region: string): void {
        //when user dobubel click the same bottom will return the undefined
        //thus, dont pass the value to this.region
        if (region == undefined) {
        } else {
            this.region = region;
        }
        this.reloadData(false);
    }

    /**reload:boolean
    true=> use year to sql and filter by this.scale and this.region
    */
    reloadData(reload: boolean) {
        if (reload) {
            //same year is workable too.
            this.es.getEarthquakeGBetweenYears(this.range[0], this.range[1]).subscribe(
                (geoData) => {
                    this.geoData = geoData;
                    // console.log(this.geoData);
                    this.filterDataAndPush(this.geoData, this.scale, this.region);
                }
            );
        } else {
            this.filterDataAndPush(this.geoData, this.scale, this.region);
            // console.log(this.geoData);
        }
    }

    filterDataAndPush(geoData: Object, scale: number[], region: string): void {
        let push:Object;
        console.log(geoData);
        
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
