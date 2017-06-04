import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'app/services/frontend/observable.service';
import { GraphFrameService } from 'app/services/frontend/graph-frame.service';
import { GraphCanvasService } from 'app/services/frontend/graph-canvas.service';
import * as d3 from 'd3';
import { CountyIdTWService } from 'app/services/frontend/countyid-tw.service';

let gc = new GraphCanvasService();
let canvas: d3.Selection<any, any, any, any>;
let valueOfCounty: Object[] = [];
let isFirstLoading: boolean = true;


@Component({
    selector: 'post-disposable-income-bar-graph',
    templateUrl: 'bar-graph.component.html',
    styleUrls: ['bar-graph.component.css']
})

export class BarGraphComponent implements OnInit {

    private graphTitle: string = "worked";
    private preUserClicked: string;
    constructor(private obs: ObservableService, private cId: CountyIdTWService) { }

    ngOnInit() {
        isFirstLoading = true;
        this.obs.observedString.subscribe(
            (userClicked: string[]) => {
                this.highlightBarByUserClicked(userClicked[0]);
            }
        )
        this.obs.observedData.subscribe(
            (dbData: Object[]) => {
                //remove the old graph
                if (d3.select('#bar-graph').empty()) {
                    console.log(d3.select('#bar-graph').empty());
                }
                this.graphTitle = `${dbData[0]['year']}年--各縣市別平均每戶所得總額(萬元)：`;
                canvas = gc.createCanvas('bar-canvas', '#bar-graph');
                // valueOfCounty = this.simplifiedDbData(dbData);
                // this.drawColumnGraph(valueOfCounty);
                // this.drawStackedBar(this.createStackedData(dbData));
                this.drawStackedBar(this.createStackedData(dbData));
            }
        )
    }//.. ngOnInit

    /**
     * the type of stackedData must be any (type error)
     * @param stackedData 
     */
    drawStackedBar(stackedData: any) {
        console.log(stackedData[0]);

        gc.yScaleLinear.domain([0, stackedData[0]["income"]]);

        gc.xScaleBand.domain(
            stackedData.map((d) => {
                return this.cId.getCountyNameById(d["cityId"]);
            })
        );

        //set stacks
        let stacks = ["consume", "nonDisposable", "save"];
        gc.zScaleOrdinal.domain(stacks);
        let series = gc.setStacks(stacks,stackedData);
        // console.log(series);

        //series is  [array[],array[],arry[]];
        canvas.selectAll("g").data(series)
            .enter().append("g")
            //useing any to avoid type error
            .attr("fill", (d, i): any => {
                // console.log(d[i]);
                // console.log(d.key + ":" + z(d.key));
                return gc.zScaleOrdinal(d.key);
            })
            //useing any to avoid type error
            //the 1st. 2nd and 3rd array[] in series
            .selectAll("rect").data((d: any) => {
                //d = series[i]
                return d;
            })
            .enter().append("rect")
            .attr("x", (d) => {
                return gc.xScaleBand(this.cId.getCountyNameById(d["data"]["cityId"]));
            }).attr("y", (d, i) => {
                //0:start value, 1:end value, 2:data
                return gc.yScaleLinear(d[1]);
            }).attr("height", (d) => {
                return (gc.getFrameHeight() - gc.yScaleLinear(d[1] - d[0]));
            }).attr('width', gc.xScaleBand.bandwidth());


        //the text of domain name from gc.scaleBand.domain()
        let textOfAaxis = canvas.append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0,${gc.getFrameHeight()})`)
            .call(gc.xAxisOfBand())
            .selectAll('text')
            .style('fill', (d, i) => {
                if (i % 2 == 0) {
                    return 'black';
                } else {
                    return 'DimGrey';
                }
            });

        //make text more reabable
        textOfAaxis.attr('transform', 'rotate(45)')
            .attr('x', 20)
            .style('font-size', '1.2rem');
    }

    /**
     * filter ans sort data from database
     * @param dbData 
     */
    createStackedData(dbData: Object[]): Object[] {
        let stackedData: Object[] = [];
        stackedData = dbData.filter((d) => {
            return d["cityId"] != "TW"
        })
        stackedData.sort((x, y) => {
            return d3.descending(x["income"], y["income"]);
        })
        console.log(stackedData);
        return stackedData;
    }

    /**
     * 
     * @param cityId 
     */
    highlightBarByUserClicked(cityId: string): void {
        let userClicked: string = this.cId.getCountyNameById(cityId);
        //reset the color
        d3.select(`.${this.preUserClicked}`).style('fill', 'skyblue');

        //save the info of user clicked
        this.preUserClicked = userClicked;

        //set new color
        d3.select(`.${userClicked}`).style('fill', 'blue');
    }


    // it useful in draw column graph==========================================================================
    /**
     * draw bar, value, text, axis
     * @param valueOfCounty 
     */
    drawColumnGraph(valueOfCounty: Object[]): void {
        //return a ['name','name'....];
        gc.xScaleBand.domain(
            valueOfCounty.map((d) => {
                return d['name']
            })
        )

        // valueOfCounty[0]['value'] is the max value
        gc.yScaleLinear.domain([0, valueOfCounty[0]['value']]);

        //append bar chart
        canvas.selectAll('rect').data(valueOfCounty).enter().append('rect')
            .attr('x', (d) => gc.xScaleBand(d['name']))
            .attr('y', (d) => gc.yScaleLinear(d['value']))
            .attr('class', (d) => (d['name']))
            .attr('width', gc.xScaleBand.bandwidth())
            .attr('height', (d) => gc.getFrameHeight() - gc.yScaleLinear(d['value']))
            .attr('fill', 'skyblue');

        //append values of bar
        canvas.selectAll('text').data(valueOfCounty).enter().append('text')
            .attr('class', 'bar-value')
            .attr('x', (d) => gc.xScaleBand(d['name']) + gc.xScaleBand.bandwidth() / 2)
            .attr('y', (d) => gc.yScaleLinear(d['value']) - 5)
            .attr('text-anchor', 'middle')
            .text((d) => d3.format(".0f")(d['value'] / 10000))
            //0.9em will equal 0.9 x the parent font-size
            .style('font-size', '1.2rem')
            .style('fill', (d, i) => {
                if (i % 2 == 0) {
                    return 'black';
                } else {
                    return 'DimGrey';
                }
            });

        //the text of domain name from gc.scaleBand.domain()
        let textOfAaxis = canvas.append('g')
            .attr('class', 'xAxis')
            .attr('transform', `translate(0,${gc.getFrameHeight()})`)
            .call(gc.xAxisOfBand())
            .selectAll('text')
            .style('fill', (d, i) => {
                if (i % 2 == 0) {
                    return 'black';
                } else {
                    return 'DimGrey';
                }
            });

        //make text more reabable
        textOfAaxis.attr('transform', 'rotate(45)')
            .attr('x', 20)
            .style('font-size', '1.2rem');
    }//.. drawColumnGraph

    /**
     * simplefied and sort(descending) DbData to obect[{key:countyID, value:value}]
     * @param dbData 
     */
    simplifiedDbData(dbData: Object[]) {
        console.log(dbData);
        let newObject: Object[] = [];

        dbData = dbData.filter((d) => {
            return d['cityId'] != "TW";
        });

        console.log(dbData);
        for (let index in dbData) {
            newObject.push({
                name: this.cId.getCountyNameById(dbData[index]["cityId"]),
                value: dbData[index]["income"],
            });
        }

        newObject.sort((x, y) => {
            return d3.descending(x['value'], y['value']);
        })
        return newObject;
    }//.. simplifiedDbData
}