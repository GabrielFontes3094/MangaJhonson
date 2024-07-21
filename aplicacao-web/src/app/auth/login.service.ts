import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Usuario } from './usuario';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/login";


  constructor() { }


  logar(login: Login): Observable<string> {
    return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string) {
    let user = this.jwtDecode() as Usuario;
    if (user.role.name === role) { // Ajuste para acessar o nome do papel
      return true;
    } else {
      return false;
    }
  }

  getUsuarioLogado() {
    return this.jwtDecode() as Usuario;
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.API}/usuarios`);
  }

  deletarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/deletarUsuario/${id}`);
  }

  salvarUsuario(usuario: Usuario): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.API}/salvarUsuario`, usuario, { headers, responseType: 'text' });
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.API}/roles`);
  }

  atualizarUsuario(id: number, role: Role): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.API}/atualizarUsuario/${id}`, role, { headers, responseType: 'text' });
  }


  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}/usuario/${id}`);
  }

}
