import { inject, Injectable } from '@angular/core';
import { TareasData } from '../dataAccess/tareas-data';
import { tarea } from '../../interfaces/tarea.interface';

@Injectable({
  providedIn: 'root',
})
export class FiltroServicio {
  
  tareasData = inject(TareasData);

  async filtrado(estado : string, prioridad : string){

    const tareas = await this.tareasData.obtenerTareasLista();

    console.log(`Prioridad ${prioridad}`);
    console.log(`Estado: ${estado}`);

    const tareasPrioridad = tareas.filter((tarea : tarea) => {
      if(prioridad == 'todos'){
        return tarea;
      }else if(tarea.prioridad == prioridad){
        return tarea;
      }

      return;
    });

    const tareasEstado = tareasPrioridad.filter((tarea : tarea) => {

      if(tarea.completado == true && estado == 'completadas'){
        return tarea
      }else if(tarea.completado == false && estado == 'pendientes'){
        return tarea
      }else if(estado == 'todas'){
        return tarea
      }
      return;

    });

    return tareasEstado;
    
  }

}
