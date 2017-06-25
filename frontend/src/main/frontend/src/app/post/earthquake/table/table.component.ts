import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ObservableService } from 'app/services/frontend/observable.service';
import { EarthquakeService } from 'app/services/backend/earthquake.service';
import * as d3 from 'd3';

@Component({
    selector: 'earthquake-table',
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableComponent implements OnInit {
    private graphTitle: string = `在地圖上點選縣市即可查看各縣市調查資料！`;


    // private showTableIs: boolean = false;

    constructor(private os: ObservableService, private es: EarthquakeService) { }

    ngOnInit() {
        this.os.observedData.subscribe(
            (data) => {
                console.log(data);

                let table = d3.select('#earthquake-table').append('table');
                let thead = table.append('thead');
                let tbody = table.append('tbody');
                let columns = ['地震編號', '發生日期', '規模', '深度', '震央位置'];
                thead.append("tr")
                    .selectAll("th")
                    .data(columns)
                    .enter()
                    .append("th")
                    .text((d) => {
                        return d;
                    });

                let rows = tbody.selectAll('tr')
                    .data(data).enter().append('tr').text((d) => {
                        console.log(d);
                        return '';
                    });


                this.graphTitle = `在地圖上點選縣市即可檢視各縣市家戶所得分配情形！`;
            });
    }
}