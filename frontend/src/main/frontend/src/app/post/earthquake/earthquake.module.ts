import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { EarthquakeMapComponent } from './map/earthquake-map.component';
import { EarthquakeComponent } from './earthquake.component';
import {EarthquakeService} from 'app/services/backend/earthquake.service';
@NgModule({
    imports: [SharedModule],
    exports: [],
    declarations: [
        EarthquakeComponent,
        EarthquakeMapComponent
        ],
    providers: [EarthquakeService],
})
export class EarthquakeModule { }
