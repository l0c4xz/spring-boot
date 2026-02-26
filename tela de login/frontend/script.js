function fazerLogin() {

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("mensagem").innerText = data;
    })
    .catch(error => {
        console.error("Erro:", error);
    });
}