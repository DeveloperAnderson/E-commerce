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
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            this.tokenKey = localStorage.getItem('token');
            if (this.tokenKey) {
              this.getDecodedAccessToken(this.tokenKey);
            }else{
              console.log('No token');
              this.logout();
            }
        } else {
            this.tokenKey = null;
        }
    }
    
    // Si necesitas un método para acceder al token
    getToken(): string | null {
        if (this.tokenKey) {
            this.getDecodedAccessToken(this.tokenKey);
        }else{
            this.logout();
        }
      return this.tokenKey;
    }


    getDecodedAccessToken(token: string): any {
      try {
        const currentTime = Math.floor(new Date().getTime() / 1000);
        const decodedToken: any = jwtDecode(token);
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
        localStorage.clear();
        this.toastr.error('El token ha expirado, por favor inicie sesión nuevamente');
        this.router.navigate(['home']);
    }   
    

}