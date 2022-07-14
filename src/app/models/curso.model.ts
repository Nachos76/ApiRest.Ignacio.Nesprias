export interface Curso {
    id:number   //id del usuario
    nombre:string   //nombre del curso
    descripcion?:string,  //descripcion/presentacion del curso
    fechaInicio:string, //FechaInicio
    cantClases:number, //cantidad clases del curso
    precio:number //precio del curso
    capacidad:number //Cantidad de inscripciones posibles
    estado:number   //estado del curso //Activo-inactiva
    imagen:string|null   //logo del curso si lo tiene
}

