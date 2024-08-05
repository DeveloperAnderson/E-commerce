import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { ImportsModule } from './imports';
import { AuthService } from '../../../services/auth/auth.service';
import { Observable, Subscription } from 'rxjs';

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
    public authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  closeCallback(e: Event): void {
    this.authService.closeSidebarVisible();
  }

  changeVisible(): void {
    this.authService.changeSidebarVisible();
  }

}
