import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';

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
    imageId: '',
    imageName: '',
  };
  subscription: Subscription = new Subscription();
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columns: string[] = ['name', 'category', 'tech', 'image', 'edit'];

  constructor(private iService: ItemService) {}

  ngOnInit(): void {
    this.list$ = this.iService.list$;
    this.subscription = this.iService.list$.subscribe((list)=> {
      this.dataSource = new MatTableDataSource(list);
      this.dataSource.paginator = this.paginator;
    })
    this.iService.getAll();
  }

  openDialog(doc: any, comp?: 'del' | 'edit'): void {
    // this.iService.create(doc) FOR TEST ONLY!!!
  }

  applyFilter(event: Event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(doc: Item):void {
   // this.iService.delete(doc) FOR TEST ONLY!!!
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
