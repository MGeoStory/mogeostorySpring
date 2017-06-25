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
    private tableTitle: string = `在地圖上點選縣市即可查看各縣市調查資料！`;
    // private table = d3.select('#earthquake-table').append('table').attr('class', 'eTable');
    // private thead = this.table.append('thead');
    // private tbody = this.table.append('tbody');
    private columns = ['地震編號', '發生日期', '規模', '深度（km）', '震央位置'];
    private rowsName = ['code', 'date', 'scale', 'deep', 'center'];

    // private showTableIs: boolean = false;

    constructor(private os: ObservableService, private es: EarthquakeService) { }

    ngOnInit() {


        this.os.observedData.subscribe(
            (data) => {
                console.log(data);
                if (d3.select('.eTable').empty()) {
                    console.log(d3.select('.eTable').empty());
                    this.drawTable(data);
                } else {
                    d3.select('.eTable').remove();
                    this.drawTable(data);
                }
                this.tableTitle = `七大地震(規模)資訊摘要：`;
            });
    }



    drawTable(data) {
        let table = d3.select('#earthquake-table').append('table').attr('class', 'eTable');
        let thead = table.append('thead');
        let tbody = table.append('tbody');
        thead.append("tr")
            .selectAll("th")
            .data(this.columns)
            .enter()
            .append("th")
            .text((d) => {
                return d;
            });
        let rows = tbody.selectAll('tr')
            .data(data).enter().append('tr');

        let cells = rows.selectAll('td')
            // translate json to key,vlaue
            .data((rows) => {
                return this.rowsName.map((column) => {
                    return { column: column, value: rows[column] }
                })
            })
            .enter()
            .append('td')
            .text((d) => {
                // console.log(d);
                return d.value
            });
    }
}