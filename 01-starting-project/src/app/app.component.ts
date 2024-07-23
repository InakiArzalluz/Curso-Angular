import { Component } from '@angular/core';
import { DUMMY_USERS } from './user/dummy-users';
import { User } from './user/user.model';

@Component({
  selector: 'app-root',
  standalone: false,
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users: User[] = DUMMY_USERS; // Para hacer visible DUMMY_USERS en el html
  selectedUserId?: string;
  
  onSelectUser(id: string) {
    // abrir el menu con info, a partir del id
    this.selectedUserId = id;
  }

  get selectedUser(): (User) {
    return this.users.find( (user) => user.id === this.selectedUserId) ?? DUMMY_USERS[0];
  }
}
