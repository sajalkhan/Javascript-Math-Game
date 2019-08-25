var score, play = false, timeremaining, action, CorrectAnswer;

init();

document.getElementById('startreset').addEventListener('click', init);

function init() {
    score = 0;
    (play == false) ? play = true : play = false;

    if (!play) {

        timeremaining = 60;
        show('timeremaining');
        hide('gameover');
        document.getElementById('time').textContent = timeremaining;
        startCountdown();
        generateQA();

        document.getElementById('scoreValue').textContent = score;
        document.getElementById('startreset').textContent = 'Reset Game';
    }
    if (play) {
        stopCountdown();
        document.getElementById('question').textContent = '';
        document.getElementById('timeremaining').style.display = 'none';
        document.getElementById('startreset').textContent = 'Start Game';
    }

}

//choose option
for (var i = 1; i <= 4; i++) {
    document.getElementById('box' + i).onclick = function () {
        if (!play) {
            if (this.innerHTML == CorrectAnswer) {
                score++;
                hide('wrong');
                show('correct');
                document.getElementById('scoreValue').textContent = score;

                setTimeout(() => {
                    hide('correct');
                }, 1000);

                generateQA();
            }
            else {
                show('wrong');
                hide('correct');

                setTimeout(() => {
                    hide('wrong');
                }, 1000);
            }
        }
    }
}

function startCountdown() {

    action = setInterval(() => {
        timeremaining -= 1;

        document.getElementById('time').textContent = timeremaining;

        if (!timeremaining) {
            stopCountdown();
            show('gameover');
            hide('timeremaining');
            document.getElementById('gamescore').textContent = score;
            document.getElementById('startreset').textContent = 'Start Game';
            play = true;
        }

    }, 1000);
}

//generate question and set button value
function generateQA() {

    var x = 1 + Math.round(12 * Math.random());
    var y = 1 + Math.round(12 * Math.random());
    CorrectAnswer = x * y;
    document.getElementById('question').textContent = x + 'x' + y;

    var correctPosition = 1 + Math.round(3 * Math.random());
    document.getElementById('box' + correctPosition).textContent = CorrectAnswer;

    for (var i = 1; i <= 4; i++) {

        var WrongAnswer;
        if (i != correctPosition) {
            WrongAnswer = ((1 + Math.round(12 * Math.random())) * (1 + Math.round(12 * Math.random())));
            if (CorrectAnswer == WrongAnswer) WrongAnswer++;
            document.getElementById('box' + i).textContent = WrongAnswer;
        }
    }
}

function stopCountdown() {
    clearInterval(action);
}

function show(id) {
    document.getElementById(id).style.display = 'block';
}

function hide(id) {
    document.getElementById(id).style.display = 'none';
}
