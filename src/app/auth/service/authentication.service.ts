import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import moment from 'moment';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public grpCreditUser: Observable<any>;

  //private
  private grpCorpUserSubject: BehaviorSubject<any>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService, private _router: Router,) {
    this.grpCorpUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('grpCreditUser')));
    this.grpCreditUser = this.grpCorpUserSubject.asObservable();
  }

  // getter: grpCorpUserValue
  public get grpCorpUserValue(): any {
    return this.grpCorpUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  // get isAdmin() {
  //   return this.grpCreditUser && this.grpCorpUserSubject.value.role === Role.Admin;
  // }

  // /**
  //  *  Confirms if user is client
  //  */
  // get isClient() {
  //   return this.grpCreditUser && this.grpCorpUserSubject.value.role === Role.Client;
  // }

  private usuarios = [];
  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  async login(username: string, password: string) {
    const filePath = './assets/usuarios/usuarios.csv';
    const data = await fetch(filePath)
  .then(response => {
      if (!response.ok) {
        throw new Error(`No se pudo cargar el archivo `);
      }
      return response.text();
    })
      .then(csvContent => {
        this.usuarios = csvContent.split('\n').map((item) => {
          const fila = item.split(';');
          return {
            email: fila[0],
            password: fila[1],
            roles: [{nombre: fila[2]}],
            perfil: fila[3],
            tokenExpiracion: 24000,
            id: '1',
            firstName: 'string',
            lastName: 'string',
            persona: {},
            empresa: {},
            estado: 'string',
          };
        });
        return this.usuarios;
      })
      .catch(error => console.error('Error al cargar el archivo:', error));
    const usuarioEncontrado = this.usuarios.filter((usuario) => {
      return usuario.email === username && usuario.password === password;
    });

    if (usuarioEncontrado.length > 0) {
      usuarioEncontrado[0].tokenExpiracion = Date.now() + (Number(usuarioEncontrado[0].tokenExpiracion) * 1000);
      localStorage.setItem('grpCreditUser', JSON.stringify(usuarioEncontrado[0]));
      setTimeout(() => {
      }, 2500);
      this.grpCorpUserSubject.next(usuarioEncontrado[0]);
      this._router.navigate(['/personas/inicio']);
      return true;
    } else {
      this._router.navigate(['/grp/login']);
      return false;
    }
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('grpCreditUser');
    // notify
    this.grpCorpUserSubject.next(null);
  }
}
