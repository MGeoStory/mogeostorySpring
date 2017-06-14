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


    constructor(private lms: LMapSettingService, private es: EarthquakeService) { }

    ngOnInit() {
        this.map = this.lms.initMap(this.MAPID);

        this.es.getEarthquakeGById(1).subscribe(
            (geoData: any) => {
                
                L.geoJSON(geoData, {
                    pointToLayer: (feature, latlng) => {
                        return L.circleMarker(latlng, () => {
                            return {
                                radius: 100000,
                                fillColor: "red",
                                color: "#000",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                            }
                        });
                    }
                }).addTo(this.map);
            });
    }
}