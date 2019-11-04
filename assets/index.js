var body = document.body;
var currentLang = localStorage.currentLang || 'en';
var input = undefined;
var shiftEnabled = false;
var capsEnabled = false;
var shiftLocation = 0;
var shiftBtn = undefined;


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
            if (cellConfig.className) {
                cell.className = cellConfig.className;
            }
            cell.className = 'cell';
            cell.innerText = cellConfig[lang].secondary;
            cell.style.width = cellConfig.width + 'px';
            cell.style.fontSize = cellConfig.font + 'px';
            cell.onclick = (function (cellConfig) {
                return function (e) {
                    switch (cellConfig.code) {
                        case 32:
                            input.innerHTML += ' ';
                            break;
                        case 9:
                            input.innerHTML += '\t';
                            break;
                        case 13:
                                input.innerHTML += '\n';
                            break;
                        case 8:
                            input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
                            break;
                        case 20:
                            if(!capsEnabled){
                                e.target.classList.add('active');
                                capsEnabled = true;
                            } else {
                                e.target.classList.remove('active');
                                capsEnabled = false;
                            }
                            break;
                        case 16:
                            if (shiftEnabled) {
                                if (cellConfig.location === shiftLocation) {
                                    e.target.classList.remove('active');
                                    shiftEnabled = false;
                                } else {
                                    shiftBtn.classList.remove('active');
                                    e.target.classList.add('active');
                                    shiftBtn = e.target;
                                }
                            } else {
                                e.target.classList.add('active');
                                shiftBtn = e.target;
                                shiftEnabled = true;
                            }

                            shiftLocation = cellConfig.location;
                            break;
                        default:
                            if (shiftEnabled) {
                                input.innerHTML += cellConfig[lang].secondary;
                                shiftEnabled = false;
                                shiftBtn.classList.remove('active');
                            } else if (capsEnabled) {
                                input.innerHTML += cellConfig[lang].secondary;
                            } else {
                                input.innerHTML += cellConfig[lang].main;
                            }
                    }
                }
            })(cellConfig);

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
        } else if (currentLang == 'ru'){
            currentLang = 'en';
        }
        localStorage.currentLang = currentLang;

        renderKeyboard(currentLang);
    }
};

document.onkeyup = function (e) {
    if (e.keyCode == 91) {
        cmdDown = false;
    }
};