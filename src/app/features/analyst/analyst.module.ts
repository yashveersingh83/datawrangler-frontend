import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DevExtremeModule, DxButtonModule} from 'devextreme-angular';
import { AnalystRoutingModule } from './analyst-routing.module';
import { MilestonelistComponent } from './milestonelist/milestonelist.component';
import { ManagerComponent } from './manager/manager.component';
import { sharedModule } from '../../shared/common-module';



@NgModule({
  declarations: [ManagerComponent,MilestonelistComponent],
  imports: [DevExtremeModule,DxButtonModule,
    CommonModule,
    AnalystRoutingModule,sharedModule
  ]
})
export class AnalystModule { }
