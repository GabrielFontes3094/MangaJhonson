import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../../auth/login.service';
import { Usuario } from '../../../../auth/usuario';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  loginService = inject(LoginService)
  usuario!: Usuario;

  constructor(){
    this.usuario = this.loginService.getUsuarioLogado();
  }

}
