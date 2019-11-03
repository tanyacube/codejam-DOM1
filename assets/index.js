var body = document.body;
var currentLang = 'en';
var input = undefined;

function renderInput() {
    input = document.createElement('textarea');
    input.className = 'input';
    body.appendChild(input);
}

function renderKeyboard(lang) {
    var prevKeyboard = document.getElementsByClassName('keyboard');
    if (prevKeyboard.length) {
        prevKeyboard[0].remove();
    }

    var keyboard = document.createElement('div');
    keyboard.className = 'keyboard';
    body.appendChild(keyboard);

    for (var i = 0; i < keyboardConfig.length; i++) {
        var row = document.createElement('div');
        row.className = 'row';

        for (var j = 0; j < keyboardConfig[i].length; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerText = keyboardConfig[i][j][lang].main;
            cell.style.width = keyboardConfig[i][j].width + 'px';
            cell.onclick = (function (cellConfig) {
                return function () {
                    oldText = input.innerHTML;
                    input.innerHTML = oldText + cellConfig[lang].main;
                }
            })(keyboardConfig[i][j]);

            row.appendChild(cell);
        }

        keyboard.appendChild(row);
    }
}

renderInput();
renderKeyboard(currentLang);

// cmd + shift
var cmdDown = false;
document.onkeydown = function (e) {
    if (e.keyCode == 91)
        cmdDown = true;

    if (cmdDown && e.keyCode == 16) {
        if (currentLang == 'en') {
            currentLang = 'ru';
        } else {
            currentLang = 'en';
        }

        renderKeyboard(currentLang);
    }
};

document.onkeyup = function (e) {
    if (e.keyCode == 91) {
        cmdDown = false;
    }
};