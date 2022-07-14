import { Alumno } from './../../../models/alumno.model';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { tap, map, Observable, Subscription } from 'rxjs';
import { ALUMNOS } from 'src/app/data/mock-alumnos';
import { DetalleAlumnoComponent } from '../detalle-alumno/detalle-alumno.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormularioAlumnoComponent } from '../formulario-alumno/formulario-alumno.component';
import { GrillaComponent } from 'src/app/shared/components/grilla/grilla.component';
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

  buscador = new FormControl();

  susbcriptions: Subscription = new Subscription();


  constructor(
    private alumnosService: AlumnosService,
    private dialog: MatDialog,
    private router: Router
  ) { 
    this.tableDataSource$ = this.alumnosService.obtenerAlumnos().pipe(
      map((alumnos) => new MatTableDataSource<Alumno>(alumnos))
    );
  }

  ngOnInit(): void {
    this.buscador.valueChanges.subscribe((nombre: string) => {
      this.tableDataSource$ = this.alumnosService.obtenerAlumnos(nombre).pipe(
                                                            map((alumno) => new MatTableDataSource<Alumno>(alumno)));
    })
  }
  
  agregar() {
    this.alumnosService.seleccionarAlumnoxIndice(-1);
    this.router.navigate(['/alumnos/form']);
  }

  seleccionar(index?: number) {
    this.alumnosService.seleccionarAlumnoxId(index);
    this.router.navigate(['/alumnos/detalle']);
  }

  eliminar(item?: Alumno) {
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
        this.alumnosService.borrarAlumnoporId(item?.id);
      }
    });
  }

  editar(index?: number) {
    this.alumnosService.seleccionarAlumnoxId(index);
    this.router.navigate(['/alumnos/form']);
  }

}