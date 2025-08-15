const express = require('express');
const http = require('http');
const os = require('os');
const { generateCode } = require('./utils/generateCode.js');
const { setCode } = require('./shared/connection-code.js');

const app = express();
app.use(express.json());

function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (let iface of Object.values(interfaces)) {
        for (let config of iface) {
            if (config.family === 'IPv4' && !config.internal) {
                return config.address;
            }
        }
    }
    return 'localhost';
}

const code = generateCode();
setCode(code);

let connectedDevices = [];
let connectionCode = code;

app.get('/get-code', (req, res) => {
    res.json({ code: connectionCode, ip: getLocalIp() });
});

app.post('/connect', (req, res) => {
    const { code, deviceId } = req.body;

    if (code === connectionCode) {
        connectedDevices.push(deviceId);
        console.log(`Dispositivo conectado: ${deviceId}`);
        connectionCode = null;
        res.json({ success: true });
    } else {
        res.status(403).json({ success: false, message: 'Código inválido' });
    }
});

app.post('/desligar', (req, res) => {
    console.log('Recebido comando de desligar');
    const { exec } = require('child_process');
    exec('touch arquivo.txt');
    res.send({ status: 'desligando...' });
});

const PORT = 3001;
http.createServer(app).listen(PORT, () => {
    console.log(`Servidor HTTP rodando em http://${getLocalIp()}:${PORT}`);
});
