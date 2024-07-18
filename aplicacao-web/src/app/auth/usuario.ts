import { Role } from "./role";

export class Usuario {
  id!: number;
  username!: string;
  password!: string;
  role!: Role

  constructor(id: number, nome: string, password: string, role: Role) {
    this.id = id;
    this.username = nome;
    this.password = password;
    this.role = role;
  }
}
