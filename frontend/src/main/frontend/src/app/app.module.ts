import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import './rxjs-extensions';

import { SharedModule } from './shared/shared.module';

//home-page
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';

//ng2-Moudle
import { DropdownModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
// import { SelectModule } from 'ng2-select';

//frontend Service
import { ObservableService } from './services/frontend/observable.service';
import { LMapSettingService } from './services/frontend/lmap-setting.service';
import { CountyIdTWService } from './services/frontend/countyid-tw.service';
export const FrontendServicesForAll = [
  ObservableService,
  LMapSettingService,
  CountyIdTWService
];

//backend service
import { ArticleControllerService } from './services/backend/articlesController.service';
export const BackednServicesForAll = [
  ArticleControllerService
];

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
    NavComponent,
    HomeComponent,
    FooterComponent
  ],
  providers: [
    FrontendServicesForAll,
    BackednServicesForAll
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
