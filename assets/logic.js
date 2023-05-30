console.log("Hai guys David di sini!");

let banyak = false;
//let result = 0;
let boleh = false;

const calculator = {
    displayNumber: document.querySelector("#displayNumber").innerText,
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
};

function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function updateDisplayOperator() {
    document.querySelector("#displayOperator").innerText = calculator.operator;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    document.querySelector("#displayOperator").innerHTML = '<br>';
    //banyak = 0;
}

function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function (event) {

        // mendapatkan objek elemen yang diklik
        const target = event.target;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains('equals')) {
            calculate();
            updateDisplay();
            document.querySelector("#displayOperator").innerHTML = '<br>';
            //clearCalculator();
            //alert("Success");
            calculator.operator = null;
            return;
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}

function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        //calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
        //updateDisplayOperator();
        //banyak = true;
        banyak++;
        //alert("Halo");
        console.log("First operator");
    } else if (banyak >= 1) {
        calculate();
        updateDisplay();
        calculator.firstNumber = document.querySelector("#displayNumber").innerText;
        calculator.displayNumber = '0';
        banyak++;
        console.log("banyak mode");
    } else {
        updateDisplay();
        calculator.firstNumber = document.querySelector("#displayNumber").innerText;
        calculator.displayNumber = '0';
        console.log("mode lanjut");
    }

    calculator.operator = operator;
    updateDisplayOperator();
}

function calculate() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert("Input belum lengkap");
        return;
    }

    let hasil = 0;
    if (calculator.operator === "+") {
        hasil = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        hasil = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }

    //calculator.displayNumber = result;
    //calculator.waitingForSecondNumber = false;
    //banyak = false;
    banyak = 0;

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: hasil
    }
	
	putHistory(history);
    calculator.displayNumber = hasil;
	renderHistory();
}