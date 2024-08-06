import { jwtDecode } from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    
    private tokenKey: string | null;
    
    constructor(
        private toastr: ToastrService,
        private router: Router
    ) {
        console.log('TokenService');
        if (typeof localStorage !== 'undefined') {
            this.tokenKey = localStorage.getItem('token');
            console.log('this.tokenKey', this.tokenKey);
            if (this.tokenKey) {
              this.getDecodedAccessToken(this.tokenKey);
            }else{
              console.log('No token');
              this.logout();
            }
        } else {
            this.tokenKey = null;
            console.warn('localStorage is not available');
        }
    }
    
    // Si necesitas un método para acceder al token
    getToken(): string | null {
        if (this.tokenKey) {
            this.getDecodedAccessToken(this.tokenKey);
        }
      return this.tokenKey;
    }


    getDecodedAccessToken(token: string): any {
        try {
          const currentTime = Math.floor(new Date().getTime() / 1000);
          console.log('currentTime', currentTime);
          const decodedToken: any = jwtDecode(token);
          console.log('decodedToken', decodedToken);
          if (decodedToken.exp < currentTime) {
              this.toastr.error('El token ha expirado, por favor inicie sesión nuevamente');
              this.logout()
            return; // El token ha expirado
          } else {
            return decodedToken;
          }
        } catch (Error) {
          return null;
        }
    }
    
    private logout(): void {
        localStorage.removeItem('token');
        this.toastr.error('El token ha expirado, por favor inicie sesión nuevamente');
        this.router.navigate(['login']);
    }   
    

}