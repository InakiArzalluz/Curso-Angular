import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'; // Necesario al usar Modules
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';

// "Los modulos son la cosa que vas a usar para agrupar componentes juntos: ¿?" Es un horror.

@NgModule({
    //declarations: Aca se registran los componentes que tienen que funcionar juntos (excepto los standalone)
    declarations: [
        AppComponent,
        HeaderComponent,
        UserComponent,
    ],
    bootstrap: [AppComponent], // Indico cuales son los root Components (con los que iniciar la aplicacion)
    //imports: los mismo que declarations, pero para standalone components
    imports: [BrowserModule, SharedModule, TasksModule], 
    // BrowserModule incluye DatePipe
    // FormsModule es el que me permite usar ngModule

})
export class AppModule{

}