import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/auth/user.service'; 
import { User } from '../../model/user.model'; 
import { ImportsModule } from './imports';

import { DialogModule } from 'primeng/dialog';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../../services/auth/token.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  standalone: true,
  providers: [UserService,ToastrService],
  imports: [ImportsModule]

})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  selectedUser: any = {};
  isEditing: boolean = false;
  isCreating: boolean = false;
  visible: boolean = false;
  update: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private tokenService: TokenService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  showDialog() {
    console.log('showDialog');
    this.visible = true;
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

  createUser(): void {
    this.isCreating = true;
    this.visible = true;
    this.selectedUser = {};
  }

  saveUser(): void {
    
    console.log('Save user:', this.isEditing);
    if(this.isEditing){
      console.log('Edit user:', this.selectedUser);
      // Actualizar usuario existente
      this.userService.updateUser(this.selectedUser).subscribe({
        next: (data) => {
          this.toastr.success('Actualizado con éxito');
  
          // Encuentra el índice del usuario seleccionado en la lista
          const index = this.users.findIndex(u => u.username === this.selectedUser.username);
          if (index !== -1) {
            // Actualiza el usuario en la lista
            this.users[index] = { ...this.selectedUser };
            console.log('Usuario actualizado:', this.selectedUser);
            this.update = true; 
          }
          this.visible = false; // Ocultar el diálogo
          this.isEditing = false;
        },
        
        error: (error) => {
          console.log('status ' ,error.status);
          var code = error.status;
          if(code == 403){
            this.toastr.warning('Usted no esta permito realizar esta accion', 'Advertencia');
          }else if(code == 500 || code == 0){
            this.toastr.error('Error en el servidor', 'Error');
          }
          console.log('error ' ,error);
          this.loadUsers();
          
        },
        complete() {
          console.info('complete');
        },
      
      });

    }

    if (this.isCreating) {

      
      console.log('Crear usuario:', this.selectedUser);
      
      if(this.selectedUser.username == undefined ||
         this.selectedUser.email == undefined ||
         this.selectedUser.locked == undefined||
         this.selectedUser.disabled == undefined ||
         this.selectedUser.roles == undefined ||
         this.selectedUser.password == undefined){
          this.toastr.warning('Por favor llene todos los campos', 'Advertencia');
        
      }else{

          
        var locked = this.selectedUser.locked;
        var disabled = this.selectedUser.disabled;
        if(locked == undefined){
          this.selectedUser.locked = false;
        }
        if(disabled == undefined){
          this.selectedUser.disabled = false;
        }
  
        if (!Array.isArray(this.selectedUser.roles)) {
          this.selectedUser.roles = this.selectedUser.roles.split(',');
          console.log('role splitaiadoos:', this.selectedUser.roles);
        }
        
        // Crear un nuevo usuario
        this.userService.createUser(this.selectedUser).subscribe({
          next: (data) => {
            this.toastr.success('Creado con éxito');
            this.users.push({ ...this.selectedUser }); // Agregar el nuevo usuario a la lista
            this.visible = false; // Ocultar el diálogo
          },
          error: (error) => {
            console.log('status ' ,error.status);
            var code = error.status;
            if(code == 403){
              this.toastr.warning('Usted no esta permito realizar esta accion', 'Advertencia');
            }else if(code == 500 || code == 0){
              this.toastr.error('Error en el servidor', 'Error');
            }
            console.log('error ' ,error);
            this.loadUsers();
            this.isCreating = false;
            this.visible = false;
          },
          complete() {
            console.info('complete');
          },
        
        });
      }
  
  
    }
  }

  editar(user: User): void {
    console.log('Editar:');
    this.selectedUser = user;
    this.isEditing = true;
    this.visible = true;

  }

  deleteUser(user: User): void {
    this.selectedUser = user;
    console.log('Delete user:', this.selectedUser);
    if (confirm(`¿Estás seguro de que deseas eliminar a ${this.selectedUser.username}?`)) {
      this.userService.deleteUser(this.selectedUser.username).subscribe({
        next: (data) => {
          this.toastr.success('Eliminado con éxito');
          this.loadUsers();
        },
        error: (error) => {
          console.log('status ' ,error.status);
          var code = error.status;
          if(code == 403){
            this.toastr.warning('Usted no esta permito realizar esta accion', 'Advertencia');
          }else if(code == 500 || code == 0){
            this.toastr.error('Error en el servidor', 'Error');
          }
          console.log('error ' ,error);
          this.loadUsers();
        },
        complete() {
          console.info('complete');
        },
      });
    }
  }


}
