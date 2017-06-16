import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { ModalModule } from 'ng2-bootstrap';
import { HttpModule } from '@angular/http';
// import { SharedComponent } from './name.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NouisliderModule,
        HttpModule,
    ],
    exports: [
        CommonModule,
        HttpModule,
        FormsModule,
        NouisliderModule,
        ModalModule, //modalModule.forRoot() in app module
    ],
    declarations: [],
    providers: [],
})
export class SharedModule { }
