import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { RecomendacionesComponent } from './core/component/content/recomendaciones/recomendaciones.component';
import { UserManagementComponent } from './core/component/content/user-management/user-management.component';
import { ProductComponent } from './core/component/content/products/product.component';
//import { UsuarioComponent } from './core/component/content/usuario/usuario.component';
import { SidebarComponent } from './core/component/content/sidebar/sidebar.component';
import { MainPageComponent } from './core/component/main-page/main-page.component'; 

export const routes: Routes = [
  { path: '', redirectTo: '/E-home', pathMatch: 'full' },
  { path: 'home', component: LoginComponent },
  { 
    path: 'main-page', 
    component: MainPageComponent,
    children: [
      { path: 'gestionUsuarios', component: UserManagementComponent },
      { path: 'product', component: ProductComponent }
    ]
  },
  { path: 'error-auth', component: MainPageComponent },
  { path: 'side-Bar', component: SidebarComponent },
  //{ path: 'usuario', component: UsuarioComponent },
  //{ path: 'product', component: ProductComponent },
  { path: 'recomendaciones', component: RecomendacionesComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }