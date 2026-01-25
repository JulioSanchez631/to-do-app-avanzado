import { Component, inject, NgZone } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from'@angular/forms';
import { Autenticacion } from '../../../services/auth/autenticacion';
import { Router, RouterLink } from '@angular/router';
import { map, take } from 'rxjs';

@Component({
  selector: 'app-iniciar-sesion',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './iniciar-sesion.html',
  styleUrl: './iniciar-sesion.css',
})
export default class IniciarSesion {

  private router = inject(Router);
  private authServicio = inject(Autenticacion);
  private ngZone = inject(NgZone);

  private formBuilder = inject(FormBuilder);
  
  loginForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  enviar(e : Event){

    if(this.loginForm.valid){

      const email = this.loginForm.get('email')?.value;
      const pwd = this.loginForm.get('password')?.value;

      if(typeof email == 'string' && typeof pwd == 'string'){
        
          this.authServicio.iniciarSesion(email, pwd).then(() => {
            this.router.navigate(['/tareas']);
          });
        
      }


    }else if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }
  }

}
