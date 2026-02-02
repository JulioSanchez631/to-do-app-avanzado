// export interface tarea {
//   id ?: string,  
//   titulo : string,   
//   descripcion ?: string, 
//   prioridad : 'alta' | 'media' | 'baja', 
//   emoji : string,  
//   fechaCreacion : number 
// }

export interface tarea {
  id ?: string,  
  titulo : string,   
  descripcion ?: string, 
  prioridad : 'alta' | 'media' | 'baja', 
  fechaVencimiento : string,
  emoji : string,  
  fechaCreacion : number,
  idUsuario: string,
  completado: boolean
}