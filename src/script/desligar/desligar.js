export const btnDesligar = () => {
    document.getElementById('btn-desligar').addEventListener('click', () => {
        window.janela.desligarPC();
    })
}