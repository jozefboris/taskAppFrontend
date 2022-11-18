import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.model'; 
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user = new User('', '')
  isLoading = false
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  registerUser(form: NgForm): void {
   
    if(form.value.pass1 === form.value.pass2){
      this.isLoading = true;
      this.user.login = form.value.login;
      this.user.password = form.value.pass1;
     
      this.authService.registration(this.user).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['login'])
        },
        errorMessage => {
          console.log(errorMessage);
          alert(errorMessage)
          this.isLoading = false;
        }
      );
    }
  }

}
