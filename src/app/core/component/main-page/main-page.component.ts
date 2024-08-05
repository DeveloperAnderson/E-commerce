import { Component } from '@angular/core';
import { SidebarComponent } from '../content/sidebar/sidebar.component';
import { HeaderComponent } from '../content/header/header.component';
import { DashboardComponent } from '../content/dashboard/dashboard.component';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    DashboardComponent
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {


  constructor() { }

  ngOnInit() {
    console.log('Main Page');
  }
}
