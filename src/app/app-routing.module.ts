import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/view/cadastro-usuario.component';
import { PesquisaUsuarioComponent } from './usuario/pesquisa-usuario/view/pesquisa-usuario.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'usuarios', component: PesquisaUsuarioComponent },
  { path: 'usuario', component: CadastroUsuarioComponent },
  { path: 'usuario/:codigo', component: CadastroUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
