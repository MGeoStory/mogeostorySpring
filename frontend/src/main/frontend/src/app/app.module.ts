import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import './rxjs-extensions';

//ng2-Moudle
import { DropdownModule } from 'ng2-bootstrap';
import { SelectModule } from 'ng2-select';
import { ModalModule } from 'ng2-bootstrap';

// import { NouisliderComponent } from 'ng2-nouislider';
import { NouisliderModule } from 'ng2-nouislider';

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
import { PostDisposableService } from './services/backend/post-disposable.service';
import {EarthquakeService} from 'app/services/backend/earthquake.service';
export const BackendServices = [
  ArticleControllerService,
  PostDisposableService,
  EarthquakeService
];


//pipes
import { JSONtoArrayPipe } from './pipes/json-to-array.pipe';
export const pipes = [
  JSONtoArrayPipe
];
//home-page
import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
export const singleComponents = [
  HomeComponent,
  // AboutComponent
];


//test what i want
import { TestAllComponent } from './testall/test-all.component';
export const TestComponents = [
  TestAllComponent,
]

import { routing } from './app.routes';

//post-receipt
import { PostReceiptComponent } from './post/receipt/post-receipt.component';
import { DropdownListComponent } from './post/receipt/dropdown-list/dropdown-list.component'
import { ReceiptMapComponent } from './post/receipt/map/receipt-map.component';
import { BarGraph } from './post/receipt/bar-graph/bar-graph.directive';
import { LineGraphComponent } from './post/receipt/line-graph/line-graph.component';
export const PostReceiptComponents = [
  PostReceiptComponent,
  DropdownListComponent,
  ReceiptMapComponent,
  BarGraph,
  LineGraphComponent,
];

//post-disposable-income
import { DisposableIncomeComponent } from './post/disposable-income/disposable-income.component';
import { SliderBarComponent } from './post/disposable-income/slider-bar/slider-bar.component';
import { MapComponent } from './post/disposable-income/map/map.component';
import { BarGraphComponent } from './post/disposable-income/bar-graph/bar-graph.component';
import { TableComponent } from './post/disposable-income/table/table.component';
export const DisposableIncomeComponents = [
  DisposableIncomeComponent,
  SliderBarComponent,
  MapComponent,
  BarGraphComponent,
  TableComponent
];

import {EarthquakeModule} from './post/earthquake/earthquake.module';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    SelectModule,
    NouisliderModule,
    EarthquakeModule

  ],
  declarations: [
    AppComponent,
    singleComponents,
    TestComponents,
    pipes,
    PostReceiptComponents,
    DisposableIncomeComponents,
  ],
  providers: [
    BackendServices,
    FrontendServices

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
