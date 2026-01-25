import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc, getDocs ,collectionData, query, orderBy } from '@angular/fire/firestore';
import { tarea } from '../../interfaces/tarea.interface';

import { map, Observable, tap } from 'rxjs';
// import { doc, getDoc } from 'firebase/firestore';

import { doc, getDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class TareasData {
  
  private firestore = inject(Firestore);

  agregarTarea(nuevaTarea : tarea){
    const tareasRef = collection(this.firestore, 'tareas');
    return addDoc(tareasRef, nuevaTarea);
  }

  obtenerTareas(): Observable<tarea[]> {
    const tareasRef = collection(this.firestore, 'tareas');
    
    const query1 = query(tareasRef, orderBy('fechaCreacion', 'desc'));
  
    return (collectionData(query1, {idField: 'id'}) as Observable<tarea[]> ).pipe(
      tap((item) => {
        console.log(item);
      })
    );
  }

  async obtenerTareasLista(){
    const query = await getDocs(collection(this.firestore, 'tareas'));
    
    const tareas = query.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })

    // console.log(tareas);
    return tareas;
  }

  async obtenerTareaID(id : string){

    const tareaRef = doc(this.firestore, 'tareas', id);

    const snapshot = await(getDoc(tareaRef));

    if(snapshot.exists()){
      console.log(snapshot.id);
      return{
        id: snapshot.id,
        ...snapshot.data()
      } as tarea;


    } else{
      console.log('No existe la tarea');
    }
    
    return;
  }

  async editarTareaID(id : string,tareaEditada : tarea){
    try{
      console.log('Tarea editada: ');
      console.log(tareaEditada);
  
      const tareaRef = doc(this.firestore, 'tareas', id);
  
      await updateDoc(tareaRef,{ ...tareaEditada})
      console.log('Tarea actualizada con éxito.');
      console.log(tareaEditada);

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