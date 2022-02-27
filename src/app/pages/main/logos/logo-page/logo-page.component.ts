import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Item } from 'src/app/model/item';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-logo-page',
  templateUrl: './logo-page.component.html',
  styleUrls: ['./logo-page.component.scss']
})
export class LogoPageComponent implements OnInit {

  item$: Observable<Item> = new Observable<Item>();


  constructor(private activatedRoute: ActivatedRoute, private iService: ItemService) { }

  ngOnInit(): void {
    this.item$ = this.activatedRoute.params.pipe(
      switchMap(params=> {
        return this.iService.get(params.id)})
    )
  }

}
