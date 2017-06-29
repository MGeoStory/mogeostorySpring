import { Component, OnInit } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';
import * as d3 from 'd3';

@Component({
    selector: 'post-earthquake',
    templateUrl: 'earthquake.component.html'
})

export class EarthquakeComponent implements OnInit {
    title: string;
    date: string;
    author: string;
    constructor(private acs: ArticleControllerService) { }

    ngOnInit() {
        this.acs.getArticleById(3).subscribe(
            article => {
                console.log(article["title"]);
                this.title = article["title"];
                let t = d3.timeFormat("%Y/%m/%d");
                this.date = t(article["postDate"]);
                this.author = article["author"];
            });

    }
}