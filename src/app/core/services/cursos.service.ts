import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry,take,filter, BehaviorSubject, catchError, map, of, Subject, Observable, throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Curso } from 'src/app/models/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private urlAPI = environment.urlAPI;//'https://62ce1cb7066bd2b6992ffea7.mockapi.io/api/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  listaCursos!: Curso[] ;//CURSOS;
  cursoSeleccionado$ = new BehaviorSubject<Curso | null>(null);
  cursos$ = new BehaviorSubject<Curso[]>(this.listaCursos);

  constructor(private http: HttpClient,) {}



  obtenerCursos(nombre?: string) {
    
    return  this.http
    .get<Curso[]>(
      this.urlAPI +
        'cursos' +
        (nombre ? '?search=' + nombre : '')
    )
      .pipe(
        retry(3), 
        catchError(this.errorHandler)
      );
  }


  seleccionarCursoxId(id: number): Observable<Curso>{
    return this.http.get<Curso>(this.urlAPI +'cursos/'+id)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  borrarCursoxId(id: number){
    return this.http.delete<Curso>(this.urlAPI +'cursos/'+id)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  editarCurso(curso: Curso){
    return this.http.put(this.urlAPI +'cursos/'+curso.id, JSON.stringify(curso), this.httpOptions)
    .pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }

  agregarCurso(curso: Curso){
    return this.http.post(this.urlAPI +'cursos', JSON.stringify(curso), this.httpOptions).pipe(
      retry(3), 
      catchError(this.errorHandler)
    );
  }




  agregarCursoOri(curso: Curso) {
    this.listaCursos.push(curso);
    this.cursos$.next(this.listaCursos);
  }


  obtenerCursoSeleccionado() {
    return this.cursoSeleccionado$.asObservable();
  }

  seleccionarCursoxIndice(index?: number) {
    this.cursoSeleccionado$.next(
      index !== undefined ? this.listaCursos[index] : null
    );
  }

  seleccionarCursoxIdOri(id?: number) {
    let index = this.listaCursos.findIndex((item) => item.id == id);
    this.cursoSeleccionado$.next(
      index !== undefined ? this.listaCursos[index] : null
    );
  }

  obtenerCursosOri(nombre?: string) {
    return this.cursos$
      .asObservable()
      .pipe(
        map((cursos) =>
          nombre
            ? cursos.filter((curso) =>
                (curso.nombre + ' ' + curso.id)
                  .toLowerCase()
                  .includes(nombre.toLowerCase().trim())
              )
            : cursos
        )
      );
  }

  borrarCursoporIndice(index?: number) {
    this.listaCursos = this.listaCursos.filter((_, i) => index != i);
    this.cursos$.next(this.listaCursos);
  }

  borrarCursoporIdOri(id?: number) {
    let index = this.listaCursos.findIndex((item) => item.id == id);
    this.listaCursos = this.listaCursos.filter((_, i) => index != i);
    this.cursos$.next(this.listaCursos);
  }

  editarCursoOri(curso: Curso) {
    let itemIndex = this.listaCursos.findIndex((item) => item.id == curso.id);
    this.listaCursos[itemIndex] = curso;
    this.cursos$.next(this.listaCursos);
  }

  obtenerSiguienteId() {
    return Math.max(...this.listaCursos.map((o) => o.id + 1));
  }

  obtenerCursoxId(id: number) {
    let index = this.listaCursos.findIndex((item) => item.id == id);
    //return index !== undefined ? this.listaCursos[index] : null
    return this.listaCursos[index] 
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
