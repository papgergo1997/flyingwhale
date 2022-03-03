import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/model/item';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input() item: Item;
  images: any;

  constructor() { }

  ngOnInit(): void {

  }
  onRightClick(event: any){
    return false
  }

}
