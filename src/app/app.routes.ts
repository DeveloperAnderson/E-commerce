import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './core/component/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './core/component/login/login.component';
import { AgendaComponent } from './core/component/content/agenda/agenda.component';
import { RedComponent } from './core/component/content/red/red.component';
import { RecomendacionesComponent } from './core/component/content/recomendaciones/recomendaciones.component';
import {  UserManagementComponent } from './core/component/content/user-management/user-management.component';
import { VacunacionComponent } from './core/component/content/vacunacion/vacunacion.component';
import { SaludComponent } from './core/component/content/salud/salud.component';
import { UsuarioComponent } from './core/component/content/usuario/usuario.component';
import { SidebarComponent } from './core/component/content/sidebar/sidebar.component';
export const routes: Routes = [

  {path: '', redirectTo: '/E-home', pathMatch: 'full'},
  {path: 'home', component: LoginComponent}, // Define la ruta por defecto
  { path: 'main-page', component: MainPageComponent }, // Define la ruta y el componente asociado
  {path: 'error-auth', component: MainPageComponent},

  {path: 'side-Bar', component: SidebarComponent},

  /* Funcionalides de la aplicacion  */
  { path: 'usuario', component: UsuarioComponent },
  { path: 'salud', component: SaludComponent },
  { path: 'vacunacion', component: VacunacionComponent },
  { path: 'gestionUsuarios', component: UserManagementComponent  },
  { path: 'recomendaciones', component: RecomendacionesComponent },
  { path: 'red', component: RedComponent },
  { path: 'agenda', component: AgendaComponent },


  {path: '**', redirectTo: '/home' } // Define la ruta por defecto cuando no se encuentra la ruta solicitada
];


