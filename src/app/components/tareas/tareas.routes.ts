import { Routes } from '@angular/router';

export default [
    {
        path: 'new',
        loadComponent: () => import('./formulario/formulario')
    },
    {
        path: 'edit/:tareaID',
        loadComponent: () => import('./formulario/formulario')
    },
    {
        path: '',
        loadComponent: () => import('./lista-tareas/lista-tareas'),
        pathMatch: 'full'
    }
] as Routes;