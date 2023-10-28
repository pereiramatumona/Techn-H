
var princ_bt = document.getElementById('home_tag').addEventListener('click', chamar);
var ilum_bt = document.getElementById('menulamp').addEventListener('click', chamar);
var access_bt = document.getElementById('menusaccesso').addEventListener('click', chamar);
var ac_bt = document.getElementById('menusac').addEventListener('click', chamar);
var mult_bt = document.getElementById('menumultimedia').addEventListener('click', chamar);
var cam_bt = document.getElementById('menucameras').addEventListener('click', chamar);
var defin_bt = document.getElementById('menudefinocoes').addEventListener('click', chamar);

var mainmove = document.getElementById('main').addEventListener('mouseover', contagemReset );
var mainmove = document.getElementById('main').addEventListener('touch', contagemReset);

var k1 = document.getElementsByClassName('k1');




var titulo_dash = document.getElementById('titulo_dash');
var contador = 0;
var unidade = 1000;


function chamar(e) {    
    try {
        e.preventDefault();
        var elem = e.target.id;

        switch (elem) {
            case 'home_tag': 
                document.getElementsByClassName('principal_class')[0].style.display = 'block';
                document.getElementsByClassName('ilum_class')[0].style.display = 'none';
                document.getElementsByClassName('accesso_class')[0].style.display = 'none';
                document.getElementsByClassName('ac_class')[0].style.display = 'none';
                document.getElementsByClassName('multimedia_class')[0].style.display = 'none';
                document.getElementsByClassName('cameras_class')[0].style.display = 'none';
                document.getElementsByClassName('definicoes_class')[0].style.display = 'none';
                titulo_dash.textContent = 'HOME';
                break;
            case 'menulamp': 
                document.getElementsByClassName('principal_class')[0].style.display = 'none';
                document.getElementsByClassName('ilum_class')[0].style.display = 'block';
                document.getElementsByClassName('accesso_class')[0].style.display = 'none';
                document.getElementsByClassName('ac_class')[0].style.display = 'none';
                document.getElementsByClassName('multimedia_class')[0].style.display = 'none';
                document.getElementsByClassName('cameras_class')[0].style.display = 'none';
                document.getElementsByClassName('definicoes_class')[0].style.display = 'none';
                titulo_dash.textContent = 'ILUMINAÇAO'
                contadorZero = 1000;
                break;
            case 'menusaccesso': 
                document.getElementsByClassName('principal_class')[0].style.display = 'none';
                document.getElementsByClassName('ilum_class')[0].style.display = 'none';
                document.getElementsByClassName('accesso_class')[0].style.display = 'block';
                document.getElementsByClassName('ac_class')[0].style.display = 'none';
                document.getElementsByClassName('multimedia_class')[0].style.display = 'none';
                document.getElementsByClassName('cameras_class')[0].style.display = 'none';
                document.getElementsByClassName('definicoes_class')[0].style.display = 'none';
                titulo_dash.textContent = 'ACESSOS';
                break;
            case 'menusac': 
                document.getElementsByClassName('principal_class')[0].style.display = 'none';
                document.getElementsByClassName('ilum_class')[0].style.display = 'none';
                document.getElementsByClassName('accesso_class')[0].style.display = 'none';
                document.getElementsByClassName('ac_class')[0].style.display = 'block';
                document.getElementsByClassName('multimedia_class')[0].style.display = 'none';
                document.getElementsByClassName('cameras_class')[0].style.display = 'none';
                document.getElementsByClassName('definicoes_class')[0].style.display = 'none';
                titulo_dash.textContent = 'AC';
                break;
            case 'menumultimedia': 
                document.getElementsByClassName('principal_class')[0].style.display = 'none';
                document.getElementsByClassName('ilum_class')[0].style.display = 'none';
                document.getElementsByClassName('accesso_class')[0].style.display = 'none';
                document.getElementsByClassName('ac_class')[0].style.display = 'none';
                document.getElementsByClassName('multimedia_class')[0].style.display = 'block';
                document.getElementsByClassName('cameras_class')[0].style.display = 'none';
                document.getElementsByClassName('definicoes_class')[0].style.display = 'none';
                titulo_dash.textContent = 'MULTIMEDIA';
                break;
            case 'menucameras': 
                document.getElementsByClassName('principal_class')[0].style.display = 'none';
                document.getElementsByClassName('ilum_class')[0].style.display = 'none';
                document.getElementsByClassName('accesso_class')[0].style.display = 'none';
                document.getElementsByClassName('ac_class')[0].style.display = 'none';
                document.getElementsByClassName('multimedia_class')[0].style.display = 'none';
                document.getElementsByClassName('cameras_class')[0].style.display = 'block';
                document.getElementsByClassName('definicoes_class')[0].style.display = 'none';
                titulo_dash.textContent = 'CÂMERAS';
                break;
            case 'menudefinocoes': 
                document.getElementsByClassName('principal_class')[0].style.display = 'none';
                document.getElementsByClassName('ilum_class')[0].style.display = 'none';
                document.getElementsByClassName('accesso_class')[0].style.display = 'none';
                document.getElementsByClassName('ac_class')[0].style.display = 'none';
                document.getElementsByClassName('multimedia_class')[0].style.display = 'none';
                document.getElementsByClassName('cameras_class')[0].style.display = 'none';
                document.getElementsByClassName('definicoes_class')[0].style.display = 'block';
                titulo_dash.textContent = 'DEFINIÇÕES';
                break;

            default: break;
        }

    } catch (error) {
        console.log("ERRO: " + error);
    }

}

function dashBoardShow(){
    document.getElementsByClassName('principal_class')[0].style.display = 'block';
    document.getElementsByClassName('ilum_class')[0].style.display = 'none';
    document.getElementsByClassName('accesso_class')[0].style.display = 'none';
    document.getElementsByClassName('ac_class')[0].style.display = 'none';
    document.getElementsByClassName('multimedia_class')[0].style.display = 'none';
    document.getElementsByClassName('cameras_class')[0].style.display = 'none';
    document.getElementsByClassName('definicoes_class')[0].style.display = 'none';
    titulo_dash.textContent = 'HOME'
}

function contagemReset() {
    contador = 0;
}

/* Contador */
var tictoc = setInterval(upadateautomatico, unidade);
function upadateautomatico() {
    contador++
    //console.log(contador);
    if (contador == 10){
        contador = 0;
        dashBoardShow();
        console.log(contador);  
    }
}

//document.getElementById(elem).classList.add('Show-class');
//document.getElementById(elem).classList.remove("show-class");
//console.log(elem);
