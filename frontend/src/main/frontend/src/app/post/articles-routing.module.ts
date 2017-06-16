import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ArticlesComponent } from './name.component';
import { PostReceiptComponent } from './receipt/post-receipt.component';
import { DisposableIncomeComponent } from './disposable-income/disposable-income.component';
import { EarthquakeComponent } from './earthquake/earthquake.component';

const routes: Routes = [
    { path: '1', component: PostReceiptComponent },
    { path: '2', component: DisposableIncomeComponent },
    { path: '3', component: EarthquakeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ArticlesRoutingModule { }


