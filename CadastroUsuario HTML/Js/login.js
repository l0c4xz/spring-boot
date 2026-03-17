// login.js - Script para autenticação e recuperação de usuários

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calcForm');
    const API_URL = 'http://localhost:8080/usuarios/login';
    
    // --- LÓGICA DE LOGIN ORIGINAL ---
    if (form) {
        form.addEventListener('submit', async function(event) {
            event.preventDefault(); 
            
            const email = document.getElementById('mail').value.trim();
            const senha = document.getElementById('senha').value.trim();
            
            if (!email || !senha) {
                alert(' Por favor, preencha todos os campos!');
                return;
            }
            
            const dadosLogin = { email: email, senha: senha };
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Entrando...';
            submitButton.disabled = true;
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosLogin)
                });
                
                if (response.ok) {
                    const usuario = await response.json();
                    sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                    alert(` Login realizado com sucesso!\n\nBem-vindo(a), ${usuario.nome || 'Usuário'}!`);
                    window.location.href = 'usuario.html';
                } else {
                    alert('❌ Email ou senha inválidos');
                    document.getElementById('senha').value = '';
                }
            } catch (error) {
                alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
});

// --- FUNÇÕES DO MODAL DE RECUPERAÇÃO ---

function abrirModal() {
    const modal = document.getElementById("modalRecuperacao");
    if (modal) modal.style.display = "flex";
}

function fecharModal() {
    const modal = document.getElementById("modalRecuperacao");
    if (modal) {
        modal.style.display = "none";
        document.getElementById("statusRecuperacao").textContent = "";
        document.getElementById("emailRecuperar").value = "";
    }
}

async function enviarEmailRecuperacao() {
    const email = document.getElementById("emailRecuperar").value.trim();
    const status = document.getElementById("statusRecuperacao");

    if (!email) {
        status.style.color = "#ef4444";
        status.textContent = "Por favor, informe o e-mail.";
        return;
    }

    status.style.color = "#38bdf8";
    status.textContent = "Processando envio...";

    try {
        // encodeURIComponent é essencial para que o "@" não quebre a URL
        const url = `http://localhost:8080/usuarios/solicitar-recuperacao?email=${encodeURIComponent(email)}`;
        
        const response = await fetch(url, {
            method: "POST"
        });

        if (response.ok) {
            status.style.color = "#22c55e";
            status.textContent = "Link enviado! Verifique seu e-mail.";
            // Opcional: fechar o modal após 3 segundos
            setTimeout(fecharModal, 3000);
        } else if (response.status === 404) {
            status.style.color = "#ef4444";
            status.textContent = "E-mail não cadastrado no sistema.";
        } else {
            status.style.color = "#ef4444";
            status.textContent = "Erro ao processar solicitação.";
        }
    } catch (error) {
        status.style.color = "#ef4444";
        status.textContent = "Erro de conexão com o servidor.";
    }
}

// --- FUNÇÕES UTILITÁRIAS (LOGOUT E VERIFICAÇÃO) ---

function verificarLogin() {
    const usuarioLogado = sessionStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        window.location.href = 'login.html';
        return false;
    }
    return JSON.parse(usuarioLogado);
}

function logout() {
    if (confirm(`Tem certeza que deseja sair?`)) {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = 'login.html';
    }
}