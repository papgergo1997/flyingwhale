import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {
  AuthGuardService,
  LoginGuardService,
} from './service/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then((m)=>m.MainModule)},

  {
    path: 'admin',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
