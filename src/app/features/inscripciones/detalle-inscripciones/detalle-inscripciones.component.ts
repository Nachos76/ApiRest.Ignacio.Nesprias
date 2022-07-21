import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '@app/core/services/alumnos.service';
import { CursosService } from '@app/core/services/cursos.service';
import { Subscription } from 'rxjs';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { Inscripcion } from '../../../models/inscripcion.model';

@Component({
  templateUrl: './detalle-inscripciones.component.html',
  styleUrls: ['./detalle-inscripciones.component.scss']
})
export class DetalleInscripcionesComponent implements OnInit {
  titulo: string = 'Detalles de la inscripción';
  susbcriptions: Subscription = new Subscription();
  inscripcion!: Inscripcion;

  defaultImagen : string = 'assets/logo/green-coder-logo.png'

  constructor(
    private inscripcionesService: InscripcionesService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService, 
    private alumnosService: AlumnosService
  ) { }

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.activatedRoute.params.subscribe((param) => {
        //this.activatedRoute.snapshot.params['id']  //otra forma de obtener el parametro
        this.inscripcionesService.seleccionarInscripcionxId(Number(param['id'])).subscribe({
          next: (inscripcion) => {
            if (inscripcion) {
              this.inscripcion = inscripcion;       
            } 
            else {
              this.inscripcion;// = undefined;
            }
          },
          error: (error) => {
            console.error(error);
          },
        });
      })
    );

  }

  volver(): void {
    this.router.navigate(['/inscripciones']);
  }

  reemplazarURL(str?:string|null){
    return str?.replace("https://getavataaars.com/", "https://avataaars.io/");

 }

}
