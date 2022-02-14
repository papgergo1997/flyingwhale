import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './pages/admin/item-list/item-list.component';
import { CategoryListComponent } from './pages/admin/category-list/category-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService, LoginGuardService } from './service/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
  {path: 'home', component: HomeComponent},
  { path: 'items', component: ItemListComponent, canActivate: [AuthGuardService] },
  { path: 'categorys', component: CategoryListComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
