package com.gabriela.login.controller;
import com.gabriela.login.model.Usuario;
import com.gabriela.login.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping
    public String login(@RequestBody Usuario usuario) {

        return usuarioRepository
                .findByEmailAndSenha(usuario.getEmail(), usuario.getSenha())
                .map(u -> "Login válido")
                .orElse("Login inválido");
    }
}
