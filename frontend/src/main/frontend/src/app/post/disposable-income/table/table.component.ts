import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'app/services/frontend/observable.service';
import * as d3 from 'd3';

@Component({
    selector: 'post-disposable-income-table',
    templateUrl: 'table.component.html',
    styleUrls:['table.component.css']
})

export class TableComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}