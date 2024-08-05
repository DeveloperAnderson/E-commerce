import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/auth/user.service'; 
import { User } from '../../model/user.model'; 
import { ImportsModule } from './imports';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  providers: [UserService],
  imports: [ImportsModule]

})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isEditing: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => this.users = data,
      (error) => console.error('Error fetching users', error)
    );
  }

  selectUser(user: User): void {
    this.selectedUser = { ...user }; // Clonamos para editar sin afectar el original
    this.isEditing = true;
  }

/*   createUser(): void {
    this.selectedUser = {
      username: '',
      password: '',
      email: '',
      locked: false,
      disabled: false,
      roles: []
    };
     this.isEditing = true;
  }*/

  saveUser(): void {
    if (this.selectedUser) {
      if (this.users.find(u => u.username === this.selectedUser?.username)) {
        // Actualizar usuario existente
        this.userService.updateUser(this.selectedUser).subscribe(
          () => this.loadUsers(),
          (error) => console.error('Error updating user', error)
        );
      } else {
        // Crear nuevo usuario
        this.userService.createUser(this.selectedUser).subscribe(
          () => this.loadUsers(),
          (error) => console.error('Error creating user', error)
        );
      }
      this.cancelEdit();
    }
  }

  deleteUser(username: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(username).subscribe(
        () => this.loadUsers(),
        (error) => console.error('Error deleting user', error)
      );
    }
  }

  cancelEdit(): void {
    this.selectedUser = null;
    this.isEditing = false;
  }
}
