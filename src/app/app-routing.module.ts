import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './pages/admin/item-list/item-list.component';
import { CategoryListComponent } from './pages/admin/category-list/category-list.component';

const routes: Routes = [{ path: 'items', component: ItemListComponent },{path:'categorys', component: CategoryListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
