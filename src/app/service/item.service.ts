import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../model/item';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends BaseService<Item> {
  constructor(public http: HttpClient) {
    super(http, 'items');
  }
}
