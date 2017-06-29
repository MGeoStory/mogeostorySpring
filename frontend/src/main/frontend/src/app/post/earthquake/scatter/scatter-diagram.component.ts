import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'app//services/frontend//observable.service';
import { EarthquakeService } from 'app/services/backend/earthquake.service';
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
    private graphTitle: string = "有感地震規模與深度圖：";
    private subTitle: string = '(此區間與區域下共計有n次有感地震)';
    private showScatterIs = false;
    private lastCirlceClass: string;
    private loadingScatter: boolean = true;

    constructor(private os: ObservableService, private es: EarthquakeService) { }

    ngOnInit() {
        this.os.observedGeoLayer.subscribe(
            (layer) => {
                let data: Object[] = this.simplyGeoLayer(layer.toGeoJSON());

                this.pushDataToTable(data, 7);

                this.gc.setFrameMargin(40, 5, -1, 60);
                this.canvas = this.gc.createCanvas('new-scatter-diagram', '#scatter-diagram');
                this.drawScatterDiagram(data);
                this.subTitle = `(此區間與區域下共計有${data.length}次有感地震)`;
            }
        );


        // hightlight the marker of deep and scale
        this.os.observedNumber.subscribe(
            (id) => {
                d3.select(this.lastCirlceClass).attr('r', 2).style('fill', 'red');
                let circleClass: string = `.s${id}`;
                d3.select(circleClass).attr('r', 7).style('fill', 'LightSkyBlue');
                this.lastCirlceClass = circleClass;
            }
        )

    }

    pushDataToTable(data: Object[], endNumber: number) {
        let temp: Object[] = [];
        let result: Object[] = [];
        //remove code = 小區域, because the impact is not enough to be recorded.
        data = data.filter((d) => {
            // console.log(d['code']);
            return d['code'] != '小區域';
        })
        // console.log(data);

        data.sort((x, y) => {
            return d3.descending(x['scale'], y['scale'])
        });
        temp = data.slice(0, endNumber);


        temp.forEach((d) => {
            this.es.getEarthquakeById(d['id']).subscribe(
                (data) => {
                    result.push(data);
                    if (result.length == temp.length) {
                        //push to table
                        this.os.pushDataToObserved(result);
                    }
                })
            // console.log('ttttt');
        });
    }

    drawScatterDiagram(data: Object[]) {
        this.gc.getFrameMargin();
        this.gc.xScaleLinear
            .domain([0, d3.max(data, (d) => {
                return d['scale'];
            })]);

        //max deep = 350
        // console.log(d3.max(data, (d) => {
        //     return d['deep'];
        // }));
        this.gc.yScaleLinear
            .domain([d3.max(data, (d) => {
                return d['deep'];
            }), 0]);

        this.gc.xScaleLinear
            .domain([0, 8]);

        this.canvas.selectAll('circle')
            .data(data).enter()
            .append('circle')
            // .attr('class', (d) => {
            //     return String(d['id']);
            // })

            .attr("cx", (d) => {
                return this.gc.xScaleLinear(d['scale']);
            })
            .attr("cy", (d) => {
                return this.gc.yScaleLinear(d['deep']);
            })
            .attr("r", 2)
            .style("fill", 'red')
            .attr('class', (d) => {
                return 's' + d['id'];
            });

        this.canvas.append('g')
            .attr('class', 'yAxis')
            .call(this.gc.yAxisOfLinear().ticks(6));

        this.canvas.append('g')
            .attr('class', 'xAxis')
            .call(this.gc.xAxisOfLinearTop());

        this.canvas.append('g')
            .append('text')
            .attr('x', this.gc.getFrameWidth() / 2)
            .attr('y', this.gc.getFrameMargin()['top'] / 2 * -1)
            .attr("font-size", "1.5rem")
            .text('規模(級)')
            .attr('text-anchor', 'middle');

        this.canvas.append('g')
            .append('text')
            .attr('x', this.gc.getFrameMargin()['left'] / 1.5 * -1)
            .attr('y', this.gc.getFrameHeight() / 2)
            .attr("font-size", "1.5rem")
            .text('深度(公里)')
            .attr('text-anchor', 'middle')
            .attr('writing-mode', 'tb');
        // .attr('transform','rotate(180)');

        this.loadingScatter = false;
    }

    /**
     * parsing geojson to object[]
     * @param geoJson 
     */
    simplyGeoLayer(geoJson: any): Object[] {
        // console.log(geoJson);
        // console.log(geoJson["features"]);
        let geoData: Object[] = geoJson["features"];
        //  stackedData.map((d) => {
        //         return this.cId.getCountyNameById(d["cityId"]);
        //     })

        let data: Object[] = [];

        geoData.map((f) => {
            data.push({
                'id': f['properties']['id'],
                // 'center': f['properties']['center'],
                'deep': f['properties']['deep'],
                'scale': f['properties']['scale'],
                'code': f['properties']['code'],
                // 'date':f['properties']['date']

            })
        });
        // console.log(data);
        return data;
    }
}