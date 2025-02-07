import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
    },
    {
        path: 'create-game',
        loadComponent: () => import('./pages/create-game/create-game.page').then(m => m.CreateGamePage)
    },
    {
        path: 'game',
        loadComponent: () => import('./pages/game/game.page').then(m => m.GamePage)
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];