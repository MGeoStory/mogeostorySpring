import { NgModule } from '@angular/core';
import { EarthquakeMapComponent } from './map/earthquake-map.component';
import { EarthquakeComponent } from './earthquake.component';

@NgModule({
    imports: [],
    exports: [],
    declarations: [
        EarthquakeComponent,
        EarthquakeMapComponent
        ],
    providers: [],
})
export class EarthquakeModule { }
