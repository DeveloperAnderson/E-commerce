import { Component } from '@angular/core';
import { ImportsModule } from './import';
import { MenuItem } from 'primeng/api';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: any;
  constructor(
    private router: Router, private authService: AuthService
  ) {

    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      // Código que usa localStorage
      var user = localStorage.getItem('username');
      this.username = user;
    }
  }

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            /* label: 'Home', */
            icon: 'pi pi-home'
        }
    ];
  }

  MayusLetra(name: string | null): string {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  sideBar() {
    alert('sideBar');
    this.router.navigate(['side-Bar']);

  }

  changeVisible(): void {
    this.authService.changeSidebarVisible();
  }

}
