import { Component } from '@angular/core';
import { ArticleControllerService } from 'app/services/backend/articlesController.service';
import {PostDisposableService} from 'app/services/backend/post-disposable.service';
import {EarthquakeService} from 'app/services/backend/earthquake.service';

@Component({
    selector: 'backend',
    templateUrl: 'test-all.component.html',
})
export class TestAllComponent {

    private data: string = "fail";
    constructor(private es:EarthquakeService) {
    }

    getData() {
        console.log('clcik button');
        this.es.getEarthquakesG().subscribe(
            data => {
                // this.data = data;
                // this.data =JSON.stringify(data);
                // console.log(JSON.stringify(data));
            });
    }
}