import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




import { ManagerComponent } from './manager/manager.component';
import { MilestonelistComponent } from './milestonelist/milestonelist.component';
import { InformationrequestComponent } from './informationrequest/informationrequest.component';
import { canActivateAuthRole } from '../../core/authentication/gaurds/auth.gaurd';
import { UnauthorizeComponent } from '../unauthorize/unauthorize.component';

const routes: Routes = [

  { path: 'milestones', component: MilestonelistComponent }
  ,

  {
    path: 'manager',
    component: ManagerComponent, canActivate: [canActivateAuthRole], data: { role: ['Analyst', 'Approver','Coordinator'] }
    //canActivate: [CoordinatorAuthGuard],
  },
  {    path: 'informationrequest',
    component: InformationrequestComponent    , canActivate: [canActivateAuthRole],data: { role: ['Analyst', 'Approver','Coordinator'] }
    //canActivate: [CoordinatorAuthGuard],
  },
  { path: 'error', component: UnauthorizeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystRoutingModule { }
