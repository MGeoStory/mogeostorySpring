import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PostReceiptComponent } from './post/receipt/post-receipt.component';
import { AboutComponent } from './about/about.component';
import {BackendComponent} from './post/backend/backend.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    {
        path: 'post', component: null,
        children: [
            { path: 'receipt', component: PostReceiptComponent },
            { path: 'backend', component: BackendComponent }

        ],
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes,{useHash:true});