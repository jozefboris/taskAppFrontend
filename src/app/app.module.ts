import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list/task-list.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthComponent } from './auth/auth.component'; 
import { HeaderComponent } from './header/header/header.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './shared/alert/alert.component';
import {HttpClientModule} from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { AuthGuard } from './auth/authGuard';
import { SortPipe } from './shared/pipes/sort.pipe';
import { DatePipe } from '@angular/common';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TasksComponent,
    AuthComponent,
    HeaderComponent,
    TaskEditComponent,
    AlertComponent,
    PlaceholderDirective,
    LoginComponent,
    RegistrationComponent,
    SortPipe,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  entryComponents: [AlertComponent],
  providers: [AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
