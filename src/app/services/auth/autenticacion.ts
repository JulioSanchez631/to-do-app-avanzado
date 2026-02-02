import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';

import { toast } from 'ngx-sonner';

@Injectable({
  providedIn: 'root',
})
export class Autenticacion {
  private _autenticacion = inject(Auth)

  user$ : Observable<any> = authState(this._autenticacion);

  usuarioActual(){
    const valor = this._autenticacion.currentUser?.uid

    // console.log(valor);
    return valor;
  }

  iniciarSesion(email : string, pwd : string){
      return signInWithEmailAndPassword(this._autenticacion, email, pwd);
  }

  inscribirse(email : string, pwd : string){
    console.log('Ejecutado');
    return createUserWithEmailAndPassword(this._autenticacion,email,pwd);
  }

  cerrarSesion(){
    // toast('Se cerro la sesión correctamente.');
    toast.info('Se cerro la sesión correctamente.');

    return signOut(this._autenticacion);
  }

  estadoSesion(){
    console.log(this.user$);
  }

}
