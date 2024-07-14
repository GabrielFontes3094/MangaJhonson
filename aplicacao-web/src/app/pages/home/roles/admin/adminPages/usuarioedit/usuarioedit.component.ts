import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Usuario } from '../../../../../../auth/usuario';
import { Role } from '../../../../../../auth/role';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarioedit',
  standalone: true,
  imports: [],
  templateUrl: './usuarioedit.component.html',
  styleUrl: './usuarioedit.component.scss'
})
export class UsuarioeditComponent {

  role!: Role;

  @Input('usuario') usuario: Usuario = new Usuario(0, "", this.role);
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router)

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    let usuarioRetornado: Usuario = new Usuario(id , "", this.role)
    this.usuario = usuarioRetornado;
  }

}
