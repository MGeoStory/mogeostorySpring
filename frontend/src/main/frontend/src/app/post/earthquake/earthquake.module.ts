import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { EarthquakeMapComponent } from './map/earthquake-map.component';
import { EarthquakeComponent } from './earthquake.component';
import {EarthquakeService} from 'app/services/backend/earthquake.service';
import {SliderComponent} from './slider/slider.component';
import { ButtonsModule } from 'ng2-bootstrap';
import { ScatterDiagramComponent } from './scatter/scatter-diagram.component';

@NgModule({
    imports: [SharedModule, ButtonsModule],
    exports: [],
    declarations: [
        EarthquakeComponent,
        EarthquakeMapComponent,
        SliderComponent,
        ScatterDiagramComponent
        ],
    providers: [
        EarthquakeService,
    ],
})
export class EarthquakeModule { }
