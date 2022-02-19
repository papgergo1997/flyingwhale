import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './pages/admin/item-list/item-list.component';
import { CategoryListComponent } from './pages/admin/category-list/category-list.component';
import { HomeComponent } from './pages/main/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService, LoginGuardService } from './service/auth-guard.service';
import { AboutComponent } from './pages/main/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuardService]},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  { path: 'items', component: ItemListComponent, canActivate: [AuthGuardService] },
  { path: 'categorys', component: CategoryListComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
