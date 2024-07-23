import { NgModule } from "@angular/core";
import { TasksComponent } from "./tasks.component";
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
    // todos los componentes relacionados, que tienen que trabajar juntos.
    declarations: [ TasksComponent, TaskComponent, NewTaskComponent], 
    // solo exporto los componentes que tambien son usados FUERA de este modulo.
    exports: [ TasksComponent ],
    // Los modulos que YO necesito para que funcionen mis componentes de declarations
    imports: [ SharedModule, CommonModule, FormsModule ],
})
export class TasksModule{}