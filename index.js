'use strict';

const { sendEvent } = require('./eventserver');

global.quiz = { 
    name: "eerste test Quiz",
    title: "eerste test Quiz titel",
    players : [{
        score: 0,
        fullname: 'André',
        channelName: 'andre'
    },{
        score: 9,
        fullname: 'Freek',
        channelName: 'freek'
    },{
        score: 0,
        fullname: 'Maarten',
        channelName: 'maarten'
    },{
        score: 3,
        fullname: 'Arjan',
        channelName: 'maarten'
    },{
        score: 7,
        fullname: 'Olaf',
        channelName: 'olaf'
    },{
        score: 2340,
        fullname: 'Niels',
        channelName: 'niels'
    },{
        score: 0,
        fullname: 'Daan',
        channelName: 'daan'
    },{
        score: 0,
        fullname: 'Edwin',
        channelName: 'edwin'
    }],
    currentBuzzerOrder :[4,2,0]
}


global.eventserver = require('./eventserver');
global.eventserver.startServer();

let count = 0;
setInterval(function () {
    global.eventserver.sendEvent('event keep alive' + count++)
}, 60000);


setInterval(function () {
    resetBuzzers();
}, 6000);

setInterval(function () {
    resetQuiz();
}, 12000);

setInterval(function () {
    forceReload();
}, 60000);


function resetQuiz() {
    global.quiz.currentBuzzerOrder = [];
    global.quiz.players.forEach(element => {
        element.score = 0;
    });
    const messageObject = {};
    const messagetext ='';
    let event = { type: 'resetQuiz', level: 'info', messagetext: messagetext, messageObject: global.quiz };
    global.eventserver.sendEvent(event);
    resetBuzzers();
}

function nextQuestion() {
    global.quiz.currentBuzzerOrder = [];
    const messageObject = {};
    const messagetext ='';
    let event = { type: 'nextQuestion', level: 'info', messagetext: messagetext, messageObject: messageObject };
    global.eventserver.sendEvent(event);
    resetBuzzers();
}

function resetBuzzers() {
    global.quiz.currentBuzzerOrder = [];
    const messageObject = {currentBuzzerOrder: global.quiz.currentBuzzerOrder};
    const messagetext ='';
    let event = { type: 'buzzers', level: 'info', messagetext: messagetext, messageObject: messageObject };
    global.eventserver.sendEvent(event);

}

function forceReload() {
    const messageObject = {};
    const messagetext ='';
    let event = { type: 'forceReload', level: 'info', messagetext: messagetext, messageObject: messageObject };
    global.eventserver.sendEvent(event);
}

// init the quiz

// 