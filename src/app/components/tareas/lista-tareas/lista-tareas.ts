import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { Autenticacion } from '../../../services/auth/autenticacion';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { TareasData } from '../../../services/dataAccess/tareas-data';
import { tarea } from '../../../interfaces/tarea.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-lista-tareas',
  imports: [RouterLink],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css',
})
export default class ListaTareas {

  authServicio = inject(Autenticacion);
  router = inject(Router);

  private plataformID = inject(PLATFORM_ID);

  tareasServicio = inject(TareasData);
  public tareas = signal<tarea[]>([]);

  async ngOnInit(){
    
    if(isPlatformBrowser(this.plataformID)){

      const listaTareas : tarea[] = await this.tareasServicio.obtenerTareasLista() as tarea[];

      this.tareas.set(listaTareas);
      
      // console.log(listaTareas);
      // console.log(this.tareas());
    }

  }

  cerrarSesion(){
    
    this.authServicio.user$.pipe(
      map((user) => {
        console.log(user);
      })
    )

    this.authServicio.cerrarSesion();
    this.router.navigate(['/autenticacion/iniciarSesion']);
  }

}
