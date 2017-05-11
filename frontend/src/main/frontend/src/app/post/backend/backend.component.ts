import { Component } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';

@Component({
    selector: 'backend',
    templateUrl: 'backend.component.html',
})
export class BackendComponent {

    private data: string = "fail";
    constructor(private acs: ArticleControllerService) {
    }

    getData() {
        console.log('clcik button');
        this.acs.getArtiles().subscribe(
            data => {
                console.log(data);
                // this.data = data;
                this.data =JSON.stringify(data["articles"][0]);
                // console.log(JSON.stringify(data));
            });
    }
}