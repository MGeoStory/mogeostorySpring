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
    private tableTitle: string = `區間較大地震(規模)資訊摘要：`;
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
            .data(data).enter().append('tr').on('click',(d)=>{
                // console.log(d['id']);
                // console.log(d);
                this.resetHighLightRows();
                this.highLightSelectedRow(d['id']);
                this.os.pushNumberToObserved(d['id']);
            }).attr('class',(d)=>{
                return 'table'+d['id'] ;
            });

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

    resetHighLightRows(){
        d3.selectAll('tr').selectAll('td').style('background-color','white');
    }

    highLightSelectedRow(id:number):void{
        let rowClass = `.table${id}`;
        d3.select(rowClass).selectAll('td').style('background-color','LightSkyBlue');
    }
}