import { Component } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';
import { PostDiControllerService } from 'app/services/backend/postdiController.service';
@Component({
    selector: 'backend',
    templateUrl: 'test-all.component.html',
})
export class TestAllComponent {

    private data: string = "fail";
    constructor(private acs: ArticleControllerService, private pcs: PostDiControllerService) {
    }

    getData() {
        console.log('clcik button');
        this.pcs.getPostDiByYear(2000).subscribe(
            data => {
                console.log(data);
                // this.data = data;
                this.data =JSON.stringify(data);
                // console.log(JSON.stringify(data));
            });
    }
}