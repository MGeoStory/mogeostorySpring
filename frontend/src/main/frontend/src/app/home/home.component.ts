import { Component, OnInit } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';

@Component({
    selector: 'home-page',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    private articles: JSON;

    constructor(private acs: ArticleControllerService) {
    }

    ngOnInit() {
        this.acs.getArtiles().subscribe(
            artilces => {
                this.articles = artilces;
                console.log(this.articles);
            }
        );
    }
}