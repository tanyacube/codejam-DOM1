function renderKeyboard() {
    var body = document.body;

    var input = document.createElement('textarea');
    input.className = 'input';
    body.appendChild(input);

    var keyboard = document.createElement('div');
    keyboard.className = 'keyboard';
    body.appendChild(keyboard);

    for (var i = 0; i < keyboardConfig.length; i++) {
        var row = document.createElement('div');
        row.className = 'row';

        for (var j = 0; j < keyboardConfig[i].length; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerText = keyboardConfig[i][j].en.main;
            cell.style.width = keyboardConfig[i][j].width + 'px';
            row.appendChild(cell);
        }

        keyboard.appendChild(row);
    }
}

renderKeyboard();