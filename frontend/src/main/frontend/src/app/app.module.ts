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

//backend service
import {ArticleControllerService} from './services/backend/articlesController.service';;
import {PostDiControllerService} from './services/backend/postdiController.service';;
export const BackednServices = [
  ArticleControllerService,
  PostDiControllerService
];


//pipes
import {JSONtoArrayPipe} from './pipes/json-to-array.pipe';
export const pipes = [
  JSONtoArrayPipe
];
//home-page
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
export const singleComponents = [
  HomeComponent,
  AboutComponent
];

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

//test what i want
import { TestAllComponent } from './testall/test-all.component';
export const BackendComponents = [
  TestAllComponent,
]

import { routing } from './app.routes';

//post-disposable-income
import {DisposableIncomeComponent} from './post/disposable-income/disposable-income.component';
import { SliderBarComponent } from './post/disposable-income/slider-bar/slider-bar.component';
export const DisposableIncomeComponents = [
  DisposableIncomeComponent,
  SliderBarComponent
];


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    SelectModule,
    NouisliderModule

  ],
  declarations: [
    AppComponent,
    singleComponents,
    PostReceiptComponents,
    BackendComponents,
    pipes,
    SliderBarComponent

  ],
  providers: [
    ObservableService,
    LMapSettingService,
    BackednServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
