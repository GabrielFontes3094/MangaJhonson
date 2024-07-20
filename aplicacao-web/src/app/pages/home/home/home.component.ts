import { Component, AfterViewInit, inject } from '@angular/core';
import { LoginService } from '../../../auth/login.service';
import { Usuario } from '../../../auth/usuario';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../homePages/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  loginService = inject(LoginService)
  usuario!: Usuario;

  constructor(){
    this.usuario = this.loginService.getUsuarioLogado();
  }

  ngAfterViewInit() {
    const hamburguer = document.getElementById('hamburguer');
    const parentbox2 = document.querySelector('.parentbox1');
    const parentbox3 = document.querySelector('.parentbox2');

    if (hamburguer && parentbox2 && parentbox3) {
      hamburguer.addEventListener('click', () => {
        parentbox2.classList.toggle('recuado');
        parentbox3.classList.toggle('recuado2');
      });
    }
  }
}
