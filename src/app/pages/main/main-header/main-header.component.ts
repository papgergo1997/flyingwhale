import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {

 currentUser: boolean = true;
  @Input() drawer: any;

  constructor() { }

  ngOnInit(): void {
    // this.currentUser = JSON.parse(localStorage.getItem('user'))
  }

}
