import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'app/services/frontend/observable.service';
import { GraphCanvasService } from 'app/services/frontend/graph-canvas.service';
import * as d3 from 'd3';
import { CountyIdTWService } from 'app/services/frontend/countyid-tw.service';
import { PostDisposableService } from 'app/services/backend/post-disposable.service';
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

    private graphTitle: string = "ERROR:No Data";
    private subTitle: string = "ERROR: No Data";
    private preUserClicked: string;
    private yearSelected: number; //used to query data for talbe
    private showSubTitleIs: boolean = false;

    constructor(private obs: ObservableService, private cId: CountyIdTWService, private pds: PostDisposableService) { }

    ngOnInit() {
        isFirstLoading = true;

        //user click map 
        this.obs.observedString.subscribe(
            (userClicked: string[]) => {
                this.highlightBarByUserClicked(userClicked[0]);
                console.log(this.yearSelected);
                //push id and year
                this.obs.pushAnyToObserved([userClicked[0], this.yearSelected]);
            }
        )

        //user click map
        this.obs.observedAny.subscribe(
            (data) => {
                //get data from backend
                this.pds.getPostDisposableByYearAndCityId(data[1], data[0]).subscribe(
                    (data) => {
                        // this.setSubTitle(data);

                    })
            }
        );

        //user slide bar
        this.obs.observedData.subscribe(
            (dbData: Object[]) => {
                this.yearSelected = dbData[0]["year"];

                this.graphTitle = `${dbData[0]['year']}年-各縣市每戶所得(萬元)：`;
                canvas = gc.createCanvas('bar-canvas', '#bar-graph');
                // valueOfCounty = this.simplifiedDbData(dbData);
                // this.drawColumnGraph(valueOfCounty);
                // this.drawStackedBar(this.createStackedData(dbData));
                this.showSubTitleIs = false;
                this.drawStackedBar(this.createStackedData(dbData));
            }
        )
    }//.. ngOnInit

    /**
     * set values of subtitle
     * @param data 
     */
    setSubTitle(data) {
        let cityName = this.cId.getCountyNameById(data[0]["cityId"]);
        let year = data[0]["year"];
        // this.graphTitle = `${year}年-${cityName}每戶調查資料：`
        console.log(data);

        let tenK = d3.format(".1f");
        let percent = d3.format(".1%");
        let consume: number = data[0]["consume"];
        let save: number = data[0]["save"];
        let nonDisposable: number = data[0]["nonDisposable"];
        let total: number = consume + save + nonDisposable;

        let consumeS: string = tenK(consume / 10000);
        let saveS: string = tenK(save / 10000);
        let nonDisposableS: string = tenK(nonDisposable / 10000);
        let totalS:string = tenK(total/10000);

        let consumeP: string = percent(consume / total);
        let saveP: string = percent(save / total);
        let nonDisposableP: string = percent(nonDisposable / total);
        console.log(saveP);

        this.subTitle = `${year}年${cityName}所得總額(${totalS}萬): 
                            消費支出:${consumeS}萬(${consumeP});
                            非消費性支出:${nonDisposableS}萬(${nonDisposableP});
                            儲蓄:${saveS}萬(${saveP})`;

        this.showSubTitleIs = true;
    }

    /**
     * the type of stackedData must be any (type error)
     * @param stackedData 
     */
    drawStackedBar(stackedData: any) {
        gc.yScaleLinear.domain([0, stackedData[0]["income"]]);

        gc.xScaleBand.domain(
            stackedData.map((d) => {
                return this.cId.getCountyNameById(d["cityId"]);
            })
        );

        //set stacks
        let stacks = ["consume", "nonDisposable", "save"];
        gc.zScaleOrdinal.domain(stacks);
        let series = gc.setStacks(stacks, stackedData);
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
            }).attr('width', gc.xScaleBand.bandwidth())
            .attr('class', (d) => (this.cId.getCountyNameById(d["data"]["cityId"])));


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

        let legend = gc.canvas.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", "1rem")
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(stacks.reverse())
            .enter()
            .append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("text")
            .attr("x", gc.getFrameWidth() - 24)
            .attr("y", 9.5)
            .attr("font-size", "1.5rem")
            .attr("dy", "0.32em")
            .text((d) => {
                switch (d) {
                    case "consume":
                        return "消費支出";
                    case "nonDisposable":
                        return "非消費性支出";
                    case "save":
                        return "儲蓄";
                }
                return d
            });

        legend.append("rect")
            .attr("x", gc.getFrameWidth() - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", (d): any => {
                // console.log(gc.zScaleOrdinal(d));
                return gc.zScaleOrdinal(d);
            });

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
        // console.log(stackedData);
        return stackedData;
    }

    /**
     * 
     * @param cityId 
     */
    highlightBarByUserClicked(cityId: string): void {
        let userClicked: string = this.cId.getCountyNameById(cityId);
        //reset the color
        d3.selectAll(`.${this.preUserClicked}`).style("stroke", "");

        //save the info of user clicked
        this.preUserClicked = userClicked;

        //set new color
        d3.selectAll(`.${userClicked}`).style("stroke", "blue");
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