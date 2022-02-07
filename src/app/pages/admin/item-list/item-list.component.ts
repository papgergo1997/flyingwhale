import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  list$: Observable<Item[]> = new Observable<Item[]>();
  testitem: Item = {
    id: '0',
    name: 'sampleItem',
    description: 'sampleItem description',
    category: 'sampleItem category',
    tech: 'sampleItem technique',
    image: 'sampleItem.jpg',
    imageId: 'sampleItem00001',
    imageName: 'sampleItem image name',
  };

  constructor(private iService: ItemService) {
    this.list$ = this.iService.list$;
    this.iService.getAll();
  }

  create(){
    this.iService.create(this.testitem)
  }
  delete(doc: any){
    this.iService.delete(doc)
  }

  ngOnInit(): void {}
}
