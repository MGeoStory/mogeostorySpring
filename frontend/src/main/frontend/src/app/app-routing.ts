import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostReceiptComponent } from './post/receipt/post-receipt.component';
import { AboutComponent } from './about/about.component';
import { DisposableIncomeComponent } from './post/disposable-income/disposable-income.component';
import {EarthquakeComponent} from './post/earthquake/earthquake.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: 'about', component: AboutComponent },
    {path: 'about', loadChildren: 'app/about/about.module#AboutModule'},
    {
        path: 'article', component: null,
        children: [
            { path: '00001', component: PostReceiptComponent },
            { path: '01000', component: DisposableIncomeComponent },
            { path: '02000', component:EarthquakeComponent}
        ],
    }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });