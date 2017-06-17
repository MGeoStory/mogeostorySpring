import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { EarthquakeMapComponent } from './map/earthquake-map.component';
import { EarthquakeComponent } from './earthquake.component';
import {EarthquakeService} from 'app/services/backend/earthquake.service';
import {SliderComponent} from './slider/slider.component';
import { ButtonsModule } from 'ng2-bootstrap';

@NgModule({
    imports: [SharedModule, ButtonsModule],
    exports: [],
    declarations: [
        EarthquakeComponent,
        EarthquakeMapComponent,
        SliderComponent
        ],
    providers: [
        EarthquakeService,
    ],
})
export class EarthquakeModule { }
