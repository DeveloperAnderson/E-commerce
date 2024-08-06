import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { AgendaComponent } from './core/component/content/agenda/agenda.component';
import { RedComponent } from './core/component/content/red/red.component';
import { RecomendacionesComponent } from './core/component/content/recomendaciones/recomendaciones.component';
import { UserManagementComponent } from './core/component/content/user-management/user-management.component';
import { VacunacionComponent } from './core/component/content/vacunacion/vacunacion.component';
import { SaludComponent } from './core/component/content/salud/salud.component';
import { UsuarioComponent } from './core/component/content/usuario/usuario.component';
import { SidebarComponent } from './core/component/content/sidebar/sidebar.component';
import { MainPageComponent } from './core/component/main-page/main-page.component'; 

export const routes: Routes = [
  { path: '', redirectTo: '/E-home', pathMatch: 'full' },
  { path: 'home', component: LoginComponent },
  { 
    path: 'main-page', 
    component: MainPageComponent,
    children: [
      { path: 'gestionUsuarios', component: UserManagementComponent }
    ]
  },
  { path: 'error-auth', component: MainPageComponent },
  { path: 'side-Bar', component: SidebarComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'salud', component: SaludComponent },
  { path: 'vacunacion', component: VacunacionComponent },
  { path: 'recomendaciones', component: RecomendacionesComponent },
  { path: 'red', component: RedComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }