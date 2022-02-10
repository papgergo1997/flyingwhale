import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends { id: string }> {
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  URL: string = '';
  baseURL: string =
    'https://flyingwhale-625ae-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(
    public http: HttpClient,
    @Inject('entityName') entityName: string
  ) {
    this.URL = `${this.baseURL}/${entityName}`;
    this.getAll();
  }

  getAll():void {
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

  create(doc: T): void {
    this.http
      .post<T>(`${this.URL}.json`, doc)
      .subscribe(() => this.getAll());
  }

  update(doc: T): void {
    this.http
      .patch(`${this.URL}/${doc.id}.json`, doc)
      .subscribe(() => this.getAll());
  }

  delete(doc: T): void {
    this.http
      .delete(`${this.URL}/${doc.id}.json`)
      .subscribe(() => this.getAll());
  }

}
