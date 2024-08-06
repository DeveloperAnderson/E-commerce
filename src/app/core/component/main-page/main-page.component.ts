import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../content/sidebar/sidebar.component';
import { HeaderComponent } from '../content/header/header.component';
import { DashboardComponent } from '../content/dashboard/dashboard.component';
import { UserManagementComponent } from '../content/user-management/user-management.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    CommonModule,
    UserManagementComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    console.log('Main Page');
  }
}
