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

  constructor(
    private router: Router, private authService: AuthService
  ) {}

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
        {
            /* label: 'Home', */
            icon: 'pi pi-home'
        }
    ];
  }


  sideBar() {
    alert('sideBar');
    this.router.navigate(['side-Bar']);

  }

  changeVisible(): void {
    this.authService.changeSidebarVisible();
  }

}
