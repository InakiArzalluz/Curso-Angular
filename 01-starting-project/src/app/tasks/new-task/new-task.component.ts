import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: false,
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Output() close = new EventEmitter<void>();
  @Input({required: true}) userId!: string;
  enteredTitle: string = '';
  enteredSummary: string = '';
  enteredDate: string = '';
  private tasksService: TasksService = inject(TasksService); // Dependency Injection

  onCancelAddTask(){
    this.close.emit();
  }

  onSubmitTask(){
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        date: this.enteredDate,
      },
      this.userId,
    );
    this.close.emit();
  }
}
