import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { formAnim, list } from 'src/app/shared/animations/animations';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive'; 
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [list, formAnim]
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = []
  deleteDialog = ''
  @ViewChild(PlaceholderDirective, { static: false }) alertHost!: PlaceholderDirective;
  private closeSub!: Subscription;
  private taskServiceSub!: Subscription
  isLoading = false
 

  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.isLoading = true
    this.taskServiceSub =  this.taskService.tasksArrived
    .subscribe(
      (tasks: Task[]) => {
        this.isLoading = false
        this.tasks = tasks
      })
    
    this.taskService.getTasks();
 
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
   this.taskServiceSub.unsubscribe()
  }


  showErrorAlert(message: string, id: number){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeButton.subscribe((b: boolean) => {
      if(b){
        this.taskService.deleteTask(id)
      }
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });

    
  }
  
  onUpdate(id: number){
    this.router.navigate(['../task', id, 'edit'], {relativeTo: this.route})
  }

}
