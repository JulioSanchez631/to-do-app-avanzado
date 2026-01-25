import { Component, signal, inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { TareasData } from '../../../services/dataAccess/tareas-data';
import { Router, RouterLink } from '@angular/router';

import { tarea } from '../../../interfaces/tarea.interface';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  imports: [PickerComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export default class Formulario {

  public router = inject(Router);

  private route = inject(ActivatedRoute);

  private tareasData = inject(TareasData);

  private fb = inject(FormBuilder);

  formulario = this.fb.group({
    titulo: ['',[Validators.required]],
    descripcion: [''],
    prioridad: ['',[Validators.required]],
    emoji: ['',[Validators.required]]
  });

  // formulario = this.fb.group({
  //   titulo: new FormControl<string>('', {nonNullable: t})
  // })

  mostrarPicker = signal(false);

  public IDtareaItem = signal<string | null>(null);

  ngOnInit(){
    
    const idRecibido = this.route.snapshot.paramMap.get('tareaID');

    if(idRecibido){
      const valoresTareaID = this.tareasData.obtenerTareaID(idRecibido).then((valores) => {
        console.log(valores);

        this.formulario.patchValue({
          titulo: valores?.titulo,
          descripcion: valores?.descripcion,
          prioridad: valores?.prioridad,
          emoji: valores?.emoji
        })
      });

      this.IDtareaItem.set(idRecibido);
      // Recibir valor de fecha de creacion, aunque verifica bien la logica, ya que dicen que si no modificas valores, se mantienen igual en firebase, es decir, tal vez no sea necesario capturar el valor de creacion del documento, ya que ese va a quedar intacto al momento de la actulización.
    }
  }

  valorEmoji(e : any){

    if(e.emoji.native){
      this.formulario.patchValue({
      emoji: e.emoji.native
      });
    } else{
      console.log('NO se encontro existencía de dicho emoji.');
    }

    this.mostrarPicker.set(false);
  }

  activadorPicker(){
    this.mostrarPicker.set(!this.mostrarPicker());
  }

  crearTarea(){

    if(this.formulario.valid){
      const valores = this.formulario.getRawValue();

      const valoresFecha : tarea = {
        ...valores,
        fechaCreacion: Date.now()
      } as tarea;

      this.tareasData.agregarTarea(valoresFecha);
      // console.log('Nuevamente');
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
