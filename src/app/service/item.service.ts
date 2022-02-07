import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../model/item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  list$: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  URL: string =
    'https://flyingwhale-625ae-default-rtdb.europe-west1.firebasedatabase.app/items';

  constructor(private http: HttpClient) {
    this.getAll()
  }

  getAll(): void {
    this.http
      .get(`${this.URL}.json`)
      .pipe(
        map((resp) => {
          const arr = [];
          for (const key in resp) {
            if (resp.hasOwnProperty(key)) {
              arr.push({ ...resp[key], id: key });
            }
          }
          return arr;
        })
      )
      .subscribe((list) => this.list$.next(list));
  }

  create(doc: Item): void {
    this.http
      .post<Item>(`${this.URL}.json`, doc)
      .subscribe(() => this.getAll());
  }

  update(doc: Item): void {
    this.http
      .patch(`${this.URL}/${doc.id}.json`, doc)
      .subscribe(() => this.getAll());
  }
  delete(doc: Item): void {
    this.http
      .delete(`${this.URL}/${doc.id}.json`)
      .subscribe(() => this.getAll());
  }
}
