import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() drawer: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn
  }

  onLogout() {
    this.authService.logout();
  }
}
