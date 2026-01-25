import { inject, Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Autenticacion {
  private _autenticacion = inject(Auth)

  user$ : Observable<any> = authState(this._autenticacion);

  iniciarSesion(email : string, pwd : string){
    return signInWithEmailAndPassword(this._autenticacion, email, pwd);
  }

  inscribirse(email : string, pwd : string){
    console.log('Ejecutado');
    return createUserWithEmailAndPassword(this._autenticacion,email,pwd);
  }

  cerrarSesion(){
    return signOut(this._autenticacion);
  }

  estadoSesion(){
    console.log(this.user$);
  }

}
