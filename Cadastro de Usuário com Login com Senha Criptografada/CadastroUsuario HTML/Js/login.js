// login.js - Script para autenticação de usuários

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calcForm');
    const API_URL = 'http://localhost:8080/usuarios/login';
    
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Impede o envio tradicional do formulário
            
            // Coleta os dados do formulário
            const email = document.getElementById('mail').value.trim();
            const senha = document.getElementById('senha').value.trim();
            
            // Validação básica
            if (!email || !senha) {
                alert(' Por favor, preencha todos os campos!');
                return;
            }
            
            // Cria o objeto com os dados de login
            const dadosLogin = {
                email: email,
                senha: senha
            };
            
            // Desabilita o botão durante a requisição
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Entrando...';
            submitButton.disabled = true;
            
            try {
                console.log('Enviando requisição para:', API_URL);
                console.log('Dados:', dadosLogin);
                
                // Faz a requisição para a API de login
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dadosLogin)
                });
                
                console.log('Status da resposta:', response.status);
                
                if (response.ok) {
                    // Login bem-sucedido
                    const usuario = await response.json();
                    
                    // Salva dados do usuário no sessionStorage
                    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                    
                    // Alerta de sucesso
                    alert(` Login realizado com sucesso!\n\nBem-vindo(a), ${usuario.nome || 'Usuário'}!`);
                    
                    console.log('Usuário logado:', usuario);
                    
                    // Redireciona para a página de usuários
                    window.location.href = 'usuario.html';
                } else {
                    // Login inválido
                    let mensagemErro = '';
                    
                    try {
                        const erroTexto = await response.text();
                        mensagemErro = erroTexto || 'Email ou senha inválidos';
                    } catch (e) {
                        mensagemErro = 'Email ou senha inválidos';
                    }
                    
                    alert(`❌ Erro ao fazer login: ${mensagemErro}\n\nPor favor, verifique seu email e senha e tente novamente.`);
                    
                    // Limpa apenas o campo de senha para nova tentativa
                    document.getElementById('senha').value = '';
                    document.getElementById('mail').focus();
                }
            } catch (error) {
                // Erro de rede ou outro erro
                console.error('Erro detalhado:', error);
                
                let mensagemErro = 'Erro ao conectar com o servidor.';
                
                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    mensagemErro = 'Não foi possível conectar ao servidor.\n\nVerifique se o backend está rodando em:\nhttp://localhost:8080';
                } else {
                    mensagemErro = ` ${error.message}`;
                }
                
                alert(mensagemErro);
            } finally {
                // Reabilita o botão
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    } else {
        console.error('Formulário não encontrado! Verifique se o ID "calcForm" existe no HTML.');
    }
});

// Função para verificar se o usuário está logado (para usar em páginas protegidas)
function verificarLogin() {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    
    if (!usuarioLogado) {
        alert(' Você precisa estar logado para acessar esta página!');
        window.location.href = 'login.html';
        return false;
    }
    
    return JSON.parse(usuarioLogado);
}

// Função para fazer logout
function logout() {
    const usuario = JSON.parse(sessionStorage.getItem('usuarioLogado') || '{}');
    const nome = usuario.nome || 'Usuário';
    
    if (confirm(`Tem certeza que deseja sair do sistema?`)) {
        sessionStorage.removeItem('usuarioLogado');
        alert(` Até logo, ${nome}!`);
        window.location.href = 'login.html';
    }
}

// Função para exibir informações do usuário logado
function exibirUsuarioLogado() {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);
        const elementoUsuario = document.getElementById('usuario-logado');
        if (elementoUsuario) {
            elementoUsuario.innerHTML = ` ${usuario.nome || 'Usuário'} (${usuario.perfil || 'USER'})`;
        }
    }
}