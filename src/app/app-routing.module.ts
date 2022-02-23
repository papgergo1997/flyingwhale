import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {
  AuthGuardService,
  LoginGuardService,
} from './service/auth-guard.service';
import { AboutComponent } from './pages/main/about/about.component';
import { ItemPageComponent } from './pages/main/item-page/item-page.component';
import { GreetPrintComponent } from './pages/main/greet-print/greet-print.component';
import { BagsComponent } from './pages/main/bags/bags.component';
import { CalendarsComponent } from './pages/main/calendars/calendars.component';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  { path: 'calendars', component: CalendarsComponent },
  { path: 'calendars/:id', component: ItemPageComponent },
  { path: 'bags', component: BagsComponent },
  { path: 'bags/:id', component: ItemPageComponent },
  { path: 'greet-print', component: GreetPrintComponent },
  { path: 'greet-print/:id', component: ItemPageComponent },
  { path: 'about', component: AboutComponent },
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
