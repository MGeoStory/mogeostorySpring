import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'app/services/frontend/observable.service';
import { GraphFrameService } from 'app/services/frontend/graph-frame.service';
import { GraphCanvasService } from 'app/services/frontend/graph-canvas.service';
import * as d3 from 'd3';
// import { countyIdTW } from 'app/services/frontend/countyid-tw.service';
let gc = new GraphCanvasService();
let canvas: d3.Selection<any, any, any, any>;
let valueOfCounty: Object[] = [];
let isFirstLoading: boolean = true;

@Component({
    selector: 'post-disposable-income-bar-graph',
    templateUrl: 'bar-graph.component.html',
    styleUrls: ['bar-graph.component.css']
})

export class BarGraphComponent implements OnInit {

    private graphTitle: string = "worked";
    constructor(private obs: ObservableService) { }

    ngOnInit() {
        isFirstLoading = true;
        canvas = gc.createCanvas('bar-canvas', '#bar-graph');

        this.obs.observedString.subscribe(
            (userClicked: string[]) => {
                console.log(userClicked[0]);
            }
        )
        this.obs.observedData.subscribe(
            (dbData: Object[]) => {
                if (isFirstLoading) {
                    valueOfCounty = this.simplifiedDbData(dbData);
                    this.drawColumnGraph(valueOfCounty);
                    isFirstLoading = false;
                } else {
                }

            }
        )
    }//.. ngOnInit

    drawColumnGraph(valueOfCounty: Object[]): void {
        console.log(valueOfCounty);
        let maxOfData = valueOfCounty[0]['value'];
        let names = [];
        // for var


    }//.. drawColumnGraph

    /**
     * simplefied and sort(descending) DbData to obect[{key:countyID, value:value}]
     * @param dbData 
     */
    simplifiedDbData(dbData: Object[]) {
        let newObject: Object[] = [];
        for (let key in dbData[0]) {
            if (key != 'twall' && key != 'year' && key != '_links') {
                newObject.push({ key: key.toUpperCase(), value: dbData[0][key] });
            }
        }
        newObject.sort((x, y) => {
            return d3.descending(x['value'], y['value']);
        })

        return newObject;
    }
}