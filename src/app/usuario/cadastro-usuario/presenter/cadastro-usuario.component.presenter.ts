import { UsuarioUpdate } from './../model/usuario-update';
import { CadastroUsuarioComponent } from './../view/cadastro-usuario.component';
import { UsuarioService } from './../../service/usuario.service';
import { UsuarioInclude } from './../model/usuario-include';
import { UsuarioModel } from './../model/usuario-model';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioPresenter {

  usuarioModel: UsuarioModel;
  usuarioUpdate: UsuarioUpdate;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private formBuider: FormBuilder) { }

  /*
  * inicializa a configuracao do componente de cadastro usuário
  */
  initConfigCadastroUsuario(params: any) {
    this.verificarParametroEdicaoUsuario(params);
  }

  /*
  * Verifica a atualização: POST ou PUT de usuário
  */
  verificarTipoAtualizacaoUsuario(cadastroUsuarioComponent: CadastroUsuarioComponent) {
    if (this.usuarioModel.edicao) {
      this.updateUser(cadastroUsuarioComponent);
    } else {
      this.saveUser(cadastroUsuarioComponent);
    }
  }

  /*
  * Navegacao de rotas
  */
  navigate(rotas: Array<any>) {
    this.router.navigate(rotas);
  }

  /*
  * Navegacao de rotas
  */
  resetUserForm() {
    this.usuarioModel.userForm.reset();
  }

  /*
  * Verifica parametro codigo url para edicao usuario
  */
  private verificarParametroEdicaoUsuario(params: any) {
    const codigo = 'codigo';
    const codigoUsuario = Number(params[codigo]);
    if (codigoUsuario) {
      this.usuarioModel.edicao = true;
      this.usuarioModel.urlIdUsuario = codigoUsuario;
      this.usuarioModel.tituloCadastro = 'Edição usuário: ' + codigoUsuario;
      this.carregarUsuario();
    } else {
      this.usuarioModel.edicao = false;
      this.usuarioModel.tituloCadastro = 'Novo usuário';
      this.configurarFormularioUsuario();
    }
  }

  /*
  * Get passando Id usuario: carregamento usuario edição
  */
  private carregarUsuario() {
    this.usuarioService.getUserById(this.usuarioModel.urlIdUsuario).subscribe(usuario => {
      this.usuarioUpdate = usuario;
      this.usuarioModel.userForm = this.formBuider.group({
        nome: [usuario.nome, [Validators.required, Validators.maxLength(50)]],
        login: [usuario.login, [Validators.required, Validators.maxLength(20)]],
        senha: [usuario.senha, [Validators.required, Validators.maxLength(10), Validators.minLength(5)]]
      });
    });
  }

  /*
  * POST USUARIO
  */
  private saveUser(cadastroUsuarioComponent: CadastroUsuarioComponent) {
    this.usuarioService.saveUser(this.inicializarIncludeUsuario()).subscribe(usuario => {
      this.usuarioService.setUltimoId(Number(usuario.codigo));
      this.usuarioService.setNovoUsuario(true);
      this.navigate(['/usuarios']);
    }, error => {
      this.mostrarMensagem(cadastroUsuarioComponent, 'error', 'Erro', error);
    });
  }

  /*
  * PUT USUARIO
  */
  private updateUser(cadastroUsuarioComponent: CadastroUsuarioComponent) {
    this.usuarioService.updateUser(this.inicializarUpdateUsuario()).subscribe(usuario => {
      this.usuarioService.setUltimoId(Number(usuario.codigo));
      this.usuarioService.setEdicaoUsuario(true);
      this.navigate(['/usuarios']);
    }, error => {
      this.mostrarMensagem(cadastroUsuarioComponent, 'error', 'Erro', error);
    });
  }

  /*
  * Inicializa o objeto para o POST de usuário
  */
  private inicializarIncludeUsuario(): UsuarioInclude {
    const usuarioInclude: UsuarioInclude = new UsuarioInclude();
    usuarioInclude.nome = this.usuarioModel.userForm.value.nome;
    usuarioInclude.login = this.usuarioModel.userForm.value.login;
    usuarioInclude.senha = this.usuarioModel.userForm.value.senha;
    return usuarioInclude;
  }

  /*
  * Inicializa o objeto para o PUT de usuário
  */
  private inicializarUpdateUsuario(): UsuarioUpdate {
    const usuarioUpdate: UsuarioUpdate = new UsuarioUpdate();
    usuarioUpdate.codigo = this.usuarioModel.urlIdUsuario;
    usuarioUpdate.nome = this.usuarioModel.userForm.value.nome;
    usuarioUpdate.login = this.usuarioModel.userForm.value.login;
    usuarioUpdate.senha = this.usuarioModel.userForm.value.senha;
    return usuarioUpdate;
  }

  /*
  * Configura o formulário usuário
  */
  private configurarFormularioUsuario() {
    this.usuarioModel.userForm = this.formBuider.group({
      nome: [null, [Validators.required, Validators.maxLength(50)]],
      login: [null, [Validators.required, Validators.maxLength(20)]],
      senha: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(5)]]
    });
  }
  /*
  * Mostra a mensagem de retorno de serviço
  */
  private mostrarMensagem(
    cadastroUsuarioComponent: CadastroUsuarioComponent,
    severityValue: string, summaryValue: string, mensagem: string) {
    cadastroUsuarioComponent.msgs = [];
    cadastroUsuarioComponent.msgs.push({ severity: severityValue, summary: summaryValue, detail: mensagem });
  }

}
