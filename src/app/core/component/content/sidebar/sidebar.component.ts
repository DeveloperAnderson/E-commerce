import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { ImportsModule } from './imports';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @ViewChild('capTransparent') capTransparent!: ElementRef;

  constructor(
    private renderer: Renderer2,
    public authService: AuthService,
    private router: Router
  ) {
    this.closeGestionUser();
  }

  ngOnInit(): void {
  }

  closeCallback(e: Event): void {
    this.authService.closeSidebarVisible();
  }

  changeVisible(): void {
    this.authService.changeSidebarVisible();
  }

  closeGestionUser()  {
    this.authService.closeGestionUser();
  }

  GestionUser() {
    this.router.navigate(['main-page', 'gestionUsuarios']);
    this.authService.openGestionUser();
  }


  Productos(){
    this.router.navigate(['main-page', 'product']);
    this.authService.openProductos();
  }


  close(){
    this.authService.closeGestionUser();
    this.authService.closeProductos();
    this.authService.closeSidebarVisible()
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['home']);
  }
}
