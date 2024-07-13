import { Component } from '@angular/core';
import { Usuario } from '../../../../../../auth/usuario';
import { LoginService } from '../../../../../../auth/login.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  usuarios: Usuario[] = [];

  constructor(private loginService: LoginService){}

  ngOnInit(){
    this.loginService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    })
  }

}
