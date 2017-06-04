import { Component, OnInit } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';

@Component({
    templateUrl: 'home.component.html',
    styleUrls:['home.component.css']
})
export class HomeComponent implements OnInit {
    private articles: Array<Object>;
    constructor(private acs: ArticleControllerService) {
    }

    ngOnInit() {
        console.log("aaa");
        this.acs.getArtiles().subscribe(
            (articles: Array<Object>) => {
                console.log("hihi");
                // this.articles = articles;
                articles.forEach((d) => {
                    // console.log(d["title"]);
                })
                this.articles = articles;
                // console.log(this.articles);
            }
        );
    }
}