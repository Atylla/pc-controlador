export const appHeader = () => {
    document.getElementById('minimize').addEventListener('click', () => {
        window.janela.minimizar();
    });

    document.getElementById('close').addEventListener('click', () => {
        window.janela.fechar();
    });
}