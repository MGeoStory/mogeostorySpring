import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LMapSettingService } from 'app/services/frontend/lmap-setting.service';
import { ObservableService } from 'app/services/frontend/observable.service';
import { EarthquakeService } from 'app/services/backend/earthquake.service';
import * as L from 'leaflet';

@Component({
    selector: 'post-earthquake-map',
    templateUrl: 'earthquake-map.component.html',
    styleUrls: ['earthquake-map.component.css'],
})

export class EarthquakeMapComponent implements OnInit {
    private MAPID: string = 'leaf-map';
    private map: L.Map;
    private layerOfEarthquakes: L.GeoJSON;
    private GEOJSON_DATA: string = 'assets/geodata/earthquake-test.json';
    private geojsonMarkerOptions = {
                radius: 1,
                fillColor: "#ff7800",
                color: "#ff7800",
                weight: 1,
                opacity: 0.3,
                fillOpacity: 0.3
            };

    constructor(private lms: LMapSettingService, private es: EarthquakeService) { }

    ngOnInit() {
        this.map = this.lms.initMap(this.MAPID);
        this.es.getEarthquakesG().subscribe(
            (geoData: any) => {
                L.geoJSON(geoData, {
                    pointToLayer: (feature, latlng) => {
                        return L.circleMarker(latlng, this.geojsonMarkerOptions);
                    }
                }).addTo(this.map);
                this.map.setZoom(6);
            }
        )
    }
}