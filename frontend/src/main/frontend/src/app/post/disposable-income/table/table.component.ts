import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'app/services/frontend/observable.service';
import { PostDisposableService } from 'app/services/backend/post-disposable.service';
import { GraphCanvasService } from 'app/services/frontend/graph-canvas.service';
import { CountyIdTWService } from 'app/services/frontend/countyid-tw.service';
import * as d3 from 'd3';

@Component({
    selector: 'post-disposable-income-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css']
})

export class TableComponent implements OnInit {
    private canvas: d3.Selection<any, any, any, any>;
    private gc = new GraphCanvasService();
    private graphTitle: string;

    //income = disposable + nonDisposable
    //disposable = consume + save
    private income: number = -1;
    private disposable: number = -1;
    private nonDisposable: number = -1;
    private consume: number = -1;
    private save: number = -1;

    private incomeC: string = "-1";
    private disposableC: string = "-1";
    private nonDisposableC: string = "-1";
    private consumeC: string = "-1";
    private saveC: string = "-1";

    private incomeP: string = "-1";
    private disposableP: string = "-1";
    private nonDisposableP: string = "-1";
    private consumeP: string = "-1";
    private saveP: string = "-1";

    private showTableIs: boolean = false;

    constructor(private os: ObservableService, private pds: PostDisposableService, private cid: CountyIdTWService) { }

    ngOnInit() {
        this.os.observedAny.subscribe(
            (data) => {
                this.pds.getPostDisposableByYearAndCityId(data[1], data[0]).subscribe((data) => {
                    let cityName = this.cid.getCountyNameById(data[0]["cityId"]);
                    let year = data[0]["year"];
                    this.graphTitle = `${year}年-${cityName}每戶調查資料：`
                    this.setValuesOfTable(data);
                    this.showTableIs = true;

                });
            })

        //if year of use seleced is changed, then dont show the tables
        this.os.observedNumber.subscribe(
            (data) => {
                this.showTableIs = false;
                this.graphTitle = `在地圖上點選縣市即可查看各縣市調查資料！`;
            }
        )
    }

    setValuesOfTable(data: Object[]) {
        let percent = d3.format(".1%");
        let comma = d3.format(",");
        this.income = data[0]["income"];
        this.disposable = data[0]["disposable"];
        this.nonDisposable = data[0]["nonDisposable"];
        this.consume = data[0]["consume"];
        this.save = data[0]["save"];

        this.nonDisposableC = comma(this.nonDisposable);
        this.consumeC = comma(this.consume);
        this.saveC = comma(this.save);
        this.incomeC = comma(this.income);

        // private incomeP: number = 0;
        // this.disposableP = percent(this.disposable / this.income);
        this.nonDisposableP = percent(this.nonDisposable / this.income);
        this.consumeP = percent(this.consume / this.income);
        this.saveP = percent(this.save / this.income);
        this.incomeP = percent((this.nonDisposable + this.consume + this.save) / this.income);
    }
}