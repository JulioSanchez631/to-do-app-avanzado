import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from'@angular/forms';
import { Autenticacion } from '../../../services/auth/autenticacion';
import { Router, RouterLink } from '@angular/router';

// INSCRIBIRSE.TS

@Component({
  selector: 'app-inscribirse',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './inscribirse.html',
  styleUrl: './inscribirse.css',
})
export default class Inscribirse {

  router = inject(Router);

  authServicio = inject(Autenticacion);

  private formBuilder = inject(FormBuilder);
  
  loginForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  enviar(e : Event){
    // e.preventDefault();

    console.log('Enviado...');

    console.log(this.loginForm.value);

    if(this.loginForm.valid){

      console.log('Enviado2');

      const email = this.loginForm.get('email')?.value;
      const pwd = this.loginForm.get('password')?.value;

      if(typeof email == 'string' && typeof pwd == 'string'){
        console.log('Hola');
        this.authServicio.inscribirse(email, pwd);
        this.router.navigate(['/autenticacion/iniciarSesion']);
      }


    }else if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    } else{
      console.log(90909090);
    }
  }

}
