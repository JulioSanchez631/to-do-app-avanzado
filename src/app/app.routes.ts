import { Routes } from '@angular/router';
import { privateGuard } from './guards/auth.guard';
import { publicGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'autenticacion',
        canActivate: [publicGuard],
        loadChildren: () => import('./components/auth/auth.routes')
    },
    {
        path: 'tareas',
        canActivate: [privateGuard],
        loadChildren: () => import('./components/tareas/tareas.routes')
    },
    {
        path: '',
        redirectTo: 'tareas',
        pathMatch: 'full'
    }
];
