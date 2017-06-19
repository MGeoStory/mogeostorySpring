import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'app//services/frontend//observable.service';
import { GraphFrameService } from 'app/services/frontend/graph-frame.service';
import { GraphCanvasService } from 'app/services/frontend/graph-canvas.service';
import * as d3 from 'd3';

@Component({
    selector: 'earthquake-scatter-diagram',
    templateUrl: 'scatter-diagram.component.html',
    styleUrls: ['scatter-diagram.conponent.css']

})

export class ScatterDiagramComponent implements OnInit {
    constructor(private os: ObservableService) { }

    ngOnInit() {
        this.os.observedGeoLayer.subscribe(
            (layer) => {
                this.simplyGeoLayer(layer.toGeoJSON());
            }
        );
    }

    simplyGeoLayer(geoJson: any) {
        console.log(geoJson);

        console.log(geoJson["features"]);
        let geoData: Object[] = geoJson["features"];
        //  stackedData.map((d) => {
        //         return this.cId.getCountyNameById(d["cityId"]);
        //     })

        let data: Object[] = [];

        geoData.map((f) => {
            data.push({
                'id': f['properties']['id'],
                'deep': f['properties']['deep'],
                'scale': f['properties']['scale'],
            })
        });
        console.log(data);
    }
}