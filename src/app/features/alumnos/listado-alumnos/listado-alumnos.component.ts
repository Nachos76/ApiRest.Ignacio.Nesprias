import { Alumno } from './../../../models/alumno.model';
import { Component,  OnInit } from '@angular/core';
import { take,filter,debounceTime, distinctUntilChanged, takeUntil,map, Observable, Subscription, Subject } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { MatTableDataSource } from '@angular/material/table';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.scss']
})

export class ListadoAlumnosComponent implements OnInit {

  titulo:string="Listado de Alumnos"
  displayedColumnsTable = ['id', 'nombre', 'edad', 'fechaNacimiento','conocimientos','cursos','estado', 'actions'];
  tableDataSource$: Observable<MatTableDataSource<Alumno>> | undefined;
  destroy$: Subject<boolean> = new Subject<boolean>();
  buscador = new FormControl();

  susbcriptions: Subscription = new Subscription();


  constructor(
    private alumnosService: AlumnosService,
    private dialog: MatDialog,
    private router: Router
  ) { 
    this.obtenerAlumnos();
    // this.tableDataSource$ = this.alumnosService.obtenerAlumnos().pipe(
    //   map((alumnos) => new MatTableDataSource<Alumno>(alumnos))
    // );
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
      this.obtenerAlumnos(nombre);
      // this.tableDataSource$ = this.alumnosService.obtenerAlumnos(nombre).pipe(
      //                                                       map((alumno) => new MatTableDataSource<Alumno>(alumno)));
    })
  }
  
  agregar() {
    //this.alumnosService.seleccionarAlumnoxIndice(-1);
    this.router.navigate(['/alumnos/form']);
  }

  seleccionar(id: number) {
    //this.alumnosService.seleccionarAlumnoxId(index);
    this.router.navigate(['/alumnos/detalle/'+id]);
  }

  eliminar(item: Alumno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message:
        'Esta seguro que desea eliminar el registro de  ' +
        item?.nombre + ' ' + item?.apellido,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.alumnosService
          .borrarAlumnoxId(item.id)
          .pipe(take(1))
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (e) => console.error(e),
            complete: () => this.obtenerAlumnos()
          });
      }
    });
  }

  editar(id: number) {
    //this.alumnosService.seleccionarAlumnoxId(index);
    this.router.navigate(['/alumnos/form/'+id]);
  }

  obtenerAlumnos(nombre?: string) {
    this.tableDataSource$ = this.alumnosService.obtenerAlumnos(nombre).pipe(
      map((alumnos) => new MatTableDataSource<Alumno>(alumnos))
    );
  }
}