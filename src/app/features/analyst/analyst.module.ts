import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DevExtremeModule, DxButtonModule} from 'devextreme-angular';
import { AnalystRoutingModule } from './analyst-routing.module';
import { MilestonelistComponent } from './milestonelist/milestonelist.component';
import { ManagerComponent } from './manager/manager.component';
import { sharedModule } from '../../shared/common-module';
import { MilestoneModalComponent } from './milestone-modal/milestone-modal.component';
import { InformationrequestComponent } from './informationrequest/informationrequest.component';
import { InfoRequestAddComponent } from './info-request-add/info-request-add.component';
import { ManagerAddEditComponent } from './manager/manager-add-edit/manager-add-edit.component';



@NgModule({
  declarations: [ManagerComponent,MilestonelistComponent, 
    InformationrequestComponent,InfoRequestAddComponent,
    MilestoneModalComponent,
    ManagerAddEditComponent],
  imports: [DevExtremeModule,DxButtonModule,
    CommonModule,
    AnalystRoutingModule,sharedModule
  ]
})
export class AnalystModule { }
