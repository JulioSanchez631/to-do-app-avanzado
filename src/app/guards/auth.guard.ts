import { inject } from "@angular/core"
import { Autenticacion } from "../services/auth/autenticacion";
import { map, take } from "rxjs";
import { Router } from "@angular/router";

export const privateGuard = () => { 

  const authServicio = inject(Autenticacion);
  const router = inject(Router);

  return authServicio.user$.pipe(
    take(1),
    map((user) => {

      if(user){
        // console.log('Esta logeado');
        return true;
      } 

      // console.log('No estas logeado');
      router.navigate(['/autenticacion/iniciarSesion']);
      return false;
    })
  )
}

export const publicGuard = () => {

  const authServicio = inject(Autenticacion);
  const router = inject(Router);

  return authServicio.user$.pipe(
    take(1),
    map((user) => {

      if(user){
        router.navigate(['/tareas']);
        return false;
      }
      return true;

    })
  )
}