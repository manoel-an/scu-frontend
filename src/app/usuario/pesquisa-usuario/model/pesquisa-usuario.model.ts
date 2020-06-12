import { UsuarioGrid } from './usuario-grid.model';

export class PesquisaUsuario {
  usuarios: Array<UsuarioGrid> = new Array<UsuarioGrid>();
  configColTableUsuario: Array<any> = [
    { field: 'codigo', header: 'ID', class: 'w-3' },
    { field: 'nome', header: 'Nome', class: 'w-50' },
    { field: 'login', header: 'Login' },
    { field: 'maskSenha', header: 'Senha' },
    { field: 'acao', header: 'Ações', class: 'w-10' }
  ];
}
