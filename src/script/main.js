import { exibirCodigo } from "./codigo/codigo.js";
import { btnDesligar } from "./desligar/desligar.js";
import { appHeader } from "./janela/janela.js";

window.addEventListener('DOMContentLoaded', () => {
  appHeader();
  btnDesligar();
  exibirCodigo();
});
