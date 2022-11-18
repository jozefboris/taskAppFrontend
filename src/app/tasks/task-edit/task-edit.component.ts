import { DatePipe, LocationStrategy } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addSuccess, formAnim, list } from 'src/app/shared/animations/animations';
import { TaskService } from 'src/app/shared/services/task.service';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  animations: [formAnim, addSuccess]
})
export class TaskEditComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup

  editMode = false
  id!: number
  isSucess = false
  successMessage = 'Successful created'
  isLoading = false
  sucessSub!: Subscription

  constructor(private taskService: TaskService, private router: Router,
    private route: ActivatedRoute, private location: LocationStrategy) { 
      
    }

  ngOnInit(): void 
  {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null;
        
      }
    );
 
    this.initForm()
  }

  ngOnDestroy(): void {
    if(this.sucessSub){
      this.sucessSub.unsubscribe()
    }
  }

  initForm(){
    let title = ''
    let description = ''
    let deadline = new Date()
    let subtasks = new FormArray([])

    if(this.editMode){
      this.successMessage = 'Successful updated'
      const task = this.taskService.getTaskById(this.id);
      if(!task){
        this.router.navigate(['/task'], {relativeTo: this.route})
      }
      title = task!.title
      description = task!.description
      deadline = new Date(task!.deadline)
      
      title = task!.title

      if(task!['subtasksList']){
        for (let subtask of task!.subtasksList){
          console.log(subtask)
          subtasks.push(
            new FormGroup({
              'title': new FormControl(subtask.title, Validators.required)
            })
          )
        }

    }
  }
   let localCompleteDate = deadline.toISOString();
   localCompleteDate = localCompleteDate.substring(0, localCompleteDate.length - 5 );

    this.taskForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description),
      'deadline': new FormControl(localCompleteDate),
      'subtasks': subtasks});

}
  onSubmit(){  
    const title = this.taskForm.value['title']
    const description = this.taskForm.value['description']
    const deadline = this.taskForm.value['deadline']
    const subtasks = this.taskForm.value['subtasks']
    const task = new Task(1, title, description, deadline, subtasks)

    if(this.editMode){
      this.taskService.updateTask(this.id, task)
    } else{
       this.taskService.postTasks(task)
    }
    this.isLoading = true
    this.sucessSub = this.taskService.successed.subscribe(
      (params: String) => {
          if(!params){
            this.isSucess = true
            this.taskForm.reset();
            if(this.editMode){
              this.router.navigate(['/list'], {relativeTo: this.route})
            }
          } else {
            alert(params);
            
          }
      
        this.isLoading = false
      }
    );
  
    
    (<FormArray>this.taskForm.get('subtasks')).clear()
    
  }

  onAddSubtask(){
    (<FormArray>this.taskForm.get('subtasks')).push(
      new FormGroup({
        'title': new FormControl(null, Validators.required)
      })
    )
  }

  onDeleteTask(index: number){
    (<FormArray>this.taskForm.get('subtasks')).removeAt(index)

  }

  controls() { // a getter!
    return (<FormArray>this.taskForm.get('subtasks')).controls;
  }

  animationStarted(event: any) {
    console.log('start anim')
 
  }

  animationEnded(event: any) {
    console.log('finish anim')
    this.isSucess = false
  }

}
