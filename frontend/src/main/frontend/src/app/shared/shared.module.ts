import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { ModalModule } from 'ng2-bootstrap';
// import { SharedComponent } from './name.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NouisliderModule,
        // ModalModule.forRoot()
        
    ],
    exports: [
        CommonModule,
        FormsModule,
        NouisliderModule,
        ModalModule
    ],
    declarations: [],
    providers: [],
})
export class SharedModule { }
