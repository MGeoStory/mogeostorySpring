import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EarthquakeMapComponent } from './map/earthquake-map.component';
import { EarthquakeComponent } from './earthquake.component';
import {EarthquakeService} from 'app/services/backend/earthquake.service';
@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: [
        EarthquakeComponent,
        EarthquakeMapComponent
        ],
    providers: [EarthquakeService],
})
export class EarthquakeModule { }
