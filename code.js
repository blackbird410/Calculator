let SCREEN_SIZE = 9;
let currentOperation = '';
let newOperation = true;
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
        case 'x':
            multiply();
            break;
        case '/':
            divide();
            break;
        case '%':
            result  = result % Number(removeDots(screen.value));
            break;
        case '+/-':
            negative();
        case '=':
            equal();
        default:
            display('0');
            break;

    }
}

function add()
{
    result += Number(removeDots(screen.value));
    currentOperation = '+';
    screen.value = "0";
}

function substract()
{   
    result = (currentOperation) ? result - Number(removeDots(screen.value)) : Number(removeDots(screen.value));
    currentOperation = '-';
    screen.value = "0";
}

function multiply() 
{
    result = (currentOperation) ? result * Number(removeDots(screen.value)) : Number(removeDots(screen.value));
    currentOperation = 'x';
    screen.value = "0";
}

function divide()
{
    if (Number(removeDots(screen.value)))
    {
        result = (currentOperation) ? result / Number(removeDots(screen.value)) : Number(removeDots(screen.value));
        currentOperation = '/';
        screen.value = "0";
    }
    else
        result = 'Math Error';
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
            case '/':
            case 'x':
            case '-':
            case '+':
                btn.addEventListener('click', () => {
                    result = Number(removeDots(screen.value));
                    currentOperation = btnText;
                    screen.value = '0' 
                });
                break;
            case '=':
                btn.addEventListener('click', () => {
                    doOperation(currentOperation);
                    screen.value = (typeof(Number(result)) == 'number') ? 
                                    formatNumber(result).slice(0, SCREEN_SIZE) : 
                                    result;
                    result = 0;
                    currentOperation = '';
                    newOperation = true;
                    document.querySelector('#clearBtn').textContent = 'AC';
                });
                break;
            default:
                btn.addEventListener('click', () => {
                    if (newOperation)
                        screen.value = '0';
                    if (screen.value.length < SCREEN_SIZE && (btnText != '.' || !isAlreadyFloat()))
                        screen.value = (screen.value == '0') ? btnText : screen.value + btnText;
                    document.querySelector('#clearBtn').textContent = 'C';
                    newOperation = false;
                });
                break;
        }

        container.appendChild(btn);
    });
}

function isAlreadyFloat()
{
    let number = removeDots(screen.value);
    let count = 0;
    let i = 0;
    for (i = 0; i < number.length; i++)
        if (number[i] == '.')
            count++;
    return count == 1;
}

function formatNumber(n)
{
    let integerPart = (Math.floor(Number(n)).toString());
    let i = integerPart.length;
    if (i > 3)
    {
        let decimalPart = Math.abs(Number(n) - Number(integerPart)).toString();
        n = "";
        i--;
        let c = 0;
        while(i >= 0)
        {
            n = (c == 3) ? integerPart[i] + ',' + n : integerPart[i] + n;
            i--;
            c = (c + 1) % 4;
        }
        return (Number(decimalPart)) ? n + decimalPart : n;
    }

    return n.toString();
}

function removeDots(n)
{
    let r = '';
    n.split(',').forEach(p => r += p);
    return r;
}