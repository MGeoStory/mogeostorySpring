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
        this.pds.getExtentYearValues().subscribe(
            data => {
                console.log(data["minYear"]);
                // this.data = data;
                this.data =JSON.stringify(data);
                // console.log(JSON.stringify(data));
            });
    }
}