import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { Usuario } from '../../../../../../auth/usuario';
import { Role } from '../../../../../../auth/role';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../../../../auth/login.service';

@Component({
  selector: 'app-usuarioedit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuarioedit.component.html',
  styleUrls: ['./usuarioedit.component.scss']
})
export class UsuarioeditComponent implements OnInit {

  @Input() usuario: Usuario = new Usuario(0, "", "", new Role(0, ""));
  @Output() retorno = new EventEmitter<any>();

  roles: Role[] = [];
  roleService = inject(LoginService);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.loginService.getRoles().subscribe(roles => this.roles = roles);
  }

  onRoleChange(roleUser: Role) {
    this.usuario.role = roleUser;
  }

  save() {
    this.loginService.salvarUsuario(this.usuario).subscribe(
      response => {
        this.retorno.emit(response);
        Swal.fire('Sucesso!', 'Usuário salvo com sucesso!', 'success').then(() => location.reload());
      },
      error => {
        Swal.fire('Erro!', 'Ocorreu um erro ao salvar o usuário.', 'error');
        this.retorno.emit(error);
      }
    );
  }

  atualizarUsuario() {
    this.loginService.atualizarUsuario(this.usuario.id, this.usuario.role ).subscribe(
      response => {
        this.retorno.emit(response);
        Swal.fire('Sucesso!', 'Usuário atualizado com sucesso!', 'success').then(() => location.reload());
      },
      error => {
        Swal.fire('Erro!', 'Ocorreu um erro ao atualizar o usuário.', 'error');
        this.retorno.emit(error);
      }
    );
  }
}
