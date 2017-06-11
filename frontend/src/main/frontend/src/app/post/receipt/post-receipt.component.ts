import { Component, OnInit } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';
import * as d3 from 'd3';

@Component({
    templateUrl: 'post-receipt.component.html',
    styleUrls: ['post-receipt.component.css'],
})
export class PostReceiptComponent implements OnInit {
    private title: string;
    private brief: string;
    private date :string;
    private link:string;
    private author:string;
    constructor(private acs: ArticleControllerService) { }

    ngOnInit() {
        this.acs.getArticleById(1).subscribe(
            article => {
                console.log(article["title"]);
                this.title = article["title"];           
                let t = d3.timeFormat("%Y/%m/%d");
                this.date = t(article["postDate"]);
                this.author= article["author"];
            });
    }
}