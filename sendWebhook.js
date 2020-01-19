const WebSocket = require('ws'); 
const _db = require('./db-imitation'); 
const db = new _db(); 
var ws = new WebSocket('ws://localhost:3000'); 
function setStatus(value) { 
console.log(value) 
}


module.exports = function sendWebhook (app) { 
    // Обработчик формы 
    app.post('/sendWebhook', (req, res) => { 
    // Получаем всех подписчиков 
    var subscribers = db.read().subscribers; 
    // Отправляем каждому подписчику событие 
    subscribers.forEach(subscriber => { 
    var request = require('sync-request'); 
    console.log(subscriber); 
    if (subscriber.toString()=="ws://localhost:3000"){ 
    //subscriber = new WebSocket('ws://localhost:3000'); 
    console.log("new"); 
    ws.onopen = () => setStatus('ONLINE'); 
    console.log("onopen"); 
    var ready = ws.readyState; 
    console.log("ready"); 
    
    var res = JSON.stringify (req.body); 
    
    ws.send(res); 
    console.log(res); 
    
    }else{ 
    
    
    var res = request('POST', subscriber, { 
    json: { 
    'webhook': req.body 
    }, 
    }); 
    console.log(`send ${subscriber}`); 
    console.log(res); 
    } 
    }); 
    // Сообщаем, что все ок 
    res.send({ 
    'status': true 
    }) 
    }); 
    }