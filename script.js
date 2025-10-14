let expresionActual = '';
let resultado = '0';

function actualizarPantalla() {
    document.getElementById('expresion').textContent = expresionActual;
    document.getElementById('resultado').textContent = resultado;
}

function agregarCaracter(caracter) {
    const ultimoCaracter = expresionActual[expresionActual.length - 1];
    const operadores = ['+', '-', '*', '/'];

    if (operadores.includes(caracter) && operadores.includes(ultimoCaracter)) {
        expresionActual = expresionActual.slice(0, -1) + caracter;
    }
    else if (caracter === '.') {
        const ultimoNumero = expresionActual.split(/[\+\-\*\/]/).pop();
        if (!ultimoNumero.includes('.')) {
            expresionActual += caracter;
        }
    } else {
        expresionActual += caracter;
    }

    resultado = expresionActual || '0';
    actualizarPantalla();
}

function limpiar() {
    expresionActual = '';
    resultado = '0';
    actualizarPantalla();
}

function borrar() {
    expresionActual = expresionActual.slice(0, -1);
    resultado = expresionActual || '0';
    actualizarPantalla();
}

function calcular() {
    if (!expresionActual) return;

    try {
        let expresion = expresionActual.replace(/×/g, '*');
        const ultimoCaracter = expresion[expresion.length - 1];
        if (['+', '-', '*', '/'].includes(ultimoCaracter)) {
            expresion = expresion.slice(0, -1);
        }

        let resultadoCalculado = evaluarExpresion(expresion);
        resultadoCalculado = Math.round(resultadoCalculado * 10000000000) / 10000000000;

        resultado = resultadoCalculado.toString();
        expresionActual = resultado;
        actualizarPantalla();
    } catch (error) {
        resultado = 'Error';
        actualizarPantalla();
    }
}

function evaluarExpresion(expresion) {
    return Function('"use strict"; return (' + expresion + ')')();
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') agregarCaracter(key);
    else if (key === '+' || key === '-' || key === '*' || key === '/') agregarCaracter(key);
    else if (key === '.') agregarCaracter(key);
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calcular();
    }
    else if (key === 'Escape') limpiar();
    else if (key === 'Backspace') borrar();
});

actualizarPantalla();
