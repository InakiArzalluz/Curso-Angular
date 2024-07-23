import { Injectable } from "@angular/core";
import { dummyTasks } from "./dummy-tasks";
import { NewTaskData, Task } from "./task/task.model";

@Injectable( {providedIn: 'root'} ) // Va a estar disponible para todos los que la pidan.
export class TasksService {
    private tasks: Task[] = dummyTasks;

    constructor() {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            // Se guardaron en json
            this.tasks = JSON.parse(tasks);
        }
    }

    getUserTasks(userId: string): Task[] {
        return this.tasks.filter((task) => task.userId === userId);
    }

    addTask(taskdata: NewTaskData, userId: string){
        this.tasks.push({
            id: new Date().getTime().toString(),
            userId: userId,
            title: taskdata.title,
            summary: taskdata.summary,
            dueDate: taskdata.date,
          });
        this.saveTasks();
    }

    removeTask(id: string){
        this.tasks = this.tasks.filter((task) => task.id !== id);
        this.saveTasks();
    }

    private saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}