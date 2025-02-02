import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './features/authentication/gaurds/auth.gaurd';
import { UnauthorizeComponent } from './features/unauthorize/unauthorize.component';


export const routes: Routes = [
{    path: 'home',
    component: AppComponent    ,
    canActivate: [AuthGuard],
  },
  { path: 'error', component: UnauthorizeComponent },
  { path: '', redirectTo: 'protected', pathMatch: 'full' },
  { path: '**', redirectTo: 'error' },

];
