import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostReceiptComponent } from './post/receipt/post-receipt.component';
import { AboutComponent } from './about/about.component';
import { TestAllComponent } from './testall/test-all.component';
import {DisposableIncomeComponent} from './post/disposable-income/disposable-income.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    {path:'test',component:TestAllComponent},
    {
        path: 'post', component: null,
        children: [
            { path: 'receipt', component: PostReceiptComponent },
            { path: 'disposable-income', component: DisposableIncomeComponent },
        ],
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes,{useHash:true});