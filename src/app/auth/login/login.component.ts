import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.model'; 
import { AuthService } from 'src/app/auth/auth.service'; 
@Component({
  selector: 'the-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new User('', '')
  sucessSignIn: boolean = false
  isLoading = false
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  loginUser(form: NgForm):void{
    this.isLoading = true
    this.user.login = form.value.login;

    this.user.password = form.value.pass;
    this.authService.login(this.user);

    this.authService.login(this.user).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/task'])
      },
      errorMessage => {
        console.log(errorMessage);
        alert(errorMessage)
        this.isLoading = false;
      }
      );
        
  }
}
