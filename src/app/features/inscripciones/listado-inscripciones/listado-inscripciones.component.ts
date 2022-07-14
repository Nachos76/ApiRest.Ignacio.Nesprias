import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { tap, map, Observable, Subscription } from 'rxjs';
import { Inscripcion } from 'src/app/models/inscripcion.model';
import { ConfirmDialogComponent } from 'src/app/shared/components/Dialogs/confirm-dialog/confirm-dialog.component';
import { InscripcionesService } from '../../../core/services/inscripciones.service';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.scss'],
})
export class ListadoInscripcionesComponent implements OnInit {
  titulo: string = 'Listado de Inscripciones';
  displayedColumnsTable = [
    'id',
    'alumno',
    'curso',
    'fecha',
    'estado',
    'actions',
  ];
  tableDataSource$: Observable<MatTableDataSource<Inscripcion>> | undefined;
  buscador = new FormControl();
  susbcriptions: Subscription = new Subscription();

  constructor(
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.tableDataSource$ = this.inscripcionesService
      .obtenerInscripciones()
      .pipe(
        tap((inscripcion) => console.log(inscripcion)),
        map((inscripcion) => new MatTableDataSource<Inscripcion>(inscripcion))
      );
  }

  ngOnInit(): void {
    this.buscador.valueChanges.subscribe((nombre: string) => {
      this.tableDataSource$ = this.inscripcionesService
        .obtenerInscripciones(nombre)
        .pipe(
          map((inscripcion) => new MatTableDataSource<Inscripcion>(inscripcion))
        );
    });
  }

  agregar() {
    this.inscripcionesService.seleccionarInscripcionxIndice(-1);
    this.router.navigate(['/inscripciones/form']);
  }

  seleccionar(id?: number) {
    this.inscripcionesService.seleccionarInscripcionxId(id);
    this.router.navigate(['/inscripciones/detalle']);
  }

  eliminar(item?: Inscripcion) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: 'Confirmar borrado',
      message: 'Esta seguro que desea eliminar el registro de ' + item?.alumno.nombre + ' ' + item?.alumno.apellido + ' del curso ' + item?.curso.nombre,
    };
    const confirmDialog = this.dialog.open(
      ConfirmDialogComponent,
      dialogConfig
    );
    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.inscripcionesService.borrarInscripcionporId(item?.id);
      }
    });
  }

  editar(id?: number) {
    this.inscripcionesService.seleccionarInscripcionxId(id);
    this.router.navigate(['/inscripciones/form']);
  }

}
