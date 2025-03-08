import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { DevExtremeModule, DxButtonModule} from 'devextreme-angular';

import { SubmissionlistComponent } from './submissionlist/submissionlist.component';
import { CoordinatorlistComponent } from './coordinatorlist/coordinatorlist.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubmissionlistComponent, 
    CoordinatorlistComponent, 
    
    ],
  imports: [DevExtremeModule,DxButtonModule,
    CommonModule,FormsModule,ReactiveFormsModule,
    CoordinatorRoutingModule,
  ]
})
export class CoordinatorModule { }
