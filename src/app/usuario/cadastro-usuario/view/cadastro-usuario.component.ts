import { CadastroUsuarioPresenter } from './../presenter/cadastro-usuario.component.presenter';
import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../model/usuario-model';
import { Message } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { UsuarioUpdate } from '../model/usuario-update';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  msgs: Message[] = [];
  cadastroUsuarioPresenter: CadastroUsuarioPresenter;

  constructor(
    cadastroUsuarioPresenter: CadastroUsuarioPresenter,
    private route: ActivatedRoute) {
    this.cadastroUsuarioPresenter = cadastroUsuarioPresenter;
    this.cadastroUsuarioPresenter.usuarioModel = new UsuarioModel();
    this.cadastroUsuarioPresenter.usuarioUpdate = new UsuarioUpdate();
  }

  ngOnInit(): void {
    this.cadastroUsuarioPresenter.initConfigCadastroUsuario(this.route.snapshot.params);
  }

  salvarUsuario() {
    this.cadastroUsuarioPresenter.verificarTipoAtualizacaoUsuario(this);
  }

  redirecionarParaPesquisaUsuario() {
    this.cadastroUsuarioPresenter.navigate(['/usuarios']);
  }

  limparDados(){
    this.cadastroUsuarioPresenter.resetUserForm();
  }

}
