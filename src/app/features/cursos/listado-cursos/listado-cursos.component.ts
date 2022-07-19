import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  tap,
  take,
  takeUntil,
  filter,
  distinctUntilChanged,
  debounceTime,
  map,
  Observable,
  Subscription,
  Subject,
} from 'rxjs';
import { CursosService } from 'src/app/core/services/cursos.service';
import { Curso } from 'src/app/models/curso.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listado-cursos',
  templateUrl: './listado-cursos.component.html',
  styleUrls: ['./listado-cursos.component.scss'],
})
export class ListadoCursosComponent implements OnInit {
  titulo: string = 'Listado de Cursos';
  displayedColumnsTable = [
    'id',
    'nombre',
    'descripcion',
    'cantClases',
    'capacidad',
    'fechaInicio',
    'estado',
    'actions',
  ];
  tableDataSource$: Observable<MatTableDataSource<Curso>> | undefined;
  destroy$: Subject<boolean> = new Subject<boolean>();
  buscador = new FormControl();

  susbcriptions: Subscription = new Subscription();

  constructor(
    private cursosService: CursosService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.obtenerCursos();
    // this.tableDataSource$ = this.cursosService
    //   .obtenerCursos()
    //   .pipe(map((cursos) => new MatTableDataSource<Curso>(cursos)));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.buscador.valueChanges
      .pipe(
        filter((res) => res.length > 2 || res.length === 0),
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((nombre: string) => {
        this.obtenerCursos(nombre);
        // this.tableDataSource$ = this.cursosService
        //   .obtenerCursos(nombre)
        //   .pipe(map((curso) => new MatTableDataSource<Curso>(curso)));
      });
  }

  agregar() {
    //this.cursosService.seleccionarCursoxIndice(-1);
    this.router.navigate(['/cursos/form']);
  }

  seleccionar(id: number) {
    //this.cursosService.seleccionarCursoxId(index);
    this.router.navigate(['/cursos/detalle/'+id]);
  }

  eliminar(item: Curso) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message: 'Esta seguro que desea eliminar el registro de  ' + item?.nombre,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.cursosService
          .borrarCursoxId(item.id)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (e) => console.error(e),
            complete: () => this.obtenerCursos()
              // (this.tableDataSource$ = this.cursosService.obtenerCursos().pipe(
              //   tap((cursos) => console.log(cursos)),
              //   map((cursos) => new MatTableDataSource<Curso>(cursos))
              // )),
          });
      }
    });
  }

  obtenerCursos(nombre?: string) {
    this.tableDataSource$ = this.cursosService.obtenerCursos(nombre).pipe(
      map((cursos) => new MatTableDataSource<Curso>(cursos))
    );
  }

  editar(id: number) {
    //this.cursosService.seleccionarCursoxId(index);
    this.router.navigate(['/cursos/form/'+id]);
  }
}
