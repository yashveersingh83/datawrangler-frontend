import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { canActivateAuthRole } from '../authentication/gaurds/auth.gaurd';

import { ManagerComponent } from './manager/manager.component';
import { MilestonelistComponent } from './milestonelist/milestonelist.component';
import { InformationrequestComponent } from './informationrequest/informationrequest.component';

const routes: Routes = [

  { path: 'milestones', component: MilestonelistComponent }
  ,

  {
    path: 'manager',
    component: ManagerComponent, canActivate: [canActivateAuthRole], data: { role: 'Analyst' }
    //canActivate: [CoordinatorAuthGuard],
  },
  {    path: 'informationrequest',
    component: InformationrequestComponent    , canActivate: [canActivateAuthRole],data: { role: 'Analyst' }
    //canActivate: [CoordinatorAuthGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystRoutingModule { }
