import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {urlLogin, urlRegister} from '../../util/const-api/const-api.component';
import { IAuthRequest } from './IAuthRequest';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



import { Console, error } from 'console';
import { IRegisterUser } from './IRegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sidebarVisible_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sidebarVisible$ = this.sidebarVisible_.asObservable();

  private gestionUser_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public gestionUser$ = this.gestionUser_.asObservable();

  constructor(private http: HttpClient, ) { }

  postLoginAuth(data: IAuthRequest): Observable<any> {
    console.log('se utilizara la uri :',urlLogin);
    console.log('data.username :',data.username,'data.password :',data.password);
   return this.http.post(urlLogin, data);


  }


  postRegisterUser(data: IRegisterUser): Observable<any> {
    console.log('se utilizara la uri :', urlRegister);
    console.log('data.username :', data?.username, 'data.password :', data?.password, 'data.email :', data?.email);

    if (data && data.username) {
        console.log('Usuario:', data.username);
    } else {
        console.error('Datos incorrectos o incompletos:', data);
    }

    return this.http.post(urlRegister, data).pipe(
        catchError((error: any) => {
            console.error('Error en la solicitud HTTP:', error);
            return throwError(error);
        }),
        tap((response: any) => {
            if (response) {
                console.log('Respuesta del servidor:', response);
            } else {
                console.error('Respuesta inesperada del servidor:', response);
            }
        })
    );
  }

  changeSidebarVisible(): void {
    this.sidebarVisible_.next(!this.sidebarVisible_.value);
  }

  closeSidebarVisible(): void {
    this.sidebarVisible_.next(false);
  }


  // Gestion de usuarios
  changeGestionUser(): void {
    console.log('changeGestionUser');
    this.gestionUser_.next(!this.gestionUser_.value);
  }

  openGestionUser(): void {
    this.gestionUser_.next(true);
    console.log('openGestionUser', this.gestionUser_.value);
  }

  closeGestionUser(): void {
    this.gestionUser_.next(false);
    console.log('closeGestionUser', this.gestionUser_.value);
  }

}
