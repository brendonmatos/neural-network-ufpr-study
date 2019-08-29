const brain = require('brain.js');
const net = new brain.NeuralNetwork();
const fs = require('fs');

function getFormattedContent(fileName) {

    const lines = fs.readFileSync(fileName).toString().split(/\r?\n/);

    return lines.map(formatLine)
}


const formatLine = line => {
    const lineContents = line.split(' ').map(i => parseFloat(i));
    const inputContents = lineContents.slice(0, -1);
    const input = {};
    for (let index = 0; index < inputContents.length; index++) {
        input[index] = inputContents[index];
    }
    const language = {
        portuguese: 0,
        english: 0,
        deusthc: 0,
        italian: 0,
        espanish: 0,
    };
    const langIndex = lineContents.slice(-1)[0];
    language[getLang(langIndex)] = 1;
    return {
        input,
        output: language
    };
};


function createNet(file) {
    const trainingContent = getFormattedContent(file)
    net.train(trainingContent);
    return net;
}

function getLang(langIndex) {
    switch (langIndex) {
        case 0: {
            return 'portuguese';
        }
        case 1: {
            return 'english';
        }
        case 2: {
            return 'deusthc';
        }
        case 3: {
            return 'italian';
        }
        case 4: {
            return 'espanish';
        }
    }
}

exports.createNet = createNet;
exports.getFormattedContent = getFormattedContent;
exports.getLang = getLang