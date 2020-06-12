import { UsuarioGrid } from './../model/usuario-grid.model';
import { PesquisaUsuario } from './../model/pesquisa-usuario.model';
import { PesquisaUsuarioPresenter } from './../presenter/pesquisa-usuario.component.presenter';
import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa-usuario',
  templateUrl: './pesquisa-usuario.component.html',
  styleUrls: ['./pesquisa-usuario.component.css']
})
export class PesquisaUsuarioComponent implements OnInit {

  msgs: Message[] = [];
  pesquisaUsuarioPresenter: PesquisaUsuarioPresenter;

  constructor(
    pesquisaUsuarioPresenter: PesquisaUsuarioPresenter,
    private router: Router) {
    this.pesquisaUsuarioPresenter = pesquisaUsuarioPresenter;
    this.pesquisaUsuarioPresenter.pesquisaUsuario = new PesquisaUsuario();
  }

  ngOnInit(): void {
    this.pesquisaUsuarioPresenter.initConfigPesquisaUsuario(this);
  }

  removerUsuario(usuario: UsuarioGrid) {
    this.pesquisaUsuarioPresenter.confirmarRemocaoUsuario(usuario, this);
  }

  redirecionarParaCadastroUsuario() {
    this.router.navigate(['/usuario']);
  }

}
