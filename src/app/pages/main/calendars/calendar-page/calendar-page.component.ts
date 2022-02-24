import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.scss']
})
export class CalendarPageComponent implements OnInit {

  item$: Observable<Item> = new Observable<Item>();


  constructor(private activatedRoute: ActivatedRoute, private iService: ItemService) { }

  ngOnInit(): void {
    this.item$ = this.activatedRoute.params.pipe(
      switchMap(params=> {
        console.log(params)
        return this.iService.get(params.id)})
    )
  }



}
