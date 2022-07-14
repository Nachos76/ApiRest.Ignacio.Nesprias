export interface Alumno {
    id:number   //id del alumno
    nombre:string   //nombre del alumno
    apellido:string  //apellido del alumno
    dni:string     //dni del alumno
    sexo:string    //sexo del alumno
    fechaNacimiento:string  //fecha de nacimiento del alumno
    direccion:string    //direccion del alumno
    telefono:string   //telefono del alumno
    email:string    //email del alumno
    estado:number   //estado del alumno
    conocimientos:string[]   //conocimientos del alumno
    cursos:string[]   //cursos del alumno
    imagen:string|null   //imagen del alumno
    descripcion?:string   //descripcion/presentacion del alumno
}