import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Usuario } from '../../../../../../auth/usuario';
import { Role } from '../../../../../../auth/role';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../../../../../auth/login.service';

@Component({
  selector: 'app-usuarioedit',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './usuarioedit.component.html',
  styleUrls: ['./usuarioedit.component.scss']})
export class UsuarioeditComponent {

  role!: Role;
  roles: Role[] = [];

  @Input('role') role2: Role = new Role(0, "");
  @Input('usuario') usuario: Usuario = new Usuario(0, "", "", this.role2);
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router)


  constructor(
    private route: ActivatedRoute,
    private route2r: Router,
    private loginService: LoginService
  ){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles() {
    this.loginService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }

  findById(id: number){
    let usuarioRetornado: Usuario = new Usuario(id ,"", "", this.role)
    this.usuario = usuarioRetornado;
  }

  onRoleChange(roleUser: Role) {
    this.usuario.role = roleUser;
    console.log(roleUser)
  }

  save() {
    this.loginService.salvarUsuario(this.usuario).subscribe(
      (response) => {
        this.retorno.emit(response);
        Swal.fire('Sucesso!', 'Usuário salvo com sucesso!', 'success').then(() => {
          location.reload();
        });
       
      },
      (error) => {
        Swal.fire('Erro!', 'Ocorreu um erro ao salvar o usuário.', 'error');
        this.retorno.emit(error);
      }
    );
  }



}
