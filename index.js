const msg_cliente = {
    tipo: "KEEPALIVE",
    data: "12/10/2020",
    hora: "00:12:59",
    mensagedodia: "mensagem do dia",
    teperatura: ["20ºC", "35ºC"],
    musica: ["00:00:00", "00:04:00"],
    alarm: ["autenticar", "ativado", "sos"],
    portao: { "portaop":"fechado", "portaog": "aberto" },
    lampadas: { "sala": ["false", "false", "true", "true"], "outros": ["false", "false", "true", "false", "false", "false", "false", "false"], "suite": ["true", "false", "flase", "true"], "fora": ["true", "false"] },
    portas: ["false", "false", "false", "true", "false", "true"],
    pastas: "caminho"
}

var express = require('express');
var socket = require('socket.io');
var fs = require('fs');

//--MODULOS SOCKET--//
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

//var msc = new Audio('file:///C:/Users/pereira.matumona/Desktop/js/Eu_Ja_Te_Amava.mp3');

//App setup
var app = express();

var server = app.listen(8080,function() {
    console.log('escutando an porta 8080');
});

//static files 
app.use(express.static('public'));

//socket setupls
var io = socket(server);


//listando Diretorios - caminho recebido como parametro 
//e enviar para clientes
function listarDir(caminho) {
    const fs = require('fs')
    fs.readdir(caminho, (err, paths) => {
        //console.log(paths)
        //const caminho = { tipo: 'PASTAS', msg_cliente.pastas = paths};
        msg_cliente.tipo = 'PASTAS';
        msg_cliente.pastas = paths;
        //io.sockets.emit('chat', msg_cliente);
        socket.emit('chat', msg_cliente);
        //console.log(caminho);
    })
}

//listarDir('C:/Users/pereira.matumona/Music');
//Recebido dos crientes
io.on('connection',function(socket){
    //console.log(socket);
        socket.on('chat', function (data) {
            //console.log(data);
            if (data.tipo == 'lampadas') {
                console.log(data.msg.lampadas);
                //ws.send('Pereira...');
                WebSocket.send('Pereira...');
            }
            if (data.tipo == 'ac') {
                console.log(data.msg.ac);
            }
            if (data.tipo == 'remote') {
                console.log(data.msg.remote);
            }
            if (data.tipo == 'musica') {
                console.log('MUSICA');
            }
            if (data.tipo == 'pesquisa') {
                listarDir('C:/Users/pereira.matumona/Music/' + data.msg.pesquisa[0]);
            }

        });

    socket.on('close', function () {
        console.log('Cliente:'+socket.client.id+ 'Desconectado');
    });

    console.log('Cliente. '+socket.client.id+ ' IP:'+socket.conn.remoteAddress);    
});


function Tocando() {
    console.log('Tocando...');
}


wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`);
    })

    ws.send('ho!');
});
