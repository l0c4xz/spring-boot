const API_URL = "http://localhost:8080/usuarios";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    alert("ID não informado");
    window.location.href = "usuario.html";
}

// 1. CARREGAR DADOS DO USUÁRIO
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Usuário não encontrado");
        }

        const usuario = await response.json();

        document.getElementById("nome").value = usuario.nome || "";
        document.getElementById("email").value = usuario.email || "";
        document.getElementById("perfil").value = usuario.perfil || "";
        document.getElementById("cidade").value = usuario.cidade || "";
        
        const campoEndereco = document.getElementById("endereco");
        if(campoEndereco) {
            campoEndereco.value = usuario.endereco || "";
        }
    } catch (error) {
        // Erro ignorado conforme solicitado
    }
}); 

// 2. SALVAR ALTERAÇÕES
document.getElementById("form-editar").addEventListener("submit", async function(e) {
    e.preventDefault();

    const campoEndereco = document.getElementById("endereco");

    const usuarioAtualizado = {
        id: id,
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        perfil: document.getElementById("perfil").value,
        cidade: document.getElementById("cidade").value,
        endereco: campoEndereco ? campoEndereco.value : ""
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioAtualizado)
        });

        if (response.ok) {
            window.location.href = "usuario.html";
        }
    } catch (error) {
        // Erro ignorado conforme solicitado
    }
});

function cancelarEdicao() {
    window.location.href = "usuario.html";
}