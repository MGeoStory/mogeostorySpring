import { Component } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';
import {PostDisposableService} from 'app/services/backend/post-disposable.service';


@Component({
    selector: 'backend',
    templateUrl: 'test-all.component.html',
})
export class TestAllComponent {

    private data: string = "fail";
    constructor(private acs: ArticleControllerService, private pds: PostDisposableService) {
    }

    getData() {
        console.log('clcik button');
        this.pds.getPostDisposableByYearAndCityId(2000,'d').subscribe(
            data => {
                console.log(data);
                // this.data = data;
                this.data =JSON.stringify(data);
                // console.log(JSON.stringify(data));
            });
    }
}