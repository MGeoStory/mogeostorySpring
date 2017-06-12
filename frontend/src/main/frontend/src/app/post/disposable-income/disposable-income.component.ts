import { Component, OnInit, ViewChild } from '@angular/core';
import { SliderBarComponent } from 'app/post/disposable-income/slider-bar/slider-bar.component';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';
import * as d3 from 'd3';

@Component({
    selector: 'post-disposable',
    templateUrl: 'disposable-income.component.html'
})

export class DisposableIncomeComponent implements OnInit {
    @ViewChild(SliderBarComponent) sbc: SliderBarComponent;

        private title: string;
    private brief: string;
    private date :string;
    private link:string;
    private author:string;
    constructor(private acs: ArticleControllerService) { }

    ngOnInit() {
        this.acs.getArticleById(2).subscribe(
            article => {
                console.log(article["title"]);
                this.title = article["title"];           
                let t = d3.timeFormat("%Y/%m/%d");
                this.date = t(article["postDate"]);
                this.author= article["author"];
            });
    }
    ngOnChanges() {
        // console.log("income-ngOnChanges");
    }

    ngAfterViewInit() {
        // console.log("income-ngAfterViewInit");
    }

    ngAfterViewChecked() {
        // console.log("income-ngAfterViewChecked");
    }
}