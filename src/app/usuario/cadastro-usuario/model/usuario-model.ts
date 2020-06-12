import { FormGroup } from '@angular/forms';
export class UsuarioModel {
  userForm: FormGroup;
  edicao = false;
  urlIdUsuario: number;
  tituloCadastro: string;
  nome = 'nome';
  login = 'login';
  senha = 'senha';

  get validNomeFormControl(): boolean {
    return this.userForm.controls[this.nome].valid;
  }

  get touchedNomeFormControl(): boolean {
    return this.userForm.controls[this.nome].touched;
  }

  get validLoginFormControl(): boolean {
    return this.userForm.controls[this.login].valid;
  }

  get touchedLoginFormControl(): boolean {
    return this.userForm.controls[this.login].touched;
  }

  get validSenhaFormControl(): boolean {
    return this.userForm.controls[this.senha].valid;
  }

  get touchedSenhaFormControl(): boolean {
    return this.userForm.controls[this.senha].touched;
  }

}
