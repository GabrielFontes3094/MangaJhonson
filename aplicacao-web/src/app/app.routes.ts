import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home/home.component';
import { loginGuard } from './auth/login.guard';
import { ReadComponent } from './pages/home/homePages/read/read.component';
import { FavoritesComponent } from './pages/home/homePages/favorites/favorites.component';
import { AdminComponent } from './pages/home/roles/admin/admin/admin.component';
import { CadastrosComponent } from './pages/home/roles/admin/adminPages/cadastros/cadastros.component';
import { UsuariosComponent } from './pages/home/roles/admin/adminPages/usuarios/usuarios.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "home", redirectTo: "home/read", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "home", component: HomeComponent, canActivate: [loginGuard], children:[
        {path: "read", component: ReadComponent},
        {path: "favorite", component: FavoritesComponent},
        {path: "admin", component: AdminComponent, children:[
            {path: "usuarios", component: UsuariosComponent}
        ]}
        
        
    ]},
    {path: '**', redirectTo: 'home/read'}, 
];
