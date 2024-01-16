let SCREEN_SIZE = 9;
let currentOperation = '';
let result = 0;
buildInterface();
const screen = document.querySelector('#display');
addButtons();

function doOperation(operationSign) 
{
    switch(operationSign)
    {
        case '+':
            add();
            break;
        case '-':
            substract();
            break;
        case '*':
            multiply();
            break;
        case '/':
            divide();
            break;
        case '%':
            result  = result % Number(screen.value);
            break;
        case '+/-':
            negative();
        case '=':
            equal();
        default:
            display('ERROR');
            break;

    }
}

function add()
{
    result += Number(screen.value);
    currentOperation = '+';
    resetDisplay();
}

function substract()
{   
    result = (currentOperation) ? result - Number(screen.value) : Number(screen.value);
    currentOperation = '-';
    resetDisplay();
}

function multiply() 
{
    result = (currentOperation) ? result * Number(screen.value) : Number(screen.value);
    currentOperation = '*';
    resetDisplay();
}

function divide()
{
    if (Number(screen.value))
    {
        result = (currentOperation) ? result * Number(screen.value) : Number(screen.value);
        currentOperation = '*';
        resetDisplay();
    }
    else
        display('MATH ERROR');
}

function resetDisplay()
{
    screen.value = "0";
}

function display(number)
{
    screen.value = number;
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
    display.setAttribute('value', '0');
    display.setAttribute('readonly', 'true');
    resultContainer.appendChild(display);
    
    const link = document.createElement('a');
    link.setAttribute('href', 'https://blackbird410.github.io/');
    link.setAttribute('target', '_blank');
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
        else if (btnText == 'AC')
            btn.setAttribute('id', 'clearBtn');

        if (btnText == 'AC' || btnText == '+/-' || btnText == '%')
            btn.classList.add('gray');
        else if (btnText == '/' || btnText == 'x' || btnText == '-' || btnText == '+' || btnText == '=')
            btn.classList.add('orange');
        else
            btn.classList.add('darkGray');

        switch(btnText)
        {
            case 'AC':
                btn.addEventListener('click', () => {
                    result = 0;
                    screen.value = '0';
                });
                break;
            case '+/-':
                btn.addEventListener('click', () => {
                    if (screen.value != '0' && screen.value[0] != '-')
                        screen.value = '-' + screen.value;
                    else if (screen.value[0] == '-')
                        screen.value = screen.value.slice(1);
                });
                break;
            case '%':
                btn.addEventListener('click', () => {
                    result = Number(screen.value);
                    currentOperation = '%';
                    screen.value = '0';
                });
                break;
            case '/':
                btn.addEventListener('click', () => {
                    
                });
                break;
            case 'x':
                btn.addEventListener('click', () => {
                    
                });
                break;
            case '-':
                btn.addEventListener('click', () => {
                    
                });
                break;
            case '+':
                btn.addEventListener('click', () => {
                    
                });
                break;
            case '=':
                btn.addEventListener('click', () => {
                    doOperation(currentOperation);
                    screen.value = result;
                    document.querySelector('#clearBtn').textContent = 'AC';
                });
                break;
            default:
                btn.addEventListener('click', () => {
                    if (screen.value.length < SCREEN_SIZE && (btnText != '.' || !isAlreadyFloat()))
                        screen.value = (screen.value == '0') ? btnText : screen.value + btnText;
                    document.querySelector('#clearBtn').textContent = 'C';
                });
                break;
        }

        container.appendChild(btn);
    });
}

function isAlreadyFloat()
{
    let number = screen.value;
    let count = 0;
    let i = 0;
    for (i = 0; i < number.length; i++)
        if (number[i] == '.')
            count++;
    return count == 1;
}