import { UsuarioUpdate } from './../cadastro-usuario/model/usuario-update';
import { UsuarioInclude } from './../cadastro-usuario/model/usuario-include';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UsuarioGrid } from '../pesquisa-usuario/model/usuario-grid.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuarios';
  private ultimoId: number;
  private novoUsuario: boolean;
  private edicaoUsuario: boolean;

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Obtem usuario pelo codigo
  getUserById(codigo: number): Observable<UsuarioUpdate> {
    return this.httpClient.get<UsuarioUpdate>(this.apiUrl + '/' + codigo)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Obtem todos os usuarios
  getUsers(): Observable<UsuarioGrid[]> {
    return this.httpClient.get<UsuarioGrid[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // remove um usuario
  deleteUser(usuarioGrid: UsuarioGrid) {
    return this.httpClient.delete<UsuarioGrid>(this.apiUrl + '/' + usuarioGrid.codigo, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // salva um usuário
  saveUser(usuarioInclude: UsuarioInclude): Observable<UsuarioUpdate> {
    return this.httpClient.post<UsuarioUpdate>(this.apiUrl, JSON.stringify(usuarioInclude), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // utualiza um usuário
  updateUser(usuarioUpdate: UsuarioUpdate): Observable<UsuarioUpdate> {
    return this.httpClient.put<UsuarioUpdate>(this.apiUrl + '/' + usuarioUpdate.codigo, JSON.stringify(usuarioUpdate), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // Manipulação de erros
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    error.error.forEach(erro => {
      errorMessage += ' ' + erro.mensagemUsuario;
    });
    return throwError(errorMessage);
  }

  getUltimoId(): number {
    return this.ultimoId;
  }

  setUltimoId(ultimoId: number) {
    this.ultimoId = ultimoId;
  }

  getNovoUsuario(): boolean {
    return this.novoUsuario;
  }

  setNovoUsuario(novoUsuario: boolean) {
    this.novoUsuario = novoUsuario;
  }

  getEdicaoUsuario(): boolean {
    return this.edicaoUsuario;
  }

  setEdicaoUsuario(edicaoUsuario: boolean) {
    this.edicaoUsuario = edicaoUsuario;
  }
}
