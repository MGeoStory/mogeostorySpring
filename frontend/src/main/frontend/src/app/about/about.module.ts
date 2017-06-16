import { NgModule } from '@angular/core';

import { AboutComponent } from './about.component';
import { AboutRouting } from './about.routing';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  imports: [
    SharedModule,
    AboutRouting
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
