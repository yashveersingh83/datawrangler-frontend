import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformationrequestComponent } from './informationrequest/informationrequest.component';
import { SubmissionlistComponent } from './submissionlist/submissionlist.component';
//import { CoordinatorAuthGuard } from './guards/coordinator-auth.gaurd';
import { CoordinatorlistComponent } from './coordinatorlist/coordinatorlist.component';
import { canActivateAuthRole } from '../authentication/gaurds/auth.gaurd';

const routes: Routes = [
   
    {    path: 'submission',
      component: SubmissionlistComponent    , canActivate: [canActivateAuthRole],data: { role: 'Analyst' }
      //canActivate: [CoordinatorAuthGuard],
    },

    {    path: 'recepient',
      component: CoordinatorlistComponent    , canActivate: [canActivateAuthRole],data: { role: 'Analyst' }
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
export class CoordinatorRoutingModule { }
