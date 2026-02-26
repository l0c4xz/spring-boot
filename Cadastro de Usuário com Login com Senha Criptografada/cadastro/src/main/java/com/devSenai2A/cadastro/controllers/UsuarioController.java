package com.devSenai2A.cadastro.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devSenai2A.cadastro.entities.Usuario;
import com.devSenai2A.cadastro.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

	@Autowired 
	private UsuarioService service;
	
	@GetMapping
	public List<Usuario> listarUsuarios(){
		return service.listarTodos();
	}
	
	@PostMapping
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = service.cadastrar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario);
    }
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletarUsuario(@PathVariable Long id) {

	boolean removido = service.deletar(id);

	if (!removido) {
	return ResponseEntity.notFound().build();
	}

	return ResponseEntity.noContent().build(); // 204
	//return ResponseEntity.ok(usuarioDeletado);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Usuario> atualizarUsuario(
	@PathVariable Long id,
	@RequestBody Usuario usuario) {

	Usuario usuarioAtualizado = service.atualizar(id, usuario);

	if (usuarioAtualizado == null) {
	return ResponseEntity.notFound().build();
	}

	return ResponseEntity.ok(usuarioAtualizado);
	}
	
	//Login
	 @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {

	        String email = dados.get("email");
	        String senha = dados.get("senha");

	        Usuario usuario = service.login(email, senha);

	        if (usuario == null) {
	            return ResponseEntity.status(401).body("Email ou senha inválidos");
	        }

	        return ResponseEntity.ok(usuario);
	 }
}
