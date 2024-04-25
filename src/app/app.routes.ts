import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LogicComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { SearchComponent } from './components/search/search.component';
import{ AdminwindowComponent } from './components/adminwindow/adminwindow.component';

export const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
    },
    {
        path: 'login',
        component: LogicComponent,
    },
    {
        path: 'welcome',
        component: WelcomeComponent,
    },
    {
        path: 'movie-details/:id',
        component: MovieDetailsComponent,
    },
    {
        path: 'search',
        component: SearchComponent,
    },
    {
        path: 'adminwindow',
        component: AdminwindowComponent,
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    
];
