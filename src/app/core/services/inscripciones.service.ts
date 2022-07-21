import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { BehaviorSubject, catchError, map, Observable, of, Subject, throwError,retry } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion.model';

import { INSCRIPCIONES } from '../../data/mock-inscripciones';


@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private urlAPI = environment.urlAPI;//'https://62ce1cb7066bd2b6992ffea7.mockapi.io/api/v1/';



  listaInscripciones: Inscripcion[] = INSCRIPCIONES;
  inscripcionSeleccionado$ = new BehaviorSubject<Inscripcion | null>(null);
  inscripciones$ = new BehaviorSubject<Inscripcion[]>(this.listaInscripciones);

  constructor(private http: HttpClient,) {}

  obtenerInscripciones(nombre?: string) {
    
    return  this.http
    .get<Inscripcion[]>(
      this.urlAPI +
        'inscripciones' +
        (nombre ? '?search=' + nombre : '')
    )
      .pipe(
        retry(3), 
        catchError(this.errorHandler)
      );
  }


  seleccionarInscripcionxId(id: number): Observable<Inscripcion>{
    return this.http.get<Inscripcion>(this.urlAPI +'inscripciones/'+id)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  borrarInscripcionxId(id: number){
    return this.http.delete<Inscripcion>(this.urlAPI +'inscripciones/'+id)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  editarInscripcion(inscripcion: Inscripcion){
    return this.http.put(this.urlAPI +'inscripciones/'+inscripcion.id, inscripcion)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  agregarInscripcion(inscripcion: Inscripcion){
    return this.http.post(this.urlAPI +'inscripciones',inscripcion).pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }
//MockApi no permite buscar por un elemento hijo, asi que las busquedas son sobre todas las inscripciones lamentablemente,, pero esta la idea
  obtenerInscripcionesxCurso(id?: number, nombre?: string) {
    return  this.http
    .get<Inscripcion[]>(
      this.urlAPI +
        'inscripciones?cursoId=' + id +
        (nombre ? '&nombre=' + nombre : '')
        +
        (nombre ? '&apellido=' + nombre : '')
    )
      .pipe(
        retry(3), 
        catchError(this.errorHandler)
      );
  }

  obtenerInscripcionesxAlumno(id?: number, nombre?: string) {
    return  this.http
    .get<Inscripcion[]>(
      this.urlAPI +
        'inscripciones?alumnoId=' + id +
        (nombre ? '&nombre=' + nombre : '')
        +
        (nombre ? '&apellido=' + nombre : '')
    )
      .pipe(
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

 

  
}
