import { NgModule } from '@angular/core';

// import { ArticlesComponent } from './name.component';
import { EarthquakeModule } from './earthquake/earthquake.module';
import {PostReceiptModule} from './receipt/post-receipt.module';
import { DisposableIncomeModule } from './disposable-income/disposable-income.module';

@NgModule({
    imports: [
        PostReceiptModule,
        EarthquakeModule,
        DisposableIncomeModule
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class ArticlesModule { }
