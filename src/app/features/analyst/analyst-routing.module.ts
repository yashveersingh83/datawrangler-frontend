import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerComponent } from './manager/manager.component';
import { MilestonelistComponent } from './milestonelist/milestonelist.component';
import { InformationrequestComponent } from './informationrequest/informationrequest.component';
import { canActivateAuthRole } from '../../core/authentication/gaurds/auth.gaurd';
import { UnauthorizeComponent } from '../unauthorize/unauthorize.component';
import { InfoRequestAddComponent } from './info-request-add/info-request-add.component';
import { AddEditInforequestComponent } from './add-edit-inforequest/add-edit-inforequest.component';

const routes: Routes = [
  { path: 'milestones', component: MilestonelistComponent },

  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [canActivateAuthRole],
    data: { role: ['Analyst', 'Approver', 'Coordinator'] }
  },

  {
    path: 'informationrequest',  // Parent route: no component, only child routes
    component: InformationrequestComponent,  // InformationrequestComponent will be rendered only if no child routes are matched
    canActivate: [canActivateAuthRole],
    data: { role: ['Analyst', 'Approver', 'Coordinator'] },
    children: [
      {
        path: ':id',  // Child route for specific request id
        component: InfoRequestAddComponent, // Render the AddEditInforequestComponent for specific request ID
        canActivate: [canActivateAuthRole],
        data: { role: ['Analyst', 'Approver', 'Coordinator'] }
      },
      {
        path: 'new',  // Child route for creating new request
        component: InfoRequestAddComponent,  // Render the AddEditInforequestComponent for new request
        canActivate: [canActivateAuthRole],
        data: { role: ['Analyst', 'Approver', 'Coordinator'] }
      }
    ]
  },

  { path: 'error', component: UnauthorizeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalystRoutingModule { }
