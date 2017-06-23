import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'app/services/frontend/observable.service';
import { EarthquakeService } from 'app/services/backend/earthquake.service';
import * as d3 from 'd3';

@Component({
    selector: 'earthquake-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css']
})

export class TableComponent implements OnInit {
    private graphTitle: string = `在地圖上點選縣市即可查看各縣市調查資料！`;


    private showTableIs: boolean = false;

    constructor(private os: ObservableService, private es: EarthquakeService) { }

    ngOnInit() {
        this.os.observedData.subscribe(
            (data) => {
                console.log(this.simplyData(data));

                this.graphTitle = `在地圖上點選縣市即可檢視各縣市家戶所得分配情形！`;
            });
    }

    simplyData(data: Object[]): Object[] {
        let temp: Object[];
        let result: Object[] = [];



        data.sort((x, y) => {
            return d3.descending(x['scale'], y['scale'])
        });


        temp = data.slice(0, 7);

        temp.forEach((d) => {
            this.es.getEarthquakeById(d['id']).subscribe(
                (data) => {
                    result.push(data);
                    // console.log(data);
                })
        })
        // console.log(temp);

        // console.log(result);
        return result;
    }

    setValuesOfTable(data: Object[]) {
    }
}