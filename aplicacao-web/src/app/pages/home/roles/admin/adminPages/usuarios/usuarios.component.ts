import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Usuario } from '../../../../../../auth/usuario';
import { LoginService } from '../../../../../../auth/login.service';
import Swal from 'sweetalert2';
import { Role } from '../../../../../../auth/role';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsuarioeditComponent } from '../usuarioedit/usuarioedit.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuarioeditComponent, MdbModalModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  usuarios: Usuario[] = [];
  usuarioEdit: Usuario = new Usuario(0, "", "", new Role(0, ""));

  @ViewChild('modalUsuarioNovo') modalUsuarioNovo!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor(private loginService: LoginService, private modalService: MdbModalService) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.loginService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  deletarUsuario(usuario: Usuario) {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Não',
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-primary'
      }
    }).then(result => {
      if (result.isConfirmed) {
        this.loginService.deletarUsuario(usuario.id).subscribe(() => {
          this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
          Swal.fire('Deletado com sucesso', '', 'success');
        });
      }
    });
  }

  edit(usuario: Usuario) {
    this.usuarioEdit = { ...usuario };
    this.modalRef = this.modalService.open(this.modalUsuarioNovo);
  }

  retornoDetalhe(usuario: Usuario) {
    if (usuario.id > 0) {
      const index = this.usuarios.findIndex(x => x.id === usuario.id);
      this.usuarios[index] = usuario;
    }
    this.modalRef.close();
  }

  openModalNovo() {
    this.usuarioEdit = new Usuario(0, "", "", new Role(0, ""));
    this.modalRef = this.modalService.open(this.modalUsuarioNovo);
  }
}
