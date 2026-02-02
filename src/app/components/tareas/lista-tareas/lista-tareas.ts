import { Component, inject, PLATFORM_ID, signal, ViewChild, viewChild, ElementRef } from '@angular/core';
import { Autenticacion } from '../../../services/auth/autenticacion';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { TareasData } from '../../../services/dataAccess/tareas-data';
import { tarea } from '../../../interfaces/tarea.interface';
import { isPlatformBrowser } from '@angular/common';

import { Loading } from '../../utils/loading/loading';
import { FiltroServicio } from '../../../services/filtros/filtro-servicio';

import { LucideAngularModule, 
  FileIcon, 
  PawPrintIcon /* pata de perro */, 
  HouseIcon,
  HamIcon /* Pedazo de carne */,
  NotebookIcon,
  PencilIcon,
  CircleDollarSignIcon,
  UserRoundIcon,
  BicepsFlexedIcon,
  ShirtIcon,
  SunIcon,
  CloudIcon,
  ThermometerIcon /* Termometro */,
  DumbbellIcon /* Pesas */,
  PhoneCallIcon
} 
from 'lucide-angular';

@Component({
  selector: 'app-lista-tareas',
  imports: [RouterLink, Loading, LucideAngularModule],
  templateUrl: './lista-tareas.html',
  styleUrl: './lista-tareas.css',
})
export default class ListaTareas {

  readonly fileIcon = FileIcon;
  readonly pawPrintIcon = PawPrintIcon;
  readonly houseIcon = HouseIcon;
  readonly hamIcon = HamIcon;
  readonly notebookIcon = NotebookIcon;
  readonly pencilIcon = PencilIcon;
  readonly circleDollarSignIcon = CircleDollarSignIcon;
  readonly userRoundIcon = UserRoundIcon;
  readonly bicepsFlexedIcon = BicepsFlexedIcon;
  readonly shirtIcon = ShirtIcon;
  readonly sunIcon = SunIcon;
  readonly cloudIcon = CloudIcon;
  readonly thermometerIcon = ThermometerIcon;
  readonly dumbbellIcon = DumbbellIcon;
  readonly phoneCallIcon = PhoneCallIcon;

  loading = signal<boolean>(true);

  authServicio = inject(Autenticacion);
  filtrosServicio = inject(FiltroServicio);
  router = inject(Router);

  private plataformID = inject(PLATFORM_ID);

  tareasServicio = inject(TareasData);
  public tareas = signal<tarea[]>([]);

  @ViewChild('priori') selectPrioridad !: ElementRef<HTMLSelectElement>
  @ViewChild('state') selectEstado !: ElementRef<HTMLSelectElement>

  async ngOnInit(){
    
    if(isPlatformBrowser(this.plataformID)){

      const listaTareas = await this.tareasServicio.obtenerTareasLista();

      this.loading.set(false);

      this.tareas.set(listaTareas);

      console.log(this.tareas());
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

  async ejecutarFiltrado(){
    const selectEstado = this.selectEstado.nativeElement.value;
    const selectPrioridad = this.selectPrioridad.nativeElement.value;

    const tareasFiltradas = await this.filtrosServicio.filtrado(selectEstado, selectPrioridad);

    this.tareas.set(tareasFiltradas);
  }

}
