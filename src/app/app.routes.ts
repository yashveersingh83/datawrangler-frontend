import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UnauthorizeComponent } from './features/unauthorize/unauthorize.component';
import { DashboardComponent } from './features/analyst/dashboard/dashboard.component';
import { canActivateAuthRole } from './core/authentication/gaurds/auth.gaurd';


export const routes: Routes = [
    { path: '', component: DashboardComponent, canActivate: [canActivateAuthRole], data: { role: 'Analyst' } },

    { path: 'home', component: DashboardComponent, canActivate: [canActivateAuthRole], data: { role: 'Analyst' } },
    { path: 'analyst', loadChildren: () => import('./features/analyst/analyst.module').then(m => m.AnalystModule) },


    { path: 'coordinator', loadChildren: () => import('./features/coordinator/coordinator.module').then(m => m.CoordinatorModule) },


    { path: 'error', component: UnauthorizeComponent },
    { path: '**', component: UnauthorizeComponent } // For undefined routes



];
