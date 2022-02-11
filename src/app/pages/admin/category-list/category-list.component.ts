import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { CategoryEditComponent } from './category-edit/category-edit.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  category: Category = {
    id: '',
    name: '',
    description: '',
  };
  subscription: Subscription = new Subscription();
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columns: string[] = ['name', 'description', 'edit'];

  constructor(private catService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscription = this.catService.list$.subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
    });
    this.catService.getAll();
  }
  openDialog(doc: any, comp?: 'del' | 'edit'): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = doc;
    this.dialog.open(CategoryEditComponent, dialogConfig);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onDelete(doc: Category): void {
    this.catService.delete(doc);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
