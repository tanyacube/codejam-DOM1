var body = document.body;
var currentLang = 'en';
var input = undefined;
var shiftEnabled = false;

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
            var cellConfig = keyboardConfig[i][j];
            var cell = document.createElement('div');
            if (cellConfig.id) {
                cell.id = cellConfig.id;
            }
            cell.className = 'cell';
            cell.innerText = cellConfig[lang].main;
            cell.style.width = cellConfig.width + 'px';
            cell.onclick = (function (cellConfig) {
                return function (e) {
                    if (cellConfig.code === 8) {
                        input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
                    } else if (cellConfig.code === 16) {
                        if (shiftEnabled) {
                            e.target.classList.remove('active');
                        } else {
                            e.target.classList.add('active');
                        }

                        shiftEnabled = !shiftEnabled;
                    } else {
                        if (shiftEnabled) {
                            input.innerHTML += cellConfig[lang].secondary;
                            shiftEnabled = false;
                            document.getElementById('shift').classList.remove('active');
                        } else {
                            input.innerHTML += cellConfig[lang].main;
                        }
                    }
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