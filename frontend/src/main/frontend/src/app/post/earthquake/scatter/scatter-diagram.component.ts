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

    private gc = new GraphCanvasService();
    private canvas: d3.Selection<any, any, any, any>;

    constructor(private os: ObservableService) { }

    ngOnInit() {
        this.os.observedGeoLayer.subscribe(
            (layer) => {
                let data: Object[] = this.simplyGeoLayer(layer.toGeoJSON());
                this.canvas = this.gc.createCanvas('new-scatter-diagram', '#scatter-diagram');
                this.drawScatterDiagram(data);
            }
        );
    }

    drawScatterDiagram(data: Object[]) {
        // console.log(data);

        // console.log(this.gc.getFrameWidth());

        this.gc.yScaleLinear
            .domain([d3.max(data, (d) => {
                return d['deep'];
            }), 0]);


        this.gc.xScaleLinear
            .domain([0, d3.max(data, (d) => {
                return d['scale'];
            })]);

        this.gc.xScaleLinear
            .domain([0, 8]);

        this.canvas.selectAll('circle')
            .data(data).enter()
            .append('circle')
            .attr('class', (d) => {
                return String(d['id']);
            })
            .attr("cx", (d) => {
                return this.gc.xScaleLinear(d['scale']);
            })
            .attr("cy", (d) => {
                return this.gc.yScaleLinear(d['deep']);
            })
            .attr("r", 1)
            .style("fill", 'red');
    }

    /**
     * parsing geojson to object[]
     * @param geoJson 
     */
    simplyGeoLayer(geoJson: any): Object[] {
        // console.log(geoJson);

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
        // console.log(data);
        return data;
    }
}