package com.lucca.cadastro.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lucca.cadastro.entities.Usuario;
import com.lucca.cadastro.repository.UsuarioRepository;

@Service
public class UsuarioServices {
   
    @Autowired
    private UsuarioRepository repository;
   
    public List<Usuario> listarTodos(){
        return repository.findAll();
    }
   
    public Usuario cadastrar(Usuario usuario) {
        return repository.save(usuario);
    }

public Usuario atualizar(Long id, Usuario dados) {
Usuario usuario = repository.findById(id).orElse(null);

if (usuario == null) {
return null;
}

usuario.setNome(dados.getNome());
usuario.setEmail(dados.getEmail());
usuario.setSenha(dados.getSenha());
usuario.setPerfil(dados.getPerfil());
usuario.setEndereco(dados.getEndereco());
usuario.setBairro(dados.getBairro());
usuario.setComplemento(dados.getComplemento());
usuario.setCep(dados.getCep());
usuario.setCidade(dados.getCidade());
usuario.setEstado(dados.getEstado());

return repository.save(usuario);
}

public boolean deletar(Long id) {
if (!repository.existsById(id)) {
return false;
}

//localhost:8080/usuarios/3 DELETE
repository.deleteById(id);
return true;
}}