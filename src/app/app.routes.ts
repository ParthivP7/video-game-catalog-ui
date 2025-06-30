import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'catalog',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/catalog/catalog.component').then(m => m.CatalogComponent)
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./components/catalog-details/catalog-details.component').then(m => m.CatalogDetailsComponent)
      },
      {
        path: ':videoGameId',
        loadComponent: () =>
          import('./components/catalog-details/catalog-details.component').then(m => m.CatalogDetailsComponent)
      }
    ]
  },
  { path: '', redirectTo: 'catalog', pathMatch: 'full' },
  { path: '**', redirectTo: 'catalog' }
];
