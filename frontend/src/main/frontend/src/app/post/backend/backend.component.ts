import { Component } from '@angular/core';
import { GetBackDataService } from 'app/shared/getBackData.service';

@Component({
    selector: 'backend',
    templateUrl: 'backend.component.html',
    providers: [GetBackDataService]
})
export class BackendComponent {

    private data: string = "fail";
    constructor(private gbds: GetBackDataService) {
    }

    getData() {
        console.log('clcik button');
        this.gbds.getData().subscribe(
            data => {
                console.log(JSON.stringify(data));
            });
    }
}