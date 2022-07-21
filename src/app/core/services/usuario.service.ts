import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, retry, throwError } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { USUARIOS } from '../../data/mock-usuarios';
import { environment } from '@environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private urlAPI = environment.urlAPI;//'https://62ce1cb7066bd2b6992ffea7.mockapi.io/api/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  listaUsuarios: Usuario[] = USUARIOS;
  usuarioSeleccionado$ = new BehaviorSubject<Usuario | null>(null);
  usuarios$ = new BehaviorSubject<Usuario[]>(this.listaUsuarios);

  usuarioLogueado: Usuario = this.listaUsuarios[1]; //Mock a manejar con el servicio de login

  constructor(private http: HttpClient,) {}

  obtenerUsuarios(nombre?: string) {
    
    return  this.http
    .get<Usuario[]>(
      this.urlAPI +
        'usuarios' +
        (nombre ? '?search=' + nombre : '')
    )
      .pipe(
        retry(3), 
        catchError(this.errorHandler)
      );
  }


  seleccionarUsuarioxId(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.urlAPI +'usuarios/'+id)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  borrarUsuarioxId(id: number){
    return this.http.delete<Usuario>(this.urlAPI +'usuarios/'+id)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  editarUsuario(usuario: Usuario){
    return this.http.put(this.urlAPI +'usuarios/'+usuario.id, JSON.stringify(usuario), this.httpOptions)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  agregarUsuario(usuario: Usuario){
    return this.http.post(this.urlAPI +'usuarios', JSON.stringify(usuario), this.httpOptions).pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  errorHandler(error:HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage))
 }




  agregarUsuarioOri(usuario: Usuario) {
    this.listaUsuarios.push(usuario);
    this.usuarios$.next(this.listaUsuarios);
  }

  obtenerUsuariosOri(nombre?: string) {
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

  seleccionarUsuarioxIdOri(id?: number) {
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

  editarUsuarioOri(usuario: Usuario) {
    let itemIndex = this.listaUsuarios.findIndex(
      (item) => item.id == usuario.id
    );
    this.listaUsuarios[itemIndex] = usuario;
    this.usuarios$.next(this.listaUsuarios);
  }

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
