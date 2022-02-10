import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';
import { ItemEditComponent } from './item-edit/item-edit.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  list$: Observable<Item[]> = new Observable<Item[]>();

  item: Item = {
    id: '0',
    name: '',
    description: '',
    category: '',
    tech: '',
    image: '',
    previewImage: '',
    imageId: '',
    imageName: '',
  };
  subscription: Subscription = new Subscription();
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columns: string[] = ['name', 'category', 'tech', 'previewImage', 'edit'];

  constructor(
    private iService: ItemService,
    private dialog: MatDialog,
    private phUService: PhotoUploadService
  ) {}

  ngOnInit(): void {
    this.list$ = this.iService.list$;
    this.subscription = this.iService.list$.subscribe((list) => {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
    });
    this.iService.getAll();
  }

  openDialog(doc: any, comp?: 'del' | 'edit'): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = doc;
    this.dialog.open(ItemEditComponent, dialogConfig);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(doc: Item): void {
    this.iService.delete(doc);
    this.phUService.deleteImages(
      doc.imageName[doc.imageName.length - 1],
      doc.imageId[doc.imageId.length - 1],
      doc.imageName[doc.imageName.length - 2],
      doc.imageId[doc.imageId.length - 2]
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
