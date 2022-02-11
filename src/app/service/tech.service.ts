import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tech } from '../model/tech';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class TechService extends BaseService<Tech>  {

  constructor(public http: HttpClient) {
    super(http, 'techs');
   }
}
