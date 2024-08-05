import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

/* Importacion de @Angular-Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
/* Fin */
import {  FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup,} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NavComponent } from '../nav/nav.component';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm!: FormGroup;
  registerUser!: FormGroup;


  constructor( 
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  senDataAuth(): void{
    console.log('send data');
    console.log('this.loginForm.value',this.loginForm.value);
    console.log('this.loginForm.value.username',this.loginForm.value.username);

    if(this.loginForm.valid){
      console.log('--- get Service ---');
      this.authService.postLoginAuth(this.loginForm.value).subscribe({

        next: (data) => {
          console.log('data', data);
          console.log('Username:', data.username);
          console.log('Message:', data.message);
          console.log('Status:', data.status);
          console.log('JWT:', data.jwt);
          
          this.toastr.success('Bienvenido ' + data.username);
          //rutas
          this.router.navigate(['main-page']);

        },
        error: (error) => {
          console.log('status ' ,error.status);
          var code = error.status;

          if(code == 403){
            this.toastr.warning('Verifique sus credenciales', 'Advertencia');
          }else if(code == 500 || code == 0){
            this.toastr.error('Error en el servidor', 'Error');
          }
          console.log('error ' ,error);
          
          
        },
        complete() {
          console.info('complete');
        },
        
      });
      
    }else{
      this.toastr.info('Porfavor Ingrese sus Credenciales', 'Advertencia');
      console.log('form is invalid');
    }

  }

  senDataUserRegister(): void{
    console.log('this.loginForm.value',this.loginForm.value);
    if(this.loginForm.valid){


      this.authService.postRegisterUser(this.loginForm.value).subscribe({

        next: (data) => {
          this.toastr.success('Su cuenta ha sido creada con exito ' + data.username);
        },
        error: (error) => {
          console.log('status ' ,error.status);
          var code = error.status;

          if(code == 403){
            this.toastr.warning('Verifique sus credenciales', 'Advertencia');
          }else if(code == 500 || code == 0){
            this.toastr.error('Error en el servidor', 'Error');
          }
          console.log('error ' ,error);
          
          
        },
        complete() {
          console.info('complete');
        },
        
      });

    }else{
      this.toastr.info('Porfavor Ingrese sus Credenciales', 'Advertencia');
      console.log('form is invalid');
    }

  }

}
