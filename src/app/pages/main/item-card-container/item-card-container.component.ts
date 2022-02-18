import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item-card-container',
  templateUrl: './item-card-container.component.html',
  styleUrls: ['./item-card-container.component.scss']
})
export class ItemCardContainerComponent implements OnInit {

  list$: Observable<Item[]> = new Observable<Item[]>()

  constructor(private iService: ItemService) { }

  ngOnInit(): void {
    this.list$ = this.iService.list$;
    this.iService.getAll()
  }

}
