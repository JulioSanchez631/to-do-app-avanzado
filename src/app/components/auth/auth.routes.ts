import { Routes } from '@angular/router';

export default [
    {
        path: 'iniciarSesion',
        loadComponent: () => import('./iniciar-sesion/iniciar-sesion')
    },
    {
        path: 'inscribirse',
        loadComponent: () => import('./inscribirse/inscribirse')
    }
] as Routes;