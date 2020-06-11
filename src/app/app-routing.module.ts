import { HomeComponent } from './home/home.component';
import { PesquisaUsuariosComponent } from './pesquisa-usuarios/pesquisa-usuarios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent},
  { path: 'usuarios', component: PesquisaUsuariosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
