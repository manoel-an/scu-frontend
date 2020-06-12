import { PesquisaUsuarioComponent } from './../view/pesquisa-usuario.component';
import { UsuarioGrid } from './../model/usuario-grid.model';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { UsuarioService } from './../../service/usuario.service';
import { PesquisaUsuario } from './../model/pesquisa-usuario.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PesquisaUsuarioPresenter {
  pesquisaUsuario: PesquisaUsuario;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private usuarioService: UsuarioService) { }

  /*
  * inicializa a configuracao do componente de pesquisa de usuário
  */
  initConfigPesquisaUsuario(pesquisaUsuarioComponent: PesquisaUsuarioComponent) {
    this.getUsers();
    this.mostrarMensagemAtualizacaoUsuario(pesquisaUsuarioComponent);
  }

  /*
  * Confirma a remoção de usuário
  */
  confirmarRemocaoUsuario(usuario: UsuarioGrid, pesquisaUsuarioComponent: PesquisaUsuarioComponent) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja remover o usuario ' + usuario.nome + ' ?',
      accept: () => {
        this.removerUsuario(usuario, pesquisaUsuarioComponent);
      }
    });
  }

  /*
  * Mostra a mensagem de atualizacao de usuario
  */
  private mostrarMensagemAtualizacaoUsuario(pesquisaUsuarioComponent: PesquisaUsuarioComponent) {
    if (this.usuarioService.getNovoUsuario() && this.usuarioService.getNovoUsuario() === true) {
      this.mostrarMensagem(pesquisaUsuarioComponent, 'success', 'Sucesso', 'Usuario ' + this.usuarioService.getUltimoId() + ' gravado com sucesso');
    }
    if (this.usuarioService.getEdicaoUsuario() && this.usuarioService.getEdicaoUsuario() === true) {
      this.mostrarMensagem(pesquisaUsuarioComponent, 'success', 'Sucesso', 'Usuario ' + this.usuarioService.getUltimoId() + ' atualizado com sucesso');
    }
    this.usuarioService.setNovoUsuario(false);
    this.usuarioService.setEdicaoUsuario(false);
  }

  /*
  * Remove o usuário selecionado
  */
  private removerUsuario(usuario: UsuarioGrid, pesquisaUsuarioComponent: PesquisaUsuarioComponent) {
    this.usuarioService.deleteUser(usuario).subscribe(() => {
      this.getUsers();
      const msg = 'Usuario ' + usuario.nome + ' removido com sucesso';
      this.mostrarMensagem(pesquisaUsuarioComponent, 'success', 'Sucesso', msg);
    }, error => {
      this.mostrarMensagem(pesquisaUsuarioComponent, 'error', 'Erro', error);
    });
  }

  /*
  * Mostra a mensagem de retorno de serviço
  */
  private mostrarMensagem(
    pesquisaUsuarioComponent: PesquisaUsuarioComponent,
    severityValue: string, summaryValue: string, mensagem: string) {
    pesquisaUsuarioComponent.msgs = [];
    pesquisaUsuarioComponent.msgs.push({ severity: severityValue, summary: summaryValue, detail: mensagem });
  }

  /*
  * Recupera todos os usuário
  */
  private getUsers() {
    this.usuarioService.getUsers().subscribe(usuarios => {
      this.pesquisaUsuario.usuarios = usuarios;
      this.mascararSenha();
    });
  }

  /*
  * Mascara a senha na grid de usuários
  */
  private mascararSenha() {
    this.pesquisaUsuario.usuarios.forEach(usuario => {
      let count = 1;
      let maskSenha = '*';
      while (count < usuario.senha.length) {
        maskSenha += '*';
        count++;
      }
      usuario.maskSenha = maskSenha;
    });
  }
}
