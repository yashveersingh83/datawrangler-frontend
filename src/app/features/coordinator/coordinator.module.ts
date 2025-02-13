import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { DevExtremeModule, DxButtonModule} from 'devextreme-angular';
import { InformationrequestComponent } from './informationrequest/informationrequest.component';
import { SubmissionlistComponent } from './submissionlist/submissionlist.component';
import { CoordinatorlistComponent } from './coordinatorlist/coordinatorlist.component';


@NgModule({
  declarations: [InformationrequestComponent,SubmissionlistComponent, CoordinatorlistComponent],
  imports: [DevExtremeModule,DxButtonModule,
    CommonModule,
    CoordinatorRoutingModule,
  ]
})
export class CoordinatorModule { }
