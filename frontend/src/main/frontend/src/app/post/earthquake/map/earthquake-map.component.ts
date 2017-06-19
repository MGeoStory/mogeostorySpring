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
    private timeCal: number[] = [];
    private MAPID: string = 'leaf-map';
    private map: L.Map;
    private layerOfEarthquakes: L.GeoJSON;
    private GEOJSON_DATA: string = 'assets/geodata/earthquake-test.json';
    private geojsonMarkerOptions = {
        radius: 1,
        color: "#ff7800",
        // weight: 1,
        opacity: 0.1,
    };
    private t;

    constructor(private lms: LMapSettingService, private os: ObservableService) { }

    ngOnInit() {
        this.map = this.lms.initMap(this.MAPID)
        this.os.observedGeoLayer.subscribe(
            (geoLayer) => {
                // this.map.remove();
                if (this.t != null) {
                    console.log(this.t);
                    this.map.removeLayer(this.t);
                }
                this.t = L.geoJSON(geoLayer.toGeoJSON(), {
                    pointToLayer: (feature, latlng) => {
                        // console.log(feature.properties["scale"]);
                        this.geojsonMarkerOptions.radius = feature.properties["scale"] * feature.properties["scale"] / 4;
                        return L.circleMarker(latlng, this.geojsonMarkerOptions);
                        // return null;
                    }
                }).addTo(this.map)
                this.map.setZoom(6);
            });
    }
    // this.es.getEarthquakesG().subscribe(
    //     (geoData: any) => {
    //         L.geoJSON(geoData, {
    //             pointToLayer: (feature, latlng) => {
    //                 // console.log(feature.properties["scale"]);
    //                 this.geojsonMarkerOptions.radius = feature.properties["scale"]*feature.properties["scale"]/4;
    //                 return L.circleMarker(latlng, this.geojsonMarkerOptions);
    //             }
    //         }).addTo(this.map);
    //         this.map.setZoom(6);
    //         this.timeCal[1] = new Date().getTime();
    //         console.log("====="+(this.timeCal[1] - this.timeCal[0])/1000)+"=====";
    //     }
    // )
    // }
}