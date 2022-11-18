import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = `http://localhost:`+environment.beckendPort +`/api/tasks`
  @Output() tasksArrived: Subject<any> = new Subject()
  @Output() successed: Subject<String> = new Subject()
  private tasks: Task[] = []

  constructor(private httpClient: HttpClient) { }

  postTasks(task: Task){
    this.httpClient.post(this.url, task)
    .subscribe(
      // next
    (data: any) => {
      console.log(data)
      this.successed.next('')
    },
      // error
      (error: any) => {
        console.error(error)
        this.successed.next(error.name)
    },
    // compplette
    () => {
      console.info('Added task')
  }
)
  }

  deleteTask(id: number){
    this.httpClient.delete(this.url+ '/' +id).subscribe(
      // next
      (data: any) => {
        console.log(data)
        this.tasks = this.tasks.filter(
          item => item.id !== id
        )
        this.tasksArrived.next(this.tasks)
      },

      // error
      (error: any) => {
       console.error(error)
      },

      // compplette
      () => {
      console.info('removed task')
      }
    )
  }

  getTasks(){
    this.httpClient.get(this.url).subscribe(
      // next
      (data: any) => {
         this.tasks = data
         this.tasksArrived.next(this.tasks)
      },
      // error
      (error: any) => {
       console.error(error)
       this.tasksArrived.next(this.tasks)
      },

      // compplette
      () => {
      
      console.info('we are done here')
      }
    )
  }

  updateTask(id: number, task: Task){
        
    this.httpClient.put(this.url + '/' +id, task).subscribe(
          // next
      (data: any) => {
        console.log(data)
        this.tasks = this.tasks.filter(
          item => item.id !== id
        )
        this.tasks.push(task)
        this.tasksArrived.next(this.tasks)
        this.successed.next('')
      },
  
        // error
        (error: any) => {
          console.error(error)
          this.successed.next(error.error.error.message)
      },
  
      // compplette
      () => {
        console.info('Updated task')
      }
    )
  }

  getTaskById(id: number){
    return this.tasks.find(x => x.id === id);
  }

}
