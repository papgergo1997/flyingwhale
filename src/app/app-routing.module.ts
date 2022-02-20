import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import {
  AuthGuardService,
  LoginGuardService,
} from './service/auth-guard.service';
import { AboutComponent } from './pages/main/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    loadChildren: ()=>
    import('./pages/admin/admin.module').then((m)=>m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
