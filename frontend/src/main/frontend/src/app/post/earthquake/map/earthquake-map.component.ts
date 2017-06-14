import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LMapSettingService } from 'app/services/frontend/lmap-setting.service';
import { ObservableService } from 'app/services/frontend/observable.service';
import * as d3 from 'd3';
import * as L from 'leaflet';

@Component({
    selector: 'post-earthquake-map',
    templateUrl: 'earthquake-map.component.html',
    styleUrls: ['earthquake-map.component.css'],
})

export class EarthquakeMapComponent implements OnInit {
    private MAPID: string = 'leaf-map';
    private map: L.Map;
    private GEOJSON_DATA: string = 'assets/geodata/earthquake-test.json';


    constructor(private lms: LMapSettingService) { }

    ngOnInit() {
        this.map = this.lms.initMap(this.MAPID);
        

        d3.json(this.GEOJSON_DATA, (geoData) => {
            console.log(geoData);
        });

    }
}