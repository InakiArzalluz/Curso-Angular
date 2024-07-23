import { Component, Input } from '@angular/core';
import { Task } from './task/task.model';
import { User } from '../user/user.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({required: true}) user !: User;
  isAddingTask: boolean = false;

  constructor( private tasksService: TasksService) { // Dependency Injection
    // el private es un shortcut. Al final del dia es un atributo privado de la clase
  }

  get userTasks() : Task[]{ 
    return this.tasksService.getUserTasks(this.user.id);
  }

  onStartAddTask(){
    this.isAddingTask = true;
  }

  onCloseAddTask(){
    this.isAddingTask = false;
  }
}
