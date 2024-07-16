//AuthenticationService.java
package br.com.MangaJhonson.aplicacao.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import br.com.MangaJhonson.aplicacao.config.JwtServiceGenerator;

@Service
public class LoginService {
	
	@Autowired
	private RoleRepository loginRepository;
	
	@Autowired
	private LoginRepository repository;
	
	@Autowired
	private JwtServiceGenerator jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;


	public String logar(Login login) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						login.getUsername(),
						login.getPassword()
						)
				);
		Usuario user = repository.findByUsername(login.getUsername()).get();
		String jwtToken = jwtService.generateToken(user);
		
		return jwtToken;
	}
	
	public List<Usuario> getUsuarios(){
		return repository.findAll();
	}
	
	public String deletarUsuario(Long id) {
		this.repository.deleteById(id);
		return "Usuario deletado!";
	}
	
	public String salvarUsuario(Usuario usuario) {
		this.repository.save(usuario);
		return "Usuario salvo com sucesso";
	}
	
	public List<Role> getRoles(){
		return loginRepository.findAll();
	}

}
