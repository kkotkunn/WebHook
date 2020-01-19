const express = require('express');
const app = express();

const path = require('path');
const port = 3200;

const subscribe = require('./subscribe');
const sendWebhook = require('./sendWebhook');

const bodyParser = require('body-parser');

app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({    
    extended: true
}));
subscribe(app);
sendWebhook(app);

app.get('/', (_, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))