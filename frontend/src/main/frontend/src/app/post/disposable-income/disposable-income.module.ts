import { NgModule } from '@angular/core';

import {SharedModule} from 'app/shared/shared.module';

import { DisposableIncomeComponent } from './disposable-income.component';
import { SliderBarComponent } from './slider-bar/slider-bar.component';
import { MapComponent } from './map/map.component';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { TableComponent } from './table/table.component';

import { PostDisposableService } from 'app/services/backend/post-disposable.service';

@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [],
    declarations: [
        DisposableIncomeComponent,
        SliderBarComponent,
        MapComponent,
        BarGraphComponent,
        TableComponent
    ],
    providers: [PostDisposableService],
})
export class DisposableIncomeModule { }

