package br.com.MangaJhonson.aplicacao.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginController {

	@Autowired
	private LoginService loginService;

	@PostMapping
	public ResponseEntity<String> logar(@RequestBody Login login) {
		try {
			return ResponseEntity.ok(loginService.logar(login));
		}catch(AuthenticationException ex) {
			System.out.println(ex.getMessage());
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/usuarios")
	public ResponseEntity<List<Usuario>> getUsers() {
		try {
			return ResponseEntity.ok(loginService.getUsuarios());
		}catch(AuthenticationException ex) {
			System.out.println(ex.getMessage());
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/salvarUsuario")
	public ResponseEntity<String> salvarUsuario(@RequestBody Usuario usuario){
		try {
			 String mensagem = this.loginService.salvarUsuario(usuario);
			 return new ResponseEntity<String>(mensagem, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/deletarUsuario/{id}")
	public ResponseEntity<String> deletarUsuario(@PathVariable Long id){
		try {
			 String usuario = this.loginService.deletarUsuario(id);
			 return new ResponseEntity<String>(usuario, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}
	
	@PutMapping("/atualizarUsuario/{id}")
	public ResponseEntity<String> atualizarUsuario(@PathVariable Long id, @RequestBody Role role) {
	    try {
	        String mensagem = loginService.atualizarUsuario(id, role);
	        return new ResponseEntity<>(mensagem, HttpStatus.OK);
	    } catch (Exception e) {
	        System.out.println(e.getMessage());
	        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
	    }
	}
	
	
	@GetMapping("/roles")
	public ResponseEntity<List<Role>> getRoles() {
		try {
			return ResponseEntity.ok(loginService.getRoles());
		}catch(AuthenticationException ex) {
			System.out.println(ex.getMessage());
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	}

}
