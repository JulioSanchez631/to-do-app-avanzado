import { Component, signal, inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { TareasData } from '../../../services/dataAccess/tareas-data';
import { Router, RouterLink } from '@angular/router';

import { tarea } from '../../../interfaces/tarea.interface';

import { ActivatedRoute } from '@angular/router';
import { Autenticacion } from '../../../services/auth/autenticacion';

import { Loading } from '../../utils/loading/loading';

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
  selector: 'app-formulario',
  imports: [PickerComponent, ReactiveFormsModule, RouterLink, Loading, LucideAngularModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export default class Formulario {

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

  /*
    public listaEmojis = [
    this.fileIcon,
    this.pawPrintIcon,
    this.houseIcon,
    this.hamIcon,
    this.notebookIcon,
    this.pencilIcon,
    this.circleDollarSignIcon,
    this.userRoundIcon,
    this.bicepsFlexedIcon,
    this.shirtIcon,
    this.sunIcon,
    this.cloudIcon,
    this.thermometerIcon,
    this.dumbbellIcon,
    this.phoneCallIcon,
  ];
  */

  listaEquivalencias = [
    {nombre: 'fileIcon', icono: this.fileIcon},
    {nombre: 'pawPrintIcon', icono: this.pawPrintIcon},
    {nombre: 'houseIcon', icono: this.houseIcon},
    {nombre: 'hamIcon', icono: this.hamIcon},
    {nombre: 'notebookIcon', icono: this.notebookIcon},
    {nombre: 'pencilIcon', icono: this.pencilIcon},
    {nombre: 'circleDollarSignIcon', icono: this.circleDollarSignIcon},
    {nombre: 'userRoundIcon', icono: this.userRoundIcon},
    {nombre: 'bicepsFlexedIcon', icono: this.bicepsFlexedIcon},
    {nombre: 'shirtIcon', icono: this.shirtIcon},
    {nombre: 'sunIcon', icono: this.sunIcon},
    {nombre: 'cloudIcon', icono: this.cloudIcon},
    {nombre: 'thermometerIcon', icono: this.thermometerIcon},
    {nombre: 'dumbbellIcon', icono: this.dumbbellIcon},
    {nombre: 'phoneCallIcon', icono: this.phoneCallIcon},
  ]

  // CODIGO EN EL HTML DE ESTE COMPONENTE, EXPLICACIÓN DE TODO

  private autenticacion = inject(Autenticacion);
  private tareasData = inject(TareasData);
  
  public router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  
  public loading = signal<boolean>(true);
  public pickerEmoji = signal<boolean>(false);

  formulario = this.fb.group({
    titulo: ['',[Validators.required]],
    descripcion: [''],
    prioridad: ['',[Validators.required]],
    fechaVencimiento: [''],
    emoji: ['',[Validators.required]],
    completado: [false]
  });

  mostrarPicker = signal(false);

  public IDtareaItem = signal<string | null>(null);

  ngOnInit(){
    
    const idRecibido = this.route.snapshot.paramMap.get('tareaID');

    if(idRecibido){
      const valoresTareaID = this.tareasData.obtenerTareaID(idRecibido).then((valores) => {

        this.formulario.patchValue({
          titulo: valores?.titulo,
          descripcion: valores?.descripcion,
          prioridad: valores?.prioridad,
          fechaVencimiento : valores?.fechaVencimiento,
          emoji: valores?.emoji,
          completado: valores?.completado
        });

        this.loading.set(false);
      });

      this.IDtareaItem.set(idRecibido);
      // Recibir valor de fecha de creacion, aunque verifica bien la logica, ya que dicen que si no modificas valores, se mantienen igual en firebase, es decir, tal vez no sea necesario capturar el valor de creacion del documento, ya que ese va a quedar intacto al momento de la actulización.
      
    }
  }

  mostrar(){

    for(const item of this.listaEquivalencias){
      if(item.nombre == this.formulario.get('emoji')?.value){
        return item.icono;
      }
    }
    
    return;
  }

  valorEmoji(e : any){
    
    this.formulario.patchValue({
      emoji: e.nombre
    });

    this.pickerEmoji.set(false);
  
    // console.log(this.formulario.get('emoji')?.value);
  }

  activadorPicker(){
    this.pickerEmoji.set(!this.pickerEmoji());
    // console.log(this.pickerEmoji());
  }

  crearTarea(){

    if(this.formulario.valid){
      const valores = this.formulario.getRawValue();

      const valoresFecha : tarea = {
        ...valores,
        fechaCreacion: Date.now(),
        idUsuario: this.autenticacion.usuarioActual(),
      } as tarea;

      this.tareasData.agregarTarea(valoresFecha);
      this.router.navigate(['/tareas']);

    } else{
      console.log('El formulario es invalido actualmente');
      this.formulario.markAllAsTouched();
    }
  }

  editarTarea(){
    if(this.formulario.value && this.IDtareaItem()){
      this.tareasData.editarTareaID(this.IDtareaItem() as string, this.formulario.value as tarea);
    }

    this.router.navigate(['/tareas']);
  }

  eliminarTarea(){
    if(typeof this.IDtareaItem() == 'string'){
      this.tareasData.eliminarTareaID(this.IDtareaItem() as string);
      
      this.router.navigate(['/tareas']);
    }
  }

}
