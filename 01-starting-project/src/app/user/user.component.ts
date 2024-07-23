import { Component, Input, Output, EventEmitter, input } from '@angular/core';
import { User } from './user.model';

@Component({
    selector: 'app-user',
    standalone: false,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent {
  @Input({required: true}) user!: User;
  @Input({required: true}) selected !: boolean;
  @Output() select = new EventEmitter<string>(); // se puede acceder al valor emitido usando $event
  
  /*Con Signals: 
      quito los @Input, pero despues se usan igual pero con el "()" agregado 
      cuando las acceder del html
    avatar = input.required<string>();
    name = input.required<string>();
    AUNQUE hay que tener en cuenta que esas signals son read only, y no explicaron una alternativa
  */

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() { // Se llama al clickear el boton
    // Recibo el id como input, y lo paso (emito) al parent cuando se selecciona un user
    this.select.emit(this.user.id); // se puede acceder al valor emitido usando $event en el html del padre
  }
}
