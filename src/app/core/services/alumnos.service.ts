import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, retry, Subject, throwError } from 'rxjs';
import { Alumno } from 'src/app/models/alumno.model';
import { environment } from '@environments/environment';
import { ALUMNOS } from '../../data/mock-alumnos';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private urlAPI = environment.urlAPI;//'https://62ce1cb7066bd2b6992ffea7.mockapi.io/api/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  listaAlumnos: Alumno[] = ALUMNOS;
  alumnosSeleccionado$ = new BehaviorSubject<Alumno | null>(null);
  alumnos$ = new BehaviorSubject<Alumno[]>(this.listaAlumnos);

  constructor(private http: HttpClient,) {}

  obtenerAlumnos(nombre?: string) {
    
    return  this.http
    .get<Alumno[]>(
      this.urlAPI +
        'alumnos' +
        (nombre ? '?search=' + nombre : '')
    )
      .pipe(
        retry(3), 
        catchError(this.errorHandler)
      );
  }


  seleccionarAlumnoxId(id: number): Observable<Alumno>{
    return this.http.get<Alumno>(this.urlAPI +'alumnos/'+id)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  borrarAlumnoxId(id: number){
    return this.http.delete<Alumno>(this.urlAPI +'alumnos/'+id)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  editarAlumno(alumno: Alumno){
    return this.http.put(this.urlAPI +'alumnos/'+alumno.id, alumno)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  agregarAlumno(alumno: Alumno){
    return this.http.post(this.urlAPI +'alumnos',alumno).pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }





  agregarAlumnoOri(alumnos: Alumno) {
    this.listaAlumnos.push(alumnos);
    this.alumnos$.next(this.listaAlumnos);
  }

  obtenerAlumnosOri(nombre?: string) {
    return this.alumnos$
      .asObservable()
      .pipe(
        map((alumnos) =>
          nombre
            ? alumnos.filter((alumno) =>
                (
                  alumno.nombre +
                  ' ' +
                  alumno.apellido +
                  ' ' +
                  alumno.email +
                  ' ' +
                  alumno.id
                )
                  .toLowerCase()
                  .includes(nombre.toLowerCase().trim())
              )
            : alumnos
        )
      );
  }

  obtenerAlumnoSeleccionado() {
    return this.alumnosSeleccionado$.asObservable();
  }

  seleccionarAlumnoxIndice(index?: number) {
    this.alumnosSeleccionado$.next(
      index !== undefined ? this.listaAlumnos[index] : null
    );
  }

  seleccionarAlumnoxIdORI(id?: number) {
    let index = this.listaAlumnos.findIndex((item) => item.id == id);
    this.alumnosSeleccionado$.next(
      index !== undefined ? this.listaAlumnos[index] : null
    );
  }

  borrarAlumnoporIndice(index?: number) {
    this.listaAlumnos = this.listaAlumnos.filter((_, i) => index != i);
    this.alumnos$.next(this.listaAlumnos);
  }

  borrarAlumnoporId(id?: number) {
    let index = this.listaAlumnos.findIndex((item) => item.id == id);
    this.listaAlumnos = this.listaAlumnos.filter((_, i) => index != i);
    this.alumnos$.next(this.listaAlumnos);
  }

  editarAlumnoOri(alumno: Alumno) {
    let itemIndex = this.listaAlumnos.findIndex((item) => item.id == alumno.id);
    this.listaAlumnos[itemIndex] = alumno;
    this.alumnos$.next(this.listaAlumnos);
  }

  obtenerSiguienteId() {
    return Math.max(...this.listaAlumnos.map((o) => o.id + 1));
  }

  obtenerAlumnoxId(id: number) {
    let index = this.listaAlumnos.findIndex((item) => item.id == id);
    //return index !== undefined ? this.listaCursos[index] : null
    return this.listaAlumnos[index] 
    ;
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
