import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { Usuario } from '../../../../../../auth/usuario';
import { LoginService } from '../../../../../../auth/login.service';
import Swal from 'sweetalert2';
import { Role } from '../../../../../../auth/role';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsuarioeditComponent } from '../usuarioedit/usuarioedit.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UsuarioeditComponent, MdbModalModule ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  usuarios: Usuario[] = [];
  role!: Role;
  usuarioRoleEdit: Role = new Role(0, "");
  usuarioEdit: Usuario = new Usuario(0, "", "", this.usuarioRoleEdit);

  @ViewChild('modalUsuarioNovo') modalUsuarioNovo!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor(private loginService: LoginService, private modalService: MdbModalService) {}

  ngOnInit(){
    this.loginService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  deletarUsuario(usuario: Usuario){
    Swal.fire({
      title: 'Tem certeza que deseja deletar este registro?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      cancelButtonText: 'Não',
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.deletarUsuario(usuario.id).subscribe(() => {
          this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
          Swal.fire({
            title: 'Deletado com sucesso',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        });
        window.location.reload();
      }
    });
  }

  edit(usuario: Usuario){
    this.usuarioEdit = Object.assign({}, usuario);
    this.modalRef = this.modalService.open(this.modalUsuarioNovo);
  }

  retornoDetalhe(usuario: Usuario){
    if(usuario.id > 0){
      let indice = this.usuarios.findIndex(x => { return x.id == usuario.id });
      this.usuarios[indice] = usuario;
    }
    this.modalRef.close();
  }

  openModalNovo() {
    this.usuarioEdit = new Usuario(0, "", "",this.usuarioRoleEdit);
    this.modalRef = this.modalService.open(this.modalUsuarioNovo);
  }
}
