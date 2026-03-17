document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById('calcForm');
    const API_URL = 'http://localhost:8080/usuarios';

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const usuario = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('mail').value.trim(),
            senha: document.getElementById('senha').value.trim(),
            perfil: document.getElementById('perfil').value,
            endereco: document.getElementById('rua').value.trim(),
            bairro: document.getElementById('bairro').value.trim(),
            complemento: document.getElementById('complemento').value.trim(),
            cep: document.getElementById('cep').value.trim(),
            cidade: document.getElementById('cidade').value.trim(),
            estado: document.getElementById('estado').value.trim()
        };

        // Validações básicas
        if (!usuario.nome || !usuario.email || !usuario.senha || !usuario.perfil) {
            mostrarToast('Preencha Nome, Email, Senha e Perfil!', 'erro');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(usuario.email)) {
            mostrarToast('Email inválido!', 'erro');
            return;
        }

        if (usuario.senha.length < 6) {
            mostrarToast('Senha deve ter no mínimo 6 caracteres!', 'erro');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Cadastrando...';
        submitButton.disabled = true;

        try {

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario)
            });

            const responseData = await response.json();

            if (response.ok) {

                mostrarToast('Usuário cadastrado com sucesso!', 'sucesso');

                setTimeout(() => {
                    window.location.href = "usuario.html";
                }, 1500);

            } else {
                const errorMessage = responseData.message || responseData.error || `Erro ${response.status}`;
                throw new Error(errorMessage);
            }

        } catch (error) {

            console.error('Erro:', error);
            mostrarToast('Erro ao cadastrar usuário!', 'erro');

        } finally {

            submitButton.textContent = originalText;
            submitButton.disabled = false;

        }

    });

    // Máscara CEP
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            e.target.value = value;
        });
    }

    // Estado 2 letras
    const estadoInput = document.getElementById('estado');
    if (estadoInput) {
        estadoInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase();
            if (value.length > 2) {
                value = value.substring(0, 2);
            }
            e.target.value = value;
        });
    }

});

// Toast Notification
function mostrarToast(mensagem, tipo) {

    const toast = document.createElement("div");
    toast.classList.add("toast");

    if (tipo === "sucesso") {
        toast.classList.add("toast-sucesso");
    } else {
        toast.classList.add("toast-erro");
    }

    toast.innerText = mensagem;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("mostrar");
    }, 100);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}