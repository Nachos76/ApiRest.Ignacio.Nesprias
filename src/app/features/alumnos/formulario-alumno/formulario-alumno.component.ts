import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Alumno } from 'src/app/models/alumno.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.scss'],
})
export class FormularioAlumnoComponent implements OnInit {
  titulo: string = 'Ingresar nuevo alumno';
  susbcriptions: Subscription = new Subscription();

  formularioAlumno = this.fb.group({
    id: [''],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required]],
    dni: [''],
    sexo: [''],
    fechaNacimiento: ['', [Validators.required, this.fechaValidator]],
    direccion: [''],
    telefono: [''],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
      ],
    ],
    conocimientos: [[]],
    cursos: [['']],
    imagen: [''],
    descripcion: [''],
    estado: ['Activo'],
  });

  // title?: string;
  // message?: string;
  // alumno?: Alumno;
  // local_data: any;

  @Output()
  enviarNuevoAlumno = new EventEmitter<any>();
  constructor(
    // public dialogRef: MatDialogRef<FormularioAlumnoComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnosService: AlumnosService,
    private fb: FormBuilder,
    private router: Router,
    private alumnosServices: AlumnosService,
    private activatedRoute: ActivatedRoute
  ) {
    // this.local_data = { ...data };
    // //this.alumno = this.local_data.item;
    // this.cargarAlumnoParaEditar(this.local_data.item);
  }

  ngOnDestroy() {
    this.susbcriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.susbcriptions.add(
      this.activatedRoute.params.subscribe((param) => {
        //this.activatedRoute.snapshot.params['id']  //otra forma de obtener el parametro
        if (Number(param['id']))
          this.alumnosService
            .seleccionarAlumnoxId(Number(param['id']))
            .subscribe({
              next: (alumno) => {
                if (alumno) {
                  this.formularioAlumno.patchValue(alumno);
                } else {
                  this.formularioAlumno.reset();
                }
              },
              error: (error) => {
                console.error(error);
              },
            });
      })
    );

    // this.susbcriptions.add(
    //   this.alumnosService.obtenerAlumnoSeleccionado().subscribe({
    //     next: (alumno) => {
    //       if (alumno) {
    //         this.formularioAlumno.patchValue(alumno);
    //       } else {
    //         this.formularioAlumno.reset();
    //       }
    //     },
    //     error: (error) => {
    //       console.error(error);
    //     },
    //   })
    // );
  }

  // passwordMatchValidator(g: AbstractControl) {
  //   return g.parent?.get('password')?.value ===
  //     g.parent?.get('confirmPassword')?.value
  //     ? null
  //     : { mismatch: true };
  // }

  fechaValidator(g: AbstractControl) {
    return new Date(g.value).getTime() < Date.now() ? null : { invalid: true };
  }

  cancelar() {
    this.router.navigate(['/alumnos']);
  }

  // agregarUsuario(alumno: Alumno) {
  //   if (alumno.id) {
  //     //es usuario existente
  //     this.alumnosServices.editarAlumno(alumno);
  //   } else {
  //     //es nuevo usuario
  //     alumno.id = this.alumnosServices.obtenerSiguienteId();
  //     alumno.estado=1
  //     this.alumnosServices.agregarAlumno(alumno);
  //   }
  //   this.router.navigate(['/alumnos']);
  //   this.formularioAlumno.reset();
  // }

  agregarUsuario(alumno: Alumno) {
    if (alumno.id) {
      //es usuario existente
      this.susbcriptions.add(
        this.alumnosServices.editarAlumno(alumno).subscribe({
          next: (alumno) => {
            console.log(alumno);
            this.router.navigate(['/alumnos']);
            this.formularioAlumno.reset();
          },
          error: (error) => {
            console.error(error);
          },
        })
      );
    } else {
      //es nuevo usuario
      //curso.id = this.cursosService.obtenerSiguienteId();
      this.susbcriptions.add(
        this.alumnosServices.agregarAlumno(alumno).subscribe({
          next: (alumno) => {
            console.log(alumno);
            this.router.navigate(['/alumnos']);
            this.formularioAlumno.reset();
          },
          error: (error) => {
            console.error(error);
          },
        })
      );
    }
    
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      if(this.conocimientos?.value) {
        this.conocimientos?.value.push(value);
      }
      else{
        this.conocimientos?.setValue([value]);
      }
      this.conocimientos?.updateValueAndValidity();
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(_conocimientos: string): void {
    const index = this.conocimientos?.value.indexOf(_conocimientos);

    if (index >= 0) {
      this.conocimientos?.value.splice(index, 1); // where index = index of removed element
      this.conocimientos?.updateValueAndValidity();
    }
  }

  // use getter method to access courseIds control value easily
  get conocimientos() {
    return this.formularioAlumno.get('conocimientos');
  }

  volver(): void {
    this.router.navigate(['/alumnos']);
  }
}
