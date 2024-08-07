import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { UserManagementComponent } from './core/component/content/user-management/user-management.component';
import { ProductComponent } from './core/component/content/products/product.component';
import { ReportesComponent } from './core/component/content/reportes/reportes.component';
import { SidebarComponent } from './core/component/content/sidebar/sidebar.component';
import { MainPageComponent } from './core/component/main-page/main-page.component'; 
import { VentasOrdenesComponent } from './core/component/content/ventasOrdenes/ventasOrdenes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/E-home', pathMatch: 'full' },
  { path: 'home', component: LoginComponent },
  { 
    path: 'main-page', 
    component: MainPageComponent,
    children: [
      { path: 'gestionUsuarios', component: UserManagementComponent },
      { path: 'product', component: ProductComponent },
      { path: 'ventasOrdenes', component: VentasOrdenesComponent },
      { path: 'reportes', component: ReportesComponent },
    ]
  },

  { path: 'error-auth', component: MainPageComponent },
  { path: 'side-Bar', component: SidebarComponent },
  
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }