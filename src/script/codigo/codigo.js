

export const exibirCodigo = () => {
    const codeDisplay = document.createElement('div');
    codeDisplay.id = 'connection-code';
    document.body.appendChild(codeDisplay);

    fetch('http://localhost:3001/get-code')
        .then(res => res.json())
        .then(data => {
            codeDisplay.innerText = `Código de conexão: ${data.code} e ip ${data.ip}`;
        })
        .catch(err => {
            codeDisplay.innerText = 'Erro ao obter código.';
            console.error('Erro ao obter o código de conexão:', err);
        });
}

