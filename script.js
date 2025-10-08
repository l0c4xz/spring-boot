document.getElementById('calcForm').addEventListener('submit', async function(e){
    e.preventDefault(); // Evita recarregar a página

    const num1 = parseFloat(document.getElementById('num1').value);
    const conversao = document.getElementById('conversao').value; 
    const convertor = document.getElementById('convertor').value; 

  
    document.getElementById('erro').textContent = '';
    document.getElementById('resultado').textContent = '';


    if (isNaN(num1)) {
        document.getElementById('erro').textContent = 'Por favor, insira um número válido';
        return;
    }

    if (conversao === convertor) {
        document.getElementById('erro').textContent = 'As unidades de conversão não podem ser iguais';
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/calcular', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                num1: num1.toString(),
                convertor: convertor,
                conversao: conversao
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }
        
        const data = await response.json();

        if (data.erro) { 
            document.getElementById('erro').textContent = data.erro;
            document.getElementById('resultado').textContent = '';
        } else {
            document.getElementById('resultado').textContent = 'Resultado: ' + data.resultado.toFixed(2);
            document.getElementById('erro').textContent = '';
        }
    } catch(err) {
        document.getElementById('erro').textContent = 'Erro de conexão: ' + err.message;
        document.getElementById('resultado').textContent = '';
    }
});