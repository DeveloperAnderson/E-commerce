import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../component/model/user.model';

import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private apiUrl = 'http://localhost:8080/api/users'; 
  private apiGetUser = 'http://localhost:8080/api/v1/usuario/getUsers'; 
  private apiPutUpdateUser = 'http://localhost:8080/api/v1/usuario/updateUser'; 
  private apiDeleteUser = 'http://localhost:8080/api/v1/usuario/deleteUser'; 
  private apiCreateUser = 'http://localhost:8080/api/v1/usuario/createUser'; 
  

  
  
  constructor(
    private http: HttpClient,
    private TokenService: TokenService
  ) {}

  ngOnInit() {

  }

  private getHeaders(): HttpHeaders {
    const token = this.TokenService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }



  getUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    console.log('headers getUsers', headers);
    return this.http.get<User[]>(this.apiGetUser, { headers });
  }

  getUser(username: string): Observable<User> {
    const headers = this.getHeaders();
    console.log('headers getUser', headers);
    return this.http.get<User>(`${this.apiUrl}/${username}`, { headers });
  }

  createUser(user: User): Observable<User> {
    const headers = this.getHeaders();
    console.log('headers createUser', headers);
    return this.http.post<User>(this.apiCreateUser, user, { headers });
  }

  updateUser(user: User): Observable<User> {
    const headers = this.getHeaders();
    console.log('headers updateUser ', headers);
    return this.http.put<User>(this.apiPutUpdateUser, user, { headers });
  }

  deleteUser(username: string): Observable<void> {
    const headers = this.getHeaders();
    console.log('headers deleteUser', headers);
    return this.http.delete<void>(`${this.apiDeleteUser}/${username}`, { headers });
  }
}
