 // Verifica se está logado ao carregar a página
        document.addEventListener('DOMContentLoaded', function() {
            verificarLogin();
            exibirUsuarioLogado();
        });
// lista.js
document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'http://localhost:8080/usuarios';
    const tabelaBody = document.querySelector('#tabela-usuarios tbody');
    
    async function carregarUsuarios() {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error('Erro ao carregar usuários');
            }
            
            const usuarios = await response.json();
            
            tabelaBody.innerHTML = '';
            
            if (usuarios.length === 0) {
                tabelaBody.innerHTML = `
                    <tr>
                        <td colspan="5" style="text-align: center; padding: 40px; color: #666;">
                            📭 Nenhum usuário cadastrado
                        </td>
                    </tr>
                `;
                return;
            }
            
usuarios.forEach(usuario => {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td>${usuario.nome || '-'}</td>
        <td>${usuario.email || '-'}</td>
        <td>${usuario.perfil || '-'}</td>
        <td>${usuario.cidade || '-'}</td>
        <td>
            <button class="btn-editar" onclick="window.location.href='editar.html?id=${usuario.id}'">
                <i class="fa-solid fa-pen-to-square"></i> Editar
            </button>
            <button class="btn-excluir" onclick="excluirUsuario(${usuario.id})">
                <i class="fa-solid fa-trash"></i> Excluir
            </button>
        </td>
    `;
    
    tabelaBody.appendChild(tr);
});
        } catch (error) {
            console.error('Erro:', error);
            tabelaBody.innerHTML = `
                <tr>
                    <td colspan="5" style="color: #721c24; text-align: center; padding: 40px; background-color: #f8d7da;">
                         Erro ao carregar usuários: ${error.message}
                    </td>
                </tr>
            `;
        }
    }
    
    
    window.excluirUsuario = async function(id) {
        const confirmar = confirm(` Tem certeza que deseja excluir o usuário ID: ${id}?\n\nEsta ação não pode ser desfeita!`);
        
        if (confirmar) {
            try {
                const botoes = document.querySelectorAll(`button[onclick="excluirUsuario(${id})"]`);
                botoes.forEach(botao => {
                    botao.disabled = true;
                    botao.textContent = ' Excluindo...';
                });
                
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Sucesso na exclusão
                    alert(` Usuário ${id} excluído com sucesso!`);
                    carregarUsuarios(); // Recarrega a lista
                } else if (response.status === 404) {
                    alert(` Usuário ${id} não encontrado!`);
                } else {
                    const erro = await response.json();
                    throw new Error(erro.message || 'Erro ao excluir');
                }
                
            } catch (error) {
                console.error('Erro ao excluir:', error);
                alert(` Erro ao excluir usuário: ${error.message}`);
                
                const botoes = document.querySelectorAll(`button[onclick="excluirUsuario(${id})"]`);
                botoes.forEach(botao => {
                    botao.disabled = false;
                    botao.textContent = ' Excluir';
                });
            }
        }
    };

    carregarUsuarios();
});
