import { NgModule } from '@angular/core';

import {SharedModule} from 'app/shared/shared.module';

import { PostReceiptComponent } from './post-receipt.component';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component'
import { ReceiptMapComponent } from './map/receipt-map.component';
import { BarGraph } from './bar-graph/bar-graph.directive';
import { LineGraphComponent } from './line-graph/line-graph.component';


@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [],
    declarations: [
        PostReceiptComponent,
        DropdownListComponent,
        ReceiptMapComponent,
        BarGraph,
        LineGraphComponent
    ],
    providers: [],
})
export class PostReceiptModule { }

