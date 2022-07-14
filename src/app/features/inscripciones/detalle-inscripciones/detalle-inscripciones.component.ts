import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  inscripcion?: Inscripcion;

  defaultImagen : string = 'assets/logo/green-coder-logo.png'

  constructor(
    private inscripcionesService: InscripcionesService, 
    private router: Router
  ) { }

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.inscripcionesService.obtenerInscripcionSeleccionado().subscribe({
        next: (inscripcion) => {
          if (inscripcion) {
            this.inscripcion = inscripcion;
          } else {
            this.inscripcion = undefined;
          }
        },
        error: (error) => {
          console.error(error);
        },
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
