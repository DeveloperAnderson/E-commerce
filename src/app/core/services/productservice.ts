import { Injectable } from '@angular/core';
import { Product } from '../component/model/product.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './auth/token.service';
    
@Injectable()
export class ProductService {
   

    constructor(
        private http: HttpClient,
        private TokenService: TokenService
    ) {}

    private apiGetProductsSmallBackend = 'http://localhost:8080/api/v1/product/getProducts'; 
    private apiPostRegisterProducts = 'http://localhost:8080/api/v1/product/registerProduct'; 
    private apiPutUpdateProducts = 'http://localhost:8080/api/v1/product/updateProduct'; 

    

    private getHeaders(): HttpHeaders {
        const token = this.TokenService.getToken();
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
    }

 

    getProductsSmallBackend():  Observable<Product[]> {
        const headers = this.getHeaders();
        return this.http.get<Product[]>(this.apiGetProductsSmallBackend, { headers });
    }


    postRegisterProducts(product: Product): Observable<Product> {
        const headers = this.getHeaders();
        return this.http.post<Product>(this.apiPostRegisterProducts, product, { headers });
    }


    updateProduct(product: Product): Observable<Product> {
        const headers = this.getHeaders();
        return this.http.put<Product>(this.apiPutUpdateProducts, product, { headers });
    }



};