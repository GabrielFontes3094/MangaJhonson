//AuthenticationService.java
package br.com.MangaJhonson.aplicacao.auth;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
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
	
	@Autowired
    private PasswordEncoder passwordEncoder;


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
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
		this.repository.save(usuario);
		return "Usuario salvo!";
	}
	
	public List<Role> getRoles(){
		return loginRepository.findAll();
	}
	
	public String atualizarUsuario(Long id, Role role) {
	    Usuario usuario = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
	    Role novaRole = loginRepository.findById(role.getId()).orElseThrow(() -> new IllegalArgumentException("Role não encontrada"));
	    usuario.setRole(novaRole);
	    repository.save(usuario);
	    return "Role do usuário atualizada com sucesso!";
	}


}
