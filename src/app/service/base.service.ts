import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T extends { id: string }> {
  list$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  URL: string = '';
  currentUser: any;
  baseURL: string =
    'https://flyingwhale-625ae-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(
    public http: HttpClient,
    public authService: AuthService,
    @Inject('entityName') entityName: string
  ) {
    this.URL = `${this.baseURL}/${entityName}`;
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.getAll();
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
    //  this.authService.currentUser
    //    .pipe(
    //      take(1),
    //      exhaustMap((user) => {
    //        return this.http.get(`${this.URL}.json?auth=${user.token}`);
    //      }),
    //      map((resp) => {
    //        const arr = [];
    //        for (const key in resp) {
    //          if (resp.hasOwnProperty(key)) {
    //            arr.push({ ...resp[key], id: key });
    //          }
    //        }
    //        return arr;
    //      })
    //    )
    //    .subscribe((list) => this.list$.next(list));
  }

  get(id: string): Observable<any>{
   return this.http.get(`${this.URL}/${id}.json`)
  }

  create(doc: T): void {
    this.http
      .post<T>(`${this.URL}.json?auth=${this.currentUser._token}`, doc)
      .subscribe(() => this.getAll());
    // this.authService.currentUser
    //   .pipe(
    //     take(1),
    //     exhaustMap((user) => {
    //       return this.http.post<T>(`${this.URL}.json?auth=${user.token}`, doc);
    //     })
    //   )
    //
  }

  update(doc: T): void {
    this.http
      .patch(`${this.URL}/${doc.id}.json?auth=${this.currentUser._token}`, doc)
      .subscribe(() => this.getAll());
  }

  delete(doc: T): void {
    this.http
      .delete(`${this.URL}/${doc.id}.json?auth=${this.currentUser._token}`)
      .subscribe(() => this.getAll());
  }
}
