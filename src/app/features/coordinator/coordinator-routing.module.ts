import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SubmissionlistComponent } from './submissionlist/submissionlist.component';
//import { CoordinatorAuthGuard } from './guards/coordinator-auth.gaurd';
import { CoordinatorlistComponent } from './coordinatorlist/coordinatorlist.component';
import { canActivateAuthRole } from '../../core/authentication/gaurds/auth.gaurd';
import { UnauthorizeComponent } from '../unauthorize/unauthorize.component';


const routes: Routes = [
   
    {    path: 'submission',
    component: SubmissionlistComponent, canActivate: [canActivateAuthRole], data: { role: ['Analyst', 'Approver','"Coordinator"']}
      //canActivate: [CoordinatorAuthGuard],
    },

    {    path: 'recepient',
      component: CoordinatorlistComponent, canActivate: [canActivateAuthRole], data: { role: ['Analyst', 'Approver', '"Coordinator"'] }
      //canActivate: [CoordinatorAuthGuard],
    },
      { path: 'error', component: UnauthorizeComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinatorRoutingModule { }
