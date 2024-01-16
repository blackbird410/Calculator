buildInterface();
addButtons();
let SCREEN_SIZE = 10;
let buffer = "";
display();


function display()
{
    const screen = document.querySelector('#display');
    let text = screen.value;
    if (text.length > SCREEN_SIZE)
    {
        buffer = text.slice(0, text.length - SCREEN_SIZE);
        screen.value = text.slice(text.length - SCREEN_SIZE); 
    }
}

function buildInterface()
{
    const body = document.body;
    const container = document.createElement('div');
    const resultContainer = document.createElement('div');
    const buttonContainer = document.createElement('div');
    const footer = document.createElement('div');
    const display = document.createElement('input');

    body.classList.add('container');
    container.classList.add('container', 'main');
    resultContainer.classList.add('container', 'result');
    buttonContainer.classList.add('container', 'buttons');
    footer.classList.add('container', 'footer');

    display.setAttribute('id', 'display');
    display.setAttribute('name', 'display');
    display.setAttribute('value', '');
    display.setAttribute('readonly', 'true');
    resultContainer.appendChild(display);
    
    const link = document.createElement('a');
    link.setAttribute('href', 'https://blackbird410.github.io/');
    link.textContent = "Copyright \u00A9 Neil Taison Rigaud";
    footer.appendChild(link)

    container.appendChild(resultContainer);
    container.appendChild(buttonContainer);
    body.append(container);
    body.append(footer);
}

function addButtons()
{
    const container = document.querySelector('.buttons');
    const buttons = ['AC', '+/-', '%', '/', '7', '8', '9', 'x', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='];
    buttons.forEach(btnText => {
        const btn = document.createElement('div');
        btn.textContent = btnText;
        btn.classList.add('button', 'container');

        if (btnText == '0')
            btn.setAttribute('id', 'zero');

        if (btnText == 'AC' || btnText == '+/-' || btnText == '%')
            btn.classList.add('gray');
        else if (btnText == '/' || btnText == 'x' || btnText == '-' || btnText == '+' || btnText == '=')
            btn.classList.add('orange');
        else
            btn.classList.add('darkGray');

        container.appendChild(btn);
    });

}