import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Input() drawer: any;

  constructor(private authService: AuthService
  ) { }

  ngOnInit(): void {

  }

  isLoggedIn(){
    return this.authService.isLoggedIn;
  }

  logout(): void{
    this.authService.logout();
  }

}
