import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs ,collectionData, query, orderBy, where } from '@angular/fire/firestore';
import { tarea } from '../../interfaces/tarea.interface';

import { map, Observable, tap } from 'rxjs';
// import { doc, getDoc } from 'firebase/firestore';

import { doc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Autenticacion } from '../auth/autenticacion';


@Injectable({
  providedIn: 'root',
})
export class TareasData {
  
  private autenticacion = inject(Autenticacion);
  private firestore = inject(Firestore);

  agregarTarea(nuevaTarea : tarea){
    console.log(nuevaTarea);
    const tareasRef = collection(this.firestore, 'tareas');
    return addDoc(tareasRef, nuevaTarea);
  }

  // Función collectionData no funciona correctamente, nos da error tipo doble SDK.
  obtenerTareas(): Observable<tarea[]> {
    const tareasRef = collection(this.firestore, 'tareas');
    
    const query1 = query(tareasRef, orderBy('fechaCreacion', 'desc'));
  
    return (collectionData(query1, {idField: 'id'}) as Observable<tarea[]> ).pipe(
      tap((item) => {
        console.log(item);
      })
    );
  }

  async obtenerTareasLista() : Promise<any> {
    const userUID = this.autenticacion.usuarioActual();

    if(userUID){
      try{

        const tareasRef = collection(this.firestore, 'tareas');

        const q = query(tareasRef, where('idUsuario','==',userUID));

        const querySnapshot = await getDocs(q);

        const tareas = querySnapshot.docs.map((doc) => {
          
          
          return {
            id: doc.id,
            ...doc.data()
          }
        });

        return tareas;

      }catch(e){
        console.error(e);
        throw e;
      }
    }
  }

  async obtenerTareaID(id : string){

    const tareaRef = doc(this.firestore, 'tareas', id);

    const snapshot = await(getDoc(tareaRef));

    if(snapshot.exists()){

      return{
        id: snapshot.id,
        ...snapshot.data()
      } as tarea;


    } else{
      console.log('No existe la tarea');
    }
    
    return;
  }

  async editarTareaID(id : string,tareaEditada ?: tarea){
    try{
      const tareaRef = doc(this.firestore, 'tareas', id);
      
      await updateDoc(tareaRef,{ ...tareaEditada})

      console.log(`Tarea actualizada con exito.`);

    } catch(e) {
      console.log(e);
      throw e;
    }

  }

  async eliminarTareaID(id : string){
    try{
      const tareaRef = doc(this.firestore, 'tareas', id);
      await deleteDoc(tareaRef);
      console.log(`La tarea ha sido eliminada correctamente.`);
    
    } catch(e){
      console.log(e);
      throw e;
    }

  }
  
}