package com.devSenai2A.cadastro.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.devSenai2A.cadastro.entities.Usuario;
import com.devSenai2A.cadastro.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	private UsuarioRepository repository;
	
	public List<Usuario> listarTodos(){
		return repository.findAll();
	}
	
	 public Usuario cadastrar(Usuario usuario) {
	        // senha criptografada
	        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
	        return repository.save(usuario);
	    }

	public boolean deletar(Long id) {
	    if (!repository.existsById(id)) {
	        return false;
	    }
	    
	    repository.deleteById(id);
	    return true;
	}

	public Usuario atualizar(Long id, Usuario usuario) {
		// TODO Auto-generated method stub
		return null;
	}
	@Autowired
	 private BCryptPasswordEncoder passwordEncoder;
	  public Usuario login(String email, String senha) {

	        Usuario usuario = repository.findByEmail(email);

	        if (usuario == null) {
	            return null;
	        }

	        // Validar senha com bcrypt
	        
            if (!passwordEncoder.matches(senha, usuario.getSenha())) {
                return null;
            }
            return usuario;
        }
	
	
	           
	           
	  
}
