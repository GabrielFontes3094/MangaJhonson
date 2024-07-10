import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { loginGuard } from './auth/login.guard';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "home", component: HomeComponent, canActivate: [loginGuard], children:[]},
    {path: '**', redirectTo: '/login' } 
];
