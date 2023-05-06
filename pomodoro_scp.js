var minutos = document.getElementById("minutes");
var seconds = document.getElementById("seconds");

minutos.innerHTML = '25';
seconds.innerHTML = '00';

let min = 25;
let sec = 60;

function startPomodoro() {
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

    if (min < 10) {
        minutos.innerHTML = '0' + min;
    } else {
        minutos.innerHTML = min;
    }

    if (sec < 10) {
        seconds.innerHTML = '0' + sec;
    } else {
        seconds.innerHTML = sec;
    }

    if (min == 0  && sec == 0) {
        sec ++
        clearInterval(startPomodoro);
    }

}
