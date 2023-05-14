/* Variáveis dos elementos HTML referentes a minutos e segundos */
var minutos = document.getElementById("minutes");
var seconds = document.getElementById("seconds");

/* Variáveis de elementos HTML para mudança de estilo via JavaScript */
const startButton = document.getElementsByClassName("startButton");
const breakButton = document.getElementsByClassName("breakButton");
const timerBox = document.getElementsByClassName("timer-box");
const topButtons = document.getElementsByClassName("top-button");
var pomodoroCountNumber = document.getElementById("pomodoroCountNumber");

minutos.innerHTML = '25';
seconds.innerHTML = '00';
pomodoroCountNumber.innerHTML = "1";

let min = 25;
let sec = 60;
var secondsCount = 1;
var pomodoroCount = 1;
var pomodoroCountAll = 1;
let intervalId;


/**
 * Troca para o modo pomodoro de 25 minutos e altera as cores dos elementos da div "timer-box".
 */
function pomodoroButton() {
    minutos.innerHTML = "25";
    seconds.innerHTML = "00";

    timerBox[0].style.background = "rgba(238, 38, 38, 0.7)";
    topButtons[0].style.background = "rgba(170, 28, 28, 0.7)";
    topButtons[1].style.background = "rgba(170, 28, 28, 0.7)";
    topButtons[2].style.background = "rgba(170, 28, 28, 0.7)";

    min = 25;
    sec = 60;

    pomodoroCountNumber.innerHTML = pomodoroCountAll;
    breakPomodoro();
}


/**
 * Troca para o modo de intervalo curto do pomodoro e altera as cores dos elementos da div "timer-box".
 */
function shortBreak() {
    minutos.innerHTML = "05";
    seconds.innerHTML = "00";

    timerBox[0].style.background = "rgba(26, 176, 63, 0.7)";
    topButtons[0].style.background = "rgba(21, 133, 58, 0.7)";
    topButtons[1].style.background = "rgba(21, 133, 58, 0.7)";
    topButtons[2].style.background = "rgba(21, 133, 58, 0.7)";

    min = 5;
    sec = 60;

    breakPomodoro();

    if (min == 5) {
        min --;
    }
}


/**
 * Troca para o modo de intervalo longo do pomodoro e altera as cores dos elementos da div "timer-box".
 */
function longBreak() {
    minutos.innerHTML = "15";
    seconds.innerHTML = "00";

    timerBox[0].style.background = "rgba(26, 174, 176, 0.7)";
    topButtons[0].style.background = "rgba(21, 78, 133, 0.7)";
    topButtons[1].style.background = "rgba(21, 78, 133, 0.7)";
    topButtons[2].style.background = "rgba(21, 78, 133, 0.7)";

    min = 15;
    sec = 60;

    breakPomodoro()
    
    if (min == 15) {
        min --;
    }
}


/**
 * Função que inicia a contagem de tempo do pomodoro, independentemente de está no modo de 25 minutos, na pausa de 5 minutos ou de 15 minutos.
 * 
 * @param {Number} min Refere-se à quantidade de minutos total, ela decresse até 0.
 * @param {number} sec Refere-se à quantidade total de segundos e decresse até 0 também.
 */
function startPomodoro() {
    /* Remove o botão "start" e colocar o botão "break" no lugar */
    startButton[0].style.display = "none";
    breakButton[0].style.display = "inline-block";
    
    /* Contagem decressente dos minutos e segundos */
    if (min == 0 && sec == 0) {
        min = 25;
        sec = 60;
    }

    if (min == 25) {
        min --;
    }

    if (sec >= 0) {
        sec --;
    }

    if (sec < 0 && min != 0) {
        min --;
        sec = 59;
    }

    /* Passagem do valor da variável min para o elemento "minutos" no HTML */
    if (min < 10) {
        minutos.innerHTML = '0' + min;
    } else {
        minutos.innerHTML = min;
    }

    /* Passagem do valor da variável sec para o elemento "seconds" no HTML */
    if (sec < 10) {
        seconds.innerHTML = '0' + sec;
    } else {
        seconds.innerHTML = sec;
    }

    /* 
    Quando a contagem regressiva de 25 minutos do Pomodoro chegar a zero, dependendo do número de pomodoros já realizados (pomodoroCount), o modo será alternado para um intervalo de 5 ou 15 minutos. Após a contagem regressiva do intervalo, o modo retornará ao Pomodoro padrão de 25 minutos.
    */
    if (secondsCount < 1500) {
        secondsCount ++;
        if ((min == 0 && sec == 0) && (secondsCount == 301 || secondsCount == 901)) {
            pomodoroButton();
            secondsCount = 1;
        }
    } else if (secondsCount == 1500 && pomodoroCount < 4) {
        secondsCount = 1;
        pomodoroCount ++;
        pomodoroCountAll ++;
        shortBreak();
    } else {
        secondsCount = 1;
        pomodoroCount = 1;
        pomodoroCountAll ++;
        longBreak();
    }

    /* Retorna aos valores padrões das variáveis "min" e "sec" para 25 e 60, respectivamente. */
    if (min == 0  && sec == 0) {

        breakPomodoro()
        min = 25;
        sec = 60;
    }
}


/**
 * Função que permite com que a contagem decressente realizada na função startPomodoro seja atualizada para o usuário na tela a cada 1 segundo.
 * 
 * @param {number} intervalId Armazena a função setInterval que retorna um ID do tipo number que pode ser utilizado posteriormente para pausar o pomodoro com a função clearInterval, além disso, também atualiza a função starPomodoro a cada 1s.
 */
function startPomodoroCount() {
    intervalId = setInterval(startPomodoro, 1000)
}


/**
 * Função que pausa a contagem do pomodoro.
 */
function breakPomodoro() {
    setTimeout(() => {
        clearInterval(intervalId);
    }, 0);

    /* Esconde o botão "break" e mostra o botão "start" em seu lugar */
    startButton[0].style.display = "inline-block";
    breakButton[0].style.display = "none";
}
