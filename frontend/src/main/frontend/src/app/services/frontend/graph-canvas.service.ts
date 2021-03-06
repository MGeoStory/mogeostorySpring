import * as d3 from 'd3';
import { GraphFrameService } from 'app/services/frontend/graph-frame.service';
import { Injectable } from '@angular/core';

//that's extends could work probably, but the problem is how to super(parms)?
@Injectable()
export class GraphCanvasService extends GraphFrameService {
    canvas: d3.Selection<any, any, any, any>;

    //variable of function
    xScaleBand: d3.ScaleBand<string>;
    xScaleTime: d3.ScaleTime<number, number>;
    xScaleLinear: d3.ScaleLinear<number, number>;
    yScaleLinear: d3.ScaleLinear<number, number>;
    zScaleOrdinal: d3.ScaleOrdinal<String, {}>;
    //http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e
    rounded = d3.format(',.0f');
    line;
    // xAxisOfColumn: d3.Axis<any>;

    constructor() {
        super();
        this.xScaleBand = d3.scaleBand().range([0, this.getFrameWidth()]).paddingInner(0.1);
        this.xScaleTime = d3.scaleTime().range([0, this.getFrameWidth()]);
        this.xScaleLinear = d3.scaleLinear().range([0, this.getFrameWidth()]);

        this.yScaleLinear = d3.scaleLinear().range([this.getFrameHeight(), 0]);

        //colors that select from d3.shemeCategory20b
        this.zScaleOrdinal = d3.scaleOrdinal().range(["#6baed6", "#fd8d3c", "#74c476", "#9e9ac8", "#969696"]);
        // .range(["#c6dbef ", "#fdd0a2","#c7e9c0", "#dadaeb", "#d9d9d9"]);
        // .range(["#9ecae1", "#fdae6b","#a1d99b", "#bcbddc", "#bdbdbd"]);

        // this.yGridLine= d3.axisRight(this.y)

        //Typescript does not know anything about your data object type. 
        //You can define the data object type or you could try to use the type any:
        this.line = d3.line()
            .x((d: any) => {
                // use '+' for convert string to number
                return +this.rounded(this.xScaleTime(d.date));
            })
            .y((d: any) => {
                return +this.rounded(this.yScaleLinear(d.value));
            });

        // this.xAxisOfColumn = this.xAxisOfColumn();
    };

    /**
     * set defult stacks
     */
    setStacks(stacks: string[], stackedData: any) {
        let myStack = d3.stack().keys(stacks).order(d3.stackOrderNone).offset(d3.stackOffsetNone);
        return myStack(stackedData);
    }

    /*
    *create grid line of linear scale
    */
    yAixsOfLinearOfGridLine(): d3.Axis<any> {
        return d3.axisRight(this.yScaleLinear).tickSize(this.getFrameWidth()).tickSizeOuter(0);
    }

    /**
    *create y axis of linear scale
    */
    yAxisOfLinear(): d3.Axis<any> {
        return d3.axisLeft(this.yScaleLinear);
    }


    /**
    *create x axis of linear scale in Top
    */
    xAxisOfLinearTop(): d3.Axis<any> {
        return d3.axisTop(this.xScaleLinear);
    }

    /** 
    *create grid line of linear scale
    */
    xAixsOfTimeOfGridLine(): d3.Axis<any> {
        return d3.axisBottom(this.xScaleTime).tickSize(this.getFrameHeight());
    }

    /**
    *create axis of time scale
    */
    xAxisOfTime(): d3.Axis<any> {
        return d3.axisBottom(this.xScaleTime);
    }

    /** 
    *create axis of band (tickSize=0))
    */
    xAxisOfBand(): d3.Axis<any> {
        return d3.axisBottom(this.xScaleBand).tickSize(0);
    }// xAxisOfColumn

    /**
    *create a responsive embedded D3 SVG (graph frame adn canvas)
    *the graph-frame is the id of Frame; it was created by createCanvasT extends graph-frame.addFrame;
    */
    createCanvas(IdOfHtml: string, htmlElement: any): d3.Selection<any, any, any, any> {
        //if #id is empty=>return true
        let graphFrameIsEmpty: boolean = d3.select(`#${IdOfHtml}`).empty();

        if (graphFrameIsEmpty) {
            return this.canvas = super.createFrame(IdOfHtml, htmlElement).append('g')
                .attr('transform', 'translate(' + this.getFrameMargin()['left'] + ',' + this.getFrameMargin()['top'] + ')');
        } else {
            //remove old graph and return new one
            d3.select(`#${IdOfHtml}`).remove();
            return this.canvas = super.createFrame(IdOfHtml, htmlElement).append('g')
                .attr('transform', 'translate(' + this.getFrameMargin()['left'] + ',' + this.getFrameMargin()['top'] + ')');
        }
    }//createCanvas

    /**
     * default:414px in graph-frame
    */
    setFrameWidth(width: number) {
        super.setFrameWidth(width);
    };

    getFrameWidth(): number {
        return super.getFrameWidth();
    }
    /**
     * the height shold be small than 300 (the size of frame).
     * If not, the graph would out of viewbox.
     * 
     * default:200px in graph-frame
     */
    setFrameHeight(height: number) {
        super.setFrameHeight(height);
    };
    getFrameHeight(): number {
        return super.getFrameHeight();
    };
    /** 
     * setFrameMargin must be run befroe createCanvas.
   *if parms = -1 => keep the value that constructor create.
   *default = 20px
   */
    setFrameMargin(top: number, right: number, bottom: number, left: number) {
        super.setFrameMargin(top, right, bottom, left);
    };
    getFrameMargin() {
        return super.getFrameMargin();
    }
}// END OF GraphCanvas