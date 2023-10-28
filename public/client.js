
//MENSAGEM DO CLLIENTE PARA SERVIDOR JSON
const msg_srv = {
    lampadas: ["comodo", "lampada"],
    ac: ["aparelho", "comando"],
    remote: ["aparelho", "comando"],
    musica: ["caminho", "comando"],
    pesquisa: ["pasta", "caminho"]
};

var checkedAC = 'salaAP';
var checkedAP = 'tvAP';
var alarmcheck = false
var codigoActual='';
var i = 0;
var AlarmTimer;
var alermDownTime = 11;
var alarmArmado = false;
var _beep = new Audio("audio/beep.mp3")

var tictocAlarm;
var piscar = 0;

//Caminho
let _caminho_ = '';

//Make connection
var socket = io.connect('http://192.168.15.126:8080');

//var socket = io.connect('http://localhost:8080');

//Query DOM - CABECALHO
var globo = document.getElementById('');
var onlineImg = document.getElementById('onlineImg');
var onlineTx = document.getElementById('onlineTx');
var user = document.getElementById('');
var exit = document.getElementById('');
//Query DOM - BOM DIA 
var mensagemDia = document.getElementById('mensagemDia');
var bomdia = document.getElementById('bomdia');
var dsemana = document.getElementById('dsemana');
var data = document.getElementById('data');
var hora = document.getElementById('hora');
var tempSala = document.getElementById('tempSala');
var tempFora = document.getElementById('tempFora');
var imagemCeu = document.getElementById('imagemCeu');
//Query DOM - ALARME
var um = document.getElementById('um').addEventListener('click', function () { teclado('1') }, false);
var dois = document.getElementById('dois').addEventListener('click', function () { teclado('2') }, false);
var tres = document.getElementById('tres').addEventListener('click', function () { teclado('3') }, false);
var quatro = document.getElementById('quatro').addEventListener('click', function () { teclado('4') }, false);
var cinco = document.getElementById('cinco').addEventListener('click', function () { teclado('5') }, false);
var seis = document.getElementById('seis').addEventListener('click', function () { teclado('6') }, false);
var sete = document.getElementById('sete').addEventListener('click', function () { teclado('7') }, false);
var oito = document.getElementById('oito').addEventListener('click', function () { teclado('8') }, false);
var nove = document.getElementById('nove').addEventListener('click', function () { teclado('9') }, false);
var dez = document.getElementById('zero').addEventListener('click', function () { teclado('0') }, false);
var cls = document.getElementById('cls').addEventListener('click', function () { limparAlarm() }, false);
var alarm_info = document.getElementById('alarm_info');
var alarm_img = document.getElementById('alarm_img');
var alarm_sos = document.getElementById('alarm_sos').addEventListener('click', function () { ativarAlarm() }, false);
var sos = document.getElementById('sos');
//Query DOM - PORTAO
var camPortao = document.getElementById('camPortao');
var portaop = document.getElementById('portaop');
var portaoG = document.getElementById('portaoG');
//Query DOM - LAMP
var salaLamp1 = document.getElementById('salaLamp1').addEventListener('click', function () { mensagem_enviada('lampadas', 'sala1', 'activar') }, false );
var salaLamp2 = document.getElementById('salaLamp2').addEventListener('click', function () { mensagem_enviada('lampadas', 'sala2', 'activar') }, false);
var salaSancaLamp1 = document.getElementById('salaSancaLamp1').addEventListener('click', function () { mensagem_enviada('lampadas', 'sanca1', 'activar') }, false);
var salaSancaLamp1 = document.getElementById('salaSancaLamp2').addEventListener('click', function () { mensagem_enviada('lampadas', 'sanca2', 'activar') }, false);
var suiteLamp = document.getElementById('suiteLamp').addEventListener('click', function () { mensagem_enviada('lampadas', 'suite', 'activar') }, false);
var suiteSanca = document.getElementById('suiteSanca').addEventListener('click', function () { mensagem_enviada('lampadas', 'suiteSanca', 'activar') }, false);
var suiteCabLamp1 = document.getElementById('suiteCabLamp1').addEventListener('click', function () { mensagem_enviada('lampadas', 'suitecab1', 'activar') }, false);
var suiteCabLamp2 = document.getElementById('suiteCabLamp2').addEventListener('click', function () { mensagem_enviada('lampadas', 'suitecab2', 'activar') }, false);
var quartoLamp1 = document.getElementById('quartoLamp1').addEventListener('click', function () { mensagem_enviada('lampadas', 'quarto1', 'activar') }, false);
var quartoLamp2 = document.getElementById('quartoLamp2').addEventListener('click', function () { mensagem_enviada('lampadas', 'quarto2', 'activar') }, false);
var quartoLamp3 = document.getElementById('quartoLamp3').addEventListener('click', function () { mensagem_enviada('lampadas', 'quarto3', 'activar') }, false);
var quartoLamp4 = document.getElementById('quartoLamp4').addEventListener('click', function () { mensagem_enviada('lampadas', 'quarto4', 'activar') }, false);
var wcLamp = document.getElementById('wcLamp');
var cozinhaLamp = document.getElementById('cozinhaLamp').addEventListener('click', function () { mensagem_enviada('lampadas', 'cozinha', 'activar') }, false);
var ArrumosLamp = document.getElementById('arrumosLamp');
var dispensaLamp = document.getElementById('dispensaLamp').addEventListener('click', function () { mensagem_enviada('lampadas', 'dispensa', 'activar') }, false);
var wcExtLamp = document.getElementById('wcExtLamp');
var quintalLamp = document.getElementById('quintalLamp').addEventListener('click', function () { mensagem_enviada('lampadas', 'quinta', 'activar') }, false);
//Query DOM - AC
var acSalaAP = document.getElementById('acSalaAP').addEventListener('click', function () { checedBox('salaAP') }, false);
var acSuiteAP = document.getElementById('acSuiteAP').addEventListener('click', function () { checedBox('suiteAP') }, false);
var acQuarto1AP = document.getElementById('acQuarto1AP').addEventListener('click', function () { checedBox('quarto1AP') }, false);
var acQuarto2AP = document.getElementById('acQuarto2AP').addEventListener('click', function () { checedBox('quarto2AP') }, false);
var acPWR = document.getElementById('acPWR').addEventListener('click', function () { mensagem_enviada('ac', 'pwr', 'activar') }, false);
var acTempUP = document.getElementById('acTempUP').addEventListener('click', function () { mensagem_enviada('ac', 'temp_up', 'activar') }, false);
var acTempDOWN = document.getElementById('acTempDOWN').addEventListener('click', function () { mensagem_enviada('ac', 'temp_down', 'activar') }, false);
var acMODE = document.getElementById('acMODE').addEventListener('click', function () { mensagem_enviada('ac', 'mode', 'activar') }, false);
var acFAN = document.getElementById('acFAN').addEventListener('click', function () { mensagem_enviada('ac', 'fan', 'activar') }, false);
//Query DOM - MULTIMEDIA
var mmTVAP = document.getElementById('mmTVAP').addEventListener('click', function() { checedBoxMM('tvAP')});
var mmDecoderAP = document.getElementById('mmDecoderAP').addEventListener('click', function () { checedBoxMM('decoderAP') });
var mmDVD = document.getElementById('mmDVD').addEventListener('click', function () { checedBoxMM('dvdAP') });
var mmPWR = document.getElementById('mmPWR').addEventListener('click', function () { mensagem_enviada('remote', 'pwr', 'activar') }, false);
var mmSRC = document.getElementById('mmSRC').addEventListener('click', function () { mensagem_enviada('remote', 'src', 'activar') }, false);
var mmVolUP = document.getElementById('mmVolUP').addEventListener('click', function () { mensagem_enviada('remote', 'vol_up', 'activar') }, false);
var mmVolDOWN = document.getElementById('mmVolDOWN').addEventListener('click', function () { mensagem_enviada('remote', 'vol_down', 'activar') }, false);
var mmUP = document.getElementById('mmUP').addEventListener('click', function () { mensagem_enviada('remote', 'vol_down', 'activar') }, false);
var mmRIGHT = document.getElementById('mmRIGHT').addEventListener('click', function () { mensagem_enviada('remote', 'right', 'activar') }, false);
var mmDOWN = document.getElementById('mmDOWN').addEventListener('click', function () { mensagem_enviada('remote', 'down', 'activar') }, false);
var mmLEFT = document.getElementById('mmLEFT').addEventListener('click', function () { mensagem_enviada('remote', 'left', 'activar') }, false);
var mmCENTER = document.getElementById('mmCENTER').addEventListener('click', function () { mensagem_enviada('remote', 'center', 'activar') }, false);
var mmMUTE = document.getElementById('mmMUTE').addEventListener('click', function () { mensagem_enviada('remote', 'mute', 'activar') }, false);
var mmBACK = document.getElementById('mmBACK').addEventListener('click', function () { mensagem_enviada('remote', 'back', 'activar') }, false);
var mm1 = document.getElementById('mm1').addEventListener('click', function () { mensagem_enviada('remote', '1', 'activar') }, false);
var mm2 = document.getElementById('mm2').addEventListener('click', function () { mensagem_enviada('remote', '2', 'activar') }, false);
var mm3 = document.getElementById('mm3').addEventListener('click', function () { mensagem_enviada('remote', '3', 'activar') }, false);
var mm4 = document.getElementById('mm4').addEventListener('click', function () { mensagem_enviada('remote', '4', 'activar') }, false);
var mm5 = document.getElementById('mm5').addEventListener('click', function () { mensagem_enviada('remote', '5', 'activar') }, false);
var mm6 = document.getElementById('mm6').addEventListener('click', function () { mensagem_enviada('remote', '6', 'activar') }, false);
var mm7 = document.getElementById('mm7').addEventListener('click', function () { mensagem_enviada('remote', '7', 'activar') }, false);
var mm8 = document.getElementById('mm8').addEventListener('click', function () { mensagem_enviada('remote', '8', 'activar') }, false);
var mm9 = document.getElementById('mm9').addEventListener('click', function () { mensagem_enviada('remote', '9', 'activar') }, false);
var mm0 = document.getElementById('mm0').addEventListener('click', function () { mensagem_enviada('remote', '0', 'activar') }, false);

var mpTitulo = document.getElementById('mpTitulo');
var mpAutor = document.getElementById('mpAutor');
var mpAlbum = document.getElementById('mpAlbum');
var mpPlay = document.getElementById('mpPlay').addEventListener('click', function () { 
    
    Tocando()


}, false);
var mpBack = document.getElementById('mpBack');
var mpForword = document.getElementById('mpForword');
var mpBack = document.getElementById('mpBack');
var mpForword = document.getElementById('mpForword');
var mpTimerB = document.getElementById('mpTimerB');
var mpTimerE = document.getElementById('mpTimerE');
var cam1 = document.getElementById('cam1');
var cam2 = document.getElementById('cam2');
var cam3 = document.getElementById('cam3');
var cam4 = document.getElementById('cam4');
var cam5 = document.getElementById('cam5');
var cam6 = document.getElementById('cam6');

//Query DOM
var menumultimedia = document.getElementById('menumultimedia');
var _audio_ = new Audio();
_audio_.loop = true;


/*
var tictoc = setInterval(upadateautomatico, 3000);

function upadateautomatico(){
    console.log('Helo');
}
*/
menumultimedia.addEventListener('click', function () {
    msg_srv.pesquisa[0] = '';
    enviar('pesquisa', msg_srv);
});

//retroceder uma pasta
function retrocederPesquisa(caminho){
    let path = caminho.split('/');
    path = path.filter(x => x != ''); 
    path.pop();
    return path.join('/');
}

//music manipulation
function listarmusica(lista){

    const chk = function (v) {
        let a = v.split('.');
        return a[a.length - 1].toLowerCase() == 'mp3' ? true : false;
    }

    // Ordenando as pastas por cima e os ficheiros por baixo
    let aux = [];
    lista = lista.filter(x => {
        let b = !chk(x);
        
        // Validações
        if (x.includes("AlbumArt_{") || 
            x.includes("AlbumArtSmall") ||
            x.includes("Folder.jpg") ||
            x.includes("desktop.ini")) 
                return false;
        
        if(b) return true;
        aux.push(x);
    });
    // Adicionado os ficheiros
    lista.push.apply(lista, aux);

    let cnt = document.getElementsByClassName('music_list')[0];

    cnt.innerHTML = '';
    cnt.innerHTML += `<li id="retrocedeDir"> <img src="img/folder_out.ico" id="" width="30px" height="30px">..${_caminho_.substr(_caminho_.length - 50, _caminho_.length)}\</li>`;

    for (const v of lista) {
        let e = v.substr(0, 28);
        if(chk(v))
            cnt.innerHTML += `<li class="_click_" full="${v}"> <img  src="img/document_music.ico" alt="" srcset="" width="30px" height="30px"  >${e}</li>`;
        else
            cnt.innerHTML += `<li class="_click_" full="${v}"> <img class="_click_" src="img/folder.ico" alt="" srcset="" width="30px" height="30px" >${e}</li>`;
    }
    
    // retrocendendo
    document.getElementById('retrocedeDir').addEventListener('click', function (e) {
        msg_srv.pesquisa[0] = _caminho_ = retrocederPesquisa(_caminho_);
        enviar('pesquisa', msg_srv);
    });
    
    // entrando 
    let btns = document.getElementsByClassName("_click_");
    for (const b of btns) {
        b.addEventListener('click',(e) => {
            msg_srv.pesquisa[0] = _caminho_ += '/' + e.target.getAttribute('full');
            enviar('pesquisa', msg_srv);
        }, false);
    }
} 

function checedBox(dispositivoSelecionado){
    checkedAC = dispositivoSelecionado;
    //console.log(dispositivoSelecionado+ ' - ACTIVADO')
}
function checedBoxMM(dispositivoSelecionado1) {
    checkedAP = dispositivoSelecionado1;
    //console.log(dispositivoSelecionado+ ' - ACTIVADO')
}

function mensagem_enviada(tipo,codigo,mensagem){
    switch(tipo){
        case 'lampadas':  lampadas(codigo,mensagem); break;
        case 'ac': ac(codigo, mensagem) ;break;
        case 'remote': remote(codigo,mensagem); break;
        case 'musica': musica(codigo, mensagem); break;
        case 'alarm': alarm(codigo, mensagem); break;
        case 'pesquisa': pesquisa(codigo, mensagem); break;
    }
}

function lampadas(codigo_lamp,msg_lamp){
    msg_srv.lampadas[0] = codigo_lamp;
    msg_srv.lampadas[1] = msg_lamp;
    enviar('lampadas', msg_srv)
    //console.log(msg_srv.lampadas);
}
function ac(codigo_ac, msg_ac) {

    if (checkedAC == 'salaAP'){
        msg_srv.ac[0] = 'salaAP';
        msg_srv.ac[1] = codigo_ac;
        //console.log('AC SALA: ' + codigo_ac + ' ' + msg_ac);
    }
    else if (checkedAC == 'suiteAP'){
        msg_srv.ac[0] = 'suiteAP';
        msg_srv.ac[1] = codigo_ac;
        //console.log('AC SUITE: ' + codigo_ac + ' ' + msg_ac);
    }
    else if (checkedAC == 'quarto1AP') {
        msg_srv.ac[0] = 'quarto1AP';
        msg_srv.ac[1] = codigo_ac;        
        //console.log('AC QUARTO1: ' + codigo_ac + ' ' + msg_ac);
    }
    else if (checkedAC == 'quarto2AP') {
        msg_srv.ac[0] = 'quarto2AP';
        msg_srv.ac[1] = codigo_ac;
        //console.log('AC QUARTO2: ' + codigo_ac + ' ' + msg_ac);
    }

    enviar('ac', msg_srv);
}
function remote(codigo_remote, msg_remote) {
    if (checkedAP == 'tvAP') {
        msg_srv.remote[0] = 'tv';
        msg_srv.remote[1] = codigo_remote;
        //console.log('AC SALA: ' + codigo_ac + ' ' + msg_ac);
    }
    else if (checkedAP == 'decoderAP') {
        msg_srv.remote[0] = 'decoder';
        msg_srv.remote[1] = codigo_remote;
    }
    else if (checkedAP == 'dvdAP') {
        msg_srv.remote[0] = 'dvd';
        msg_srv.remote[1] = codigo_remote;
    }
    enviar('remote', msg_srv);
    //console.log('REMOTE: ' +codigo_remote+ ' ' + msg_remote);
}

var tictoc = setInterval(actualizarTela, 1000);

function actualizarTela(){
    online();
    actualizarDataHora();
   // actualizarTemperatura();
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function actualizarDataHora() {
    var d = new Date();
    //var mm = new Mouth();
    //var x = document.getElementById("hora");
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    var dia = addZero(d.getDate());
    var mes = d.getMonth();
    var ano = d.getFullYear();
    
    var dias = new Array(
        'Domingo', 'Segunda Feira', 'Terça Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'Sábado'
    );
    var meses = new Array(
        'janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    );

    hora.innerHTML = h + ":" + m + ":" + s;
    data.innerHTML = dia + ' ' + meses[d.getMonth()] + ' ' + ano;

    dsemana.innerHTML = dias[d.getDay()];
    //dsemana.innerHTML = meses[mm.getDay()];
    //console.log(dia+'/' + meses[d.getMonth()]+ '/'+ano);

    if(h >= 0 && h <= 7){
        imagemCeu.setAttribute('src', 'img/bom-dia.png');
        bomdia.innerHTML = 'Bom Dia'; 
       }
    if (h > 7 && h <= 11) {
        imagemCeu.setAttribute('src', 'img/boa-noite.png');
        bomdia.innerHTML = "Bom Dia";
    }
    if (h > 11 && h <= 17) {
        imagemCeu.setAttribute('src', 'img/boa-tarde.png');
        bomdia.innerHTML = "Boa Noite";
    }
    if (h >= 17 && h <= 24) {
        //console.log('NOITE...');
        imagemCeu.setAttribute('src', 'img/boa-noite.png');
        bomdia.innerHTML = "Boa Noite";
    }
}

function musica(codigo_musica, msg_musica) {
    console.log('MUSICA: ' +codigo_musica+ ' ' + msg_musica);
}
function pesquisa(codigo_pesquisa, msg_pesquisa) {
    console.log('PESQUISA: ' +codigo_pesquisa+ ' ' + msg_pesquisa);
}

//mensagem do servidor
socket.on('chat',function(data){
    //console.log(data);
    switch (data.tipo){
        case 'KEEPALIVE': console.log('KEEPALIVE'); break;
        case 'DATA': console.log('DATA'); break;
        case 'HORA': console.log('HORA'); break;
        case 'MENSAGEMDODIA': console.log('MENSAGEMDODIA'); break;
        case 'TEMPERATURA': console.log('TEMPERATURA'); break;
        case 'MUSICA': console.log('MUSICA'); break;
        case 'ALARM': console.log('ALARM'); break;
        case 'PORTAO': console.log('PORTAO'); break;
        case 'LAMPADAS': console.log('LAMPADAS'); break;
        case 'PORTAS': console.log('PORTAS'); break;
        case 'PASTAS': listarmusica(data.pastas); break;
    }
})

//Enviar para o servidor
function enviar(tipo, msg) {
    socket.emit('chat', { tipo, msg });
    //socket.send(JSON.stringify({tipo, msg}));
}

// -- Efeito de serene --//
var tictocAlarm = setInterval(alarm, 100);
var piscar = 0;
function alarm(){
    //console.log(socket.connected);
    if(alarmcheck == true){
        if(piscar == 1){
            piscar = false;
            alarm_img.setAttribute('src', '');
        }
        else if(piscar == 0){
            piscar = true;
            alarm_img.setAttribute('src', 'img/alarm.png');
            
        }
    }
}

//-- Ativar e desaticar o alarm --//
function ativarAlarm(){ 
    if(alarmcheck == true){
        alarmcheck = false;
        alarm_img.setAttribute('src', 'img/alarm.png');
        clearInterval(tictocAlarm);
        sireneAlarm('parar');
        alarm_info.innerHTML = 'DESARMADO';
        alarm_info.style.color = '#968f8f';
    }
    else if(alarmcheck == false){
        alarmcheck = true;
        sireneAlarm('tocar');
        alarm_info.innerHTML = 'ALARMANDO';
        alarm_info.style.color = 'red';
        tictocAlarm = setInterval(alarm, 200);
    } 
}

function Tocando(){
    //alert('Tocando');
    //console.log('Tocando...');
    _audio_.src = 'audio/Eu_Ja_Te_Amava.mp3';
    _audio_.play();
}

function sireneAlarm(comando) {
    if (comando == 'tocar'){
        _audio_.src = 'audio/alarm_siren_loop.mp3';
        _audio_.play();
    }
    else if(comando == 'parar'){
        _audio_.pause();
    }
}

//-- Teclado do Alarm --//
function alarmViolacao(){
    alermDownTime--;
    alarm_info.innerHTML = alermDownTime;
    playBeep()
    if (alermDownTime == 0){
        ativarAlarm();
        alarmcheck = true;
        alarm_info.innerHTML = 'ALARMANDO';
        alarm_info.style.color = 'red';
        clearInterval(AlarmTimer);
    }
    
}

function limparAlarm(){
    if ( !(alarm_info.innerHTML == 'DESARMADO' || alarm_info.innerHTML == 'ARMADO' || alarm_info.innerHTML == 'ALARMANDO')){
        codigoActual = '';
        alarm_info.innerHTML = '';
    }
    
}

function playBeep() { _beep.play() };

//-- Teclado para ativar e desativar Alarm --//
function teclado(codigo){
    codigoActual += codigo;

    if(codigoActual.length <6 ){   
        console.log(codigoActual.length);
        alarm_info.innerHTML = '';
        for (y = 0; y < codigoActual.length; y++){
            alarm_info.innerHTML += '*';
        }
    }
    else if(codigoActual.length >= 6){
            if(codigoActual == '134679') {
                if (alarmcheck == false){
                    //alarmActive = true;
                    if (alarmArmado == true){
                        alarm_info.innerHTML = 'DESARMADO';
                        alarm_info.style.color = '#968f8f';
                        alarmArmado = false;
                    }    
                    else if (alarmArmado == false){
                        alarm_info.innerHTML = 'ARMADO';
                        alarm_info.style.color = '#08bd80';
                        alarmArmado = true;
                    }
                }
                else if (alarmcheck == true){
                //console.log('CODIGO CERTO: '+codigoActual);
                    //alarmcheck = false;
                    ativarAlarm();
                    alarm_info.innerHTML = 'DESARMADO';
                    alarm_info.style.color = '#968f8f';
                }
                codigoActual = '';
            }
            else{
                console.log('CODIGO ERRADO: '+codigoActual);
                codigoActual='';
                i++;
                console.log('TENTATIVAS: '+i)
                if (i == 3) {
                    i = 0;
                    console.log('BLOQUEADO...')
                    
                    AlarmTimer = setInterval(alarmViolacao, 1000);
                }
            }
            
            
    }
    
    
}

//-- controle de carga da Bateria --//
navigator.getBattery().then(function(battery){
    updateLevelInfo();
    battery.addEventListener('levelchange', function(){
        updateLevelInfo();
    });
    function updateLevelInfo(){
        let level = battery.level * 100;
        //console.log('CARGA: '+level);
        if(level <= 10){
            console.log('CARGA: ' + level + '% A CARREGAR');
        }
        else if (level > 98){
            console.log('CARGA SUFICIENTE REMOVER O CARREGADOR...');
        }
    }
});

//-- Actualizando online --//
function online() {
    if (socket.connected == true) {

        onlineImg.setAttribute('src', 'img/Globe_on.png');
        onlineTx.innerHTML = 'Online';
        onlineTx.style.color = '#08bd80';
    }
    else if (socket.connected == false) {
        onlineImg.setAttribute('src', 'img/Globe_off.png');
        onlineTx.innerHTML = 'Offline';
        onlineTx.style.color = '#e62604';
    }

}
