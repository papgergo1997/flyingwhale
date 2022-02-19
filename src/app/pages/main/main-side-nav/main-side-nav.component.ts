import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main-side-nav',
  templateUrl: './main-side-nav.component.html',
  styleUrls: ['./main-side-nav.component.scss']
})
export class MainSideNavComponent implements OnInit {


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn;
  }

  logout(): void{
    this.authService.logout();
  }

}
