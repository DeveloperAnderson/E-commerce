import { Component } from '@angular/core';


export const CON_API = 'api/v1/';


export  const  urlLogin = 'http://localhost:8080/'+CON_API+'auth/log-in';


export  const  urlRegister = 'http://localhost:8080/'+CON_API+'usuario/sign-up';

@Component({
  selector: 'app-const-api',
  standalone: true,
  imports: [],
  template: `
    <p>
      const-api works!
    </p>
  `,
  styles: ``
})
export class ConstApiComponent {

  constructor() { }



}
