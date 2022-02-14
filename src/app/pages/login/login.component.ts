import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  errorMessage: string = '';
  isLoading: boolean = false;
  error: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

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
