import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListComponent } from './item-list/item-list.component';
import { NgxPhotoEditorModule } from 'ngx-photo-editor';
import { AdminComponent } from './admin.component';
import { ItemEditComponent } from './item-list/item-edit/item-edit.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-list/category-edit/category-edit.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { AdminRoutingModule } from './admin-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './admin-header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
  declarations: [
    AdminComponent,
    ItemListComponent,
    ItemEditComponent,
    CategoryListComponent,
    CategoryEditComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    NgxPhotoEditorModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSidenavModule
  ],
  exports: [NgxPhotoEditorModule],
  providers: [],
  bootstrap: [AdminComponent],
  entryComponents: [ItemEditComponent, CategoryEditComponent],
})
export class AdminModule {}
