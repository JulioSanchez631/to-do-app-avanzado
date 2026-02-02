import { Routes } from '@angular/router';

import { RenderMode } from '@angular/ssr';

export default [
    {
        path: 'new',
        loadComponent: () => import('./formulario/formulario')
    },
    {
        path: 'edit/:tareaID',
        RenderMode: RenderMode.Client,
        loadComponent: () => import('./formulario/formulario')
    },
    {
        path: '',
        loadComponent: () => import('./lista-tareas/lista-tareas'),
        pathMatch: 'full'
    }
] as Routes;