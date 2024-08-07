import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './auth/token.service';
import { Injectable } from '@angular/core';
import { VentaDto } from '../component/model/ventas';
@Injectable({
    providedIn: 'root'
  })
export class VentasOrdenes {

    private apiCreateventas = 'http://localhost:8080/api/v1/ventas/registrar'; 

    constructor(
        private http: HttpClient,
        private TokenService: TokenService
    ) {}

    private getHeaders(): HttpHeaders {
        const token = this.TokenService.getToken();
        return new HttpHeaders({
        'Authorization': `Bearer ${token}`
        });
    }

    createOrder(ventaDto : VentaDto):  Observable<VentaDto> {
        console.log('createOrder ventaDto', ventaDto);
        const headers = this.getHeaders();
        return this.http.post<any>(this.apiCreateventas, ventaDto, { headers });
    }









}