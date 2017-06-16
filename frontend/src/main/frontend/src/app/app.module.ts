import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import './rxjs-extensions';

//ng2-Moudle
import { DropdownModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
// import { SelectModule } from 'ng2-select';

//frontend Service
import { ObservableService } from './services/frontend/observable.service';
import { LMapSettingService } from './services/frontend/lmap-setting.service';
import { CountyIdTWService } from './services/frontend/countyid-tw.service';
export const FrontendServices = [
  ObservableService,
  LMapSettingService,
  CountyIdTWService
];

//backend service
import { ArticleControllerService } from './services/backend/articlesController.service';

//home-page
import { HomeComponent } from './home/home.component';

import { AppRouting } from './app-routing';

@NgModule({
  imports: [
    BrowserModule,
    AppRouting,
    SharedModule,
    ModalModule.forRoot(),
    DropdownModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  providers: [
    ArticleControllerService,
    FrontendServices,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
