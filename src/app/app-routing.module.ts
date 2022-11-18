import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/authGuard';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { TaskListComponent } from './task-list/task-list/task-list.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TasksComponent } from './tasks/tasks.component';

//views


const routes: Routes = [
  { path: '', redirectTo: '/task', pathMatch: 'full' },
  { path: 'task', component: TasksComponent, children: [
    {path: '', component: TaskEditComponent},
    {path: ':id/edit', component: TaskEditComponent}
], canActivate : [AuthGuard]},
{ path: 'list', component: TaskListComponent, canActivate : [AuthGuard] },

{ path: '', component: AuthComponent, children: [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent}
]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
