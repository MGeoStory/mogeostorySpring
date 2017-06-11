import { Component, OnInit } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';

@Component({
    templateUrl: 'post-receipt.component.html',
    styleUrls: ['post-receipt.component.css'],
})
export class PostReceiptComponent implements OnInit {
    private title :string;
    private brief :string;
    constructor(private acs: ArticleControllerService) { }

    ngOnInit() {
        this.title = '南北便利商店角色大不同！';
        this.brief = '2017/03/29- MoGeoStory';
    }
}