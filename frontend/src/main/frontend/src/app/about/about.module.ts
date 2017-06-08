import { NgModule } from '@angular/core';

import { AboutComponent }   from './about.component';
import {AboutRouting}  from './about.routing';

@NgModule({
  imports: [AboutRouting],
  declarations: [AboutComponent]
})
export class AboutModule {}
