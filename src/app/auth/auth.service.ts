import { Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user.model';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class AuthService {
  user = new BehaviorSubject<User>(null!);
  private url: string = `http://localhost:` +environment.beckendPort +`/api/user`
  constructor(private httpClient: HttpClient) { }

  registration(user: User){
    return this.httpClient.post<User>(this.url + '/registration', user).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.login,
          resData.password
        );
      })
    );

  }

  login(user: User){
    return this.httpClient.post<User>(this.url + '/signin', user).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.login,
          resData.password
        );
      })
    );
  }

  autoLogin() {
    const userData: {
      login: string;
      password: string
    } = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.login,
      userData.password
    );

    if (loadedUser) {
      this.user.next(loadedUser);
    }

 
  }

  logOut(){
    this.user.next(null!)
    localStorage.removeItem('userData');
  }

  private handleAuthentication(
    username: string,
    password: string
   
  ) {
    const user = new User(username, password);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'This login already exist!';
    if (!errorRes.error || !errorRes.error.error) {
     
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

}