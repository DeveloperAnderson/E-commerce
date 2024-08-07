import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {urlLogin, urlRegister} from '../../util/const-api/const-api.component';
import { IAuthRequest } from './IAuthRequest';
import { BehaviorSubject, Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRegisterUser } from './IRegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sidebarVisible_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public sidebarVisible$ = this.sidebarVisible_.asObservable();

  private gestionUser_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public gestionUser$ = this.gestionUser_.asObservable();

  private productos_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public productos$ = this.productos_.asObservable();

  private ventasOrdenes_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public ventasOrdenes$ = this.ventasOrdenes_.asObservable();

  private reportes_: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public reportes$ = this.reportes_.asObservable();


  constructor(private http: HttpClient, ) { }

  postLoginAuth(data: IAuthRequest): Observable<any> {
   return this.http.post(urlLogin, data);
  }


  postRegisterUser(data: IRegisterUser): Observable<any> {

    return this.http.post(urlRegister, data).pipe(
        catchError((error: any) => {
            return throwError(error);
        }),
        tap((response: any) => {
            if (response) {
            } else {
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
    this.gestionUser_.next(!this.gestionUser_.value);
  }

  openGestionUser(): void {
    this.gestionUser_.next(true);
    this.productos_.next(false);
    this.ventasOrdenes_.next(false);
    this.reportes_.next(false);
  }

  closeGestionUser(): void {
    this.gestionUser_.next(false);
  }


  openProductos(): void {
    this.productos_.next(true);
    this.gestionUser_.next(false);
    this.ventasOrdenes_.next(false);
    this.reportes_.next(false);
  }

  closeProductos(): void {
    this.productos_.next(false);
  }




  openVentasOrdenes(): void {
    this.ventasOrdenes_.next(true);
    this.productos_.next(false);
    this.reportes_.next(false);
    this.gestionUser_.next(false);
  }

  closeVentasOrdenes(): void {
    this.ventasOrdenes_.next(false);
  }

  openReportes(): void {
    this.reportes_.next(true);
    this.productos_.next(false);
    this.gestionUser_.next(false);
    this.ventasOrdenes_.next(false);
  }

  closeReportes(): void {
    this.reportes_.next(false);
  }

  
}
