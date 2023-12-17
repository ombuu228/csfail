const inputValues = Array(10).fill('');
const colorProbabilities = [
    { color: 'red', probability: 46.6 },
    { color: 'black', probability: 46.6 },
    { color: 'green', probability: 6.8 }
];
const history = [];
const inputIds = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6', 'input7', 'input8', 'input9', 'input10'];

const colorMapping = {
    'r': 'red',
    'b': 'black',
    'g': 'green'
};

function updateProbabilities() {
    const newInputValues = [...inputValues];

    for (let i = 0; i < inputIds.length - 1; i++) {
        newInputValues[i + 1] = inputValues[i];
    }

    const lastColor = history.length > 0 ? history[history.length - 1] : '';
    newInputValues[0] = lastColor;
    inputValues.splice(0, inputValues.length, ...newInputValues);
}

function calculateColor() {
    updateProbabilities();

    const totalProbability = colorProbabilities.reduce((sum, color) => sum + color.probability, 0);
    const randomValue = Math.random() * totalProbability;

    let cumulativeProbability = 0;
    let selectedColor = '';

    for (const color of colorProbabilities) {
        cumulativeProbability += color.probability;

        if (randomValue <= cumulativeProbability) {
            selectedColor = color.color;
            break;
        }
    }

    history.push(selectedColor);
    displayColor(selectedColor);
    displayHistory();
}

function displayColor(color) {
    const outputElement = document.getElementById('output');
    outputElement.textContent = `Next color: ${color}`;
    outputElement.style.color = color;
}

function displayHistory() {
    const historyElement = document.getElementById('history');
    historyElement.textContent = 'History: ';

    for (let i = history.length - 1; i >= 0; i--) {
        const colorSpan = document.createElement('span');
        colorSpan.textContent = history[i];
        colorSpan.style.color = history[i];

        if (history[i] === 'black') {
            colorSpan.style.fontWeight = 'bold';
        }

        historyElement.appendChild(colorSpan);

        if (i > 0) {
            const commaSpan = document.createElement('span');
            commaSpan.textContent = ', ';
            historyElement.appendChild(commaSpan);
        }
    }
}