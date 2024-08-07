import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './auth/token.service';
import {  ProjectionReport } from '../component/model/ProjectionReport';
import { ProjectionClient } from '../component/model/ProjectionClient';



@Injectable({
    providedIn: 'root'
  })


export class ProductReportService {

    private apiGetReportActive = 'http://localhost:8080/api/v1/reportes/productos-activos';  
    private apiGetReportVendido = 'http://localhost:8080/api/v1/reportes/top5-productos-vendidos';  
    private apiGetReportClient = 'http://localhost:8080/api/v1/reportes/top5-clientes-frecuentes';  
  
    constructor(
        private http: HttpClient,
        private TokenService: TokenService
    ) { }


    private getHeaders(): HttpHeaders {
        console.log('ReportesComponent constructor');
        const token = this.TokenService.getToken();
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    }
  
    obtenerProductosActivos(): Observable<ProjectionReport[]> {
        const headers = this.getHeaders();
      return this.http.get<ProjectionReport[]>(this.apiGetReportActive, { headers });
    }

    obtenerProductosVendidos(): Observable<ProjectionReport[]> {
        const headers = this.getHeaders();
      return this.http.get<ProjectionReport[]>(this.apiGetReportVendido, { headers });
    }


    obtenerClientesFrecuentes(): Observable<ProjectionClient[]> {
        const headers = this.getHeaders();
      return this.http.get<ProjectionClient[]>(this.apiGetReportClient, { headers });
    }


}