import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { USUARIOS } from '../../data/mock-usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  listaUsuarios: Usuario[] = USUARIOS;
  usuarioSeleccionado$ = new BehaviorSubject<Usuario | null>(null);
  usuarios$ = new BehaviorSubject<Usuario[]>(this.listaUsuarios);

  usuarioLogueado: Usuario = this.listaUsuarios[1]; //Mock a manejar con el servicio de login

  constructor() {}

  agregarUsuario(usuario: Usuario) {
    this.listaUsuarios.push(usuario);
    this.usuarios$.next(this.listaUsuarios);
  }

  obtenerUsuarios(nombre?: string) {
    return this.usuarios$
      .asObservable()
      .pipe(
        map((usuarios) =>
          nombre
            ? usuarios.filter((usuario) =>
                (
                  usuario.nombre +
                  ' ' +
                  usuario.apellido +
                  ' ' +
                  usuario.email +
                  ' ' +
                  usuario.rol +
                  ' ' +
                  usuario.id
                )
                  .toLowerCase()
                  .includes(nombre.toLowerCase().trim())
              )
            : usuarios
        )
      );
  }

  obtenerUsuarioSeleccionado() {
    return this.usuarioSeleccionado$.asObservable();
  }

  seleccionarUsuarioxIndice(index?: number) {
    this.usuarioSeleccionado$.next(
      index !== undefined ? this.listaUsuarios[index] : null
    );
  }

  seleccionarUsuarioxId(id?: number) {
    let index = this.listaUsuarios.findIndex((item) => item.id == id);
    this.usuarioSeleccionado$.next(
      index !== undefined ? this.listaUsuarios[index] : null
    );
  }

  seleccionarUsuarioLogueado() {
    let itemIndex = this.listaUsuarios.findIndex(
      (item) => item.id == this.usuarioLogueado.id
    );
    this.usuarioSeleccionado$.next(
      itemIndex !== undefined ? this.listaUsuarios[itemIndex] : null
    );
  }

  borrarUsuarioporId(id?: number) {
    let index = this.listaUsuarios.findIndex((item) => item.id == id);
    this.listaUsuarios = this.listaUsuarios.filter((_, i) => index != i);
    this.usuarios$.next(this.listaUsuarios);
  }

  borrarUsuarioporIndice(index?: number) {
    this.listaUsuarios = this.listaUsuarios.filter((_, i) => index != i);
    this.usuarios$.next(this.listaUsuarios);
  }

  editarUsuario(usuario: Usuario) {
    let itemIndex = this.listaUsuarios.findIndex(
      (item) => item.id == usuario.id
    );
    this.listaUsuarios[itemIndex] = usuario;
    this.usuarios$.next(this.listaUsuarios);
  }

  // buscarUsuarioxNombre(nombre: string) {
  //   return of(this.listaUsuarios).pipe(
  //     map((usuarios) =>
  //       usuarios.filter((usuario) =>
  //         (
  //           usuario.nombre +
  //           ' ' +
  //           usuario.apellido +
  //           ' ' +
  //           usuario.email +
  //           ' ' +
  //           usuario.rol +
  //           ' ' +
  //           usuario.id
  //         )
  //           .toLowerCase()
  //           .includes(nombre.toLowerCase())
  //       )
  //     ),
  //     catchError((error) => {
  //       throw new Error(error);
  //     })
  //   );
  // }

  obtenerUsuarioLogueado() {
    return new Promise<Usuario>((resolve, reject) => {
      if (this.listaUsuarios[1]) {
        return resolve(this.usuarioLogueado);
      }
      return reject({ msg: 'No existe usuario logueado' });
    });
  }

  obtenerSiguienteId() {
    return Math.max(...this.listaUsuarios.map((o) => o.id + 1));
  }
}
