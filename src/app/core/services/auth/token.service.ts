import { jwtDecode } from "jwt-decode";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { timeEnd } from "console";

@Injectable({
    providedIn: 'root'
})

export class TokenService {
    
    private tokenKey: string | null;
    
    constructor(
        private toastr: ToastrService,
        private router: Router
    ) {

      if ( typeof localStorage !== 'undefined') {
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
    
    //método para acceder al token
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
      if (typeof localStorage !== 'undefined') {
        localStorage.clear();
      }
      
      this.router.navigate(['home']);
    }   
    

}