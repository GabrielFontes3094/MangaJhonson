import { Component, inject } from '@angular/core';
import { LoginService } from '../../auth/login.service';
import { Usuario } from '../../auth/usuario';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  loginService = inject(LoginService)
  usuario!: Usuario;

constructor(){
  this.usuario = this.loginService.getUsuarioLogado();
}

}
