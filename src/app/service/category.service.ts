import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<Category>  {
  constructor(public http: HttpClient, public authService: AuthService) {
    super(http, authService,'categorys');
   }
}
