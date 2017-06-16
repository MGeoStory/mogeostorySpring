import { NgModule } from '@angular/core';

import {SharedModule} from 'app/shared/shared.module'; 

import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [],
    declarations: [HomeComponent],
    providers: [],
})
export class HomeModule { }
