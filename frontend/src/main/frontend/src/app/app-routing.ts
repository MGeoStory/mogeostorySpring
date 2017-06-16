import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // { path: '', redirectTo:'home',pathMatch:'full'},
    {path: 'about', loadChildren: 'app/about/about.module#AboutModule'},
    {path: 'article', loadChildren: 'app/post/articles.module#ArticlesModule'},
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });