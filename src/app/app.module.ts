import { CadastroUsuarioPresenter } from './usuario/cadastro-usuario/presenter/cadastro-usuario.component.presenter';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuarioService } from './usuario/service/usuario.service';
import { PesquisaUsuarioPresenter } from './usuario/pesquisa-usuario/presenter/pesquisa-usuario.component.presenter';
import { PesquisaUsuarioComponent } from './usuario/pesquisa-usuario/view/pesquisa-usuario.component';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { CadastroUsuarioComponent } from './usuario/cadastro-usuario/view/cadastro-usuario.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PesquisaUsuarioComponent,
    HomeComponent,
    CadastroUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    UsuarioService,
    PesquisaUsuarioPresenter,
    CadastroUsuarioPresenter
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
