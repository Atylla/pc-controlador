
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');
require('./http-server');

let comando;

switch (os.platform()) {
    case 'win32':
        comando = 'shutdown /s /t 0';
        break;
    case 'linux':
    case 'darwin':
        comando = 'shutdown -h now';
        break;
    default:
        console.error('Sistema operacional nao suportado.');
        return;
}

function createWindow() {
    const win = new BrowserWindow({
        width: 350,
        height: 550,
        resizable: false,
        maximizable: false,
        minimizable: true,
        closable: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.setMenu(null);
    win.loadFile('./src/index.html');

    ipcMain.on('janela:minimizar', () => {
        win.minimize();
    });

    ipcMain.on('janela:fechar', () => {
        win.close();
    });

    ipcMain.on('desligar-pc', () => {
        exec('touch arquivo.txt', (err, stdout, stderr) => { //comando
            if (err) {
                console.error('Erro ao executar comando:', err);
                return;
            }
            console.log('STDOUT:', stdout);
            console.log('STDERR:', stderr);
            console.log('Arquivo criado com sucesso!');
        });
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
