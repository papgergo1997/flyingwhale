import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit {
  @Input() drawer: any;
  counter: number = 0;

  constructor(private authService: AuthService
  ) { }

  ngOnInit(): void {
   this.authService.expirationCounter.subscribe((num)=>{
     this.counter = num
   })
  }
  isLoggedIn(){
    return this.authService.isLoggedIn;
  }

  logout(): void{
    this.authService.logout();
  }
  onRightClick(event: any){
    return false
  }

}
