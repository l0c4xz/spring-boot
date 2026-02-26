package com.gabriela.login.repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gabriela.login.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmailAndSenha(String email, String senha);
}
