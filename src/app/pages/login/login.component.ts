import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  currentUser: any;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  errorMessage: string = '';
  isLoading: boolean = false;
  error: string;
  subscription: Subscription = new Subscription()

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
   this.subscription =  this.authService.currentUser.subscribe((user)=> this.currentUser = user)
  }

  login() {
    this.isLoading = true;
    this.authService
      .login(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      )
      .subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
          // localStorage.setItem('user', JSON.stringify(this.currentUser));
          // JSON.parse(localStorage.getItem('user')||'null');
          this.router.navigate(['/about'])
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage
          this.isLoading = false;
        }
      );
    // let user;
    // this.authService.auth(
    //   this.loginForm.get('email')?.value,
    //   this.loginForm.get('password')?.value
    // );
    // user = JSON.parse(localStorage.getItem('user'));
    // if (user == null) {
    //   this.errorMessage = 'Wrong email or password';
    //   console.error(this.errorMessage);
    // } else {
    //   return;
    // }
  }
}
