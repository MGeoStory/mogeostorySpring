import { Component, OnInit } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';

@Component({
    selector: 'home-page',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    private articles: Array<Object>;
    constructor(private acs: ArticleControllerService) {
    }

    ngOnInit() {
        this.acs.getArtiles().subscribe(
            (articles: Array<Object>) => {
                // this.articles = articles;
                articles.forEach((d) => {
                    // console.log(d["title"]);
                })
                this.articles = articles;
                console.log(this.articles);
            }
        );
    }
}