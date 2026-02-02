import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'tareas/edit/:tareaID', 
    renderMode: RenderMode.Client
  },
  // Es recomendable que 'new' también sea Client si usas guards de auth
  {
    path: 'tareas/new',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
