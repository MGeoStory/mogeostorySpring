import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LMapSettingService } from 'app/services/frontend/lmap-setting.service';
import { ObservableService } from 'app/services/frontend/observable.service';
import { EarthquakeService } from 'app/services/backend/earthquake.service';
import * as d3 from 'd3';
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
    private geojsonMarkerOptions: any = {
        radius: 1,
        color: "#ff7800",
        // weight: 1,
        opacity: 0.1,
    };
    private layers: L.GeoJSON;
    private lastMarker;


    constructor(private lms: LMapSettingService, private os: ObservableService,private es:EarthquakeService) { }

    ngOnInit() {
        this.map = this.lms.initMap(this.MAPID)
        this.os.observedGeoLayer.subscribe(
            (geoLayer) => {
                // this.map.remove();
                if (this.layers != null) {
                    // console.log(this.t);
                    this.map.removeLayer(this.layers);
                }
                this.layers = L.geoJSON(geoLayer.toGeoJSON(), {
                    pointToLayer: (feature, latlng) => {
                        // console.log(feature.properties["scale"]);
                        this.geojsonMarkerOptions.radius = feature.properties["scale"] * feature.properties["scale"] / 4;
                        this.geojsonMarkerOptions.className = 'm' + feature.properties['id'];

                        return L.circleMarker(latlng, this.geojsonMarkerOptions);
                        // return null;
                    }, 
                }).addTo(this.map)


                this.map.setView([23.975, 121.973], 6);
            });

        //get the selected row's id.
        this.os.observedNumber.subscribe(
            (id) => {
                d3.select(this.lastMarker).style('fill', '#ff7800').style('stroke','#ff7800').style('fill-opacity','0.1');
                let lastMarker: string = `.m${id}`;
                d3.select(lastMarker).style('fill', 'LightSkyBlue').style('stroke','LightSkyBlue').style('fill-opacity','0.8');
                this.lastMarker = lastMarker;
                
                //zoom to the cetnre of marker 
                let number = +id;
                this.es.getEarthquakeById(number).subscribe(
                    (data)=>{
                        // console.log(data);
                        // console.log(data['features']);
                        this.map.setView([data['lat'],data['lng']],6);
                    }
                )
            }
        )

    }
}