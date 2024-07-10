import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);
  let router = inject(Router);

  let token = loginService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  if(!loginService.hasPermission("ADMIN") && state.url == '/admin'){
    alert('Você não tem permissão de acesso à essa rota!');
    return false;
  }

  return true;
};
