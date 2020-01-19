const _db = require('./db-imitation');
const db = new _db();

module.exports = function subscribe(app) {
    // Запрос на получение списка всех подписчиков
    app.get('/subscribe', (_, res) => {
        // Считываем данные
        var data = db.read();
        // Возвращаем список всех подписчиков
        res.send({
            'status': true,
            'data': data.subscribers || []
        });
    });

    // Запрос на добавление подписчика
    app.post('/subscribe', (req, res) => {
        // Имитируем техническую магию стороннего сервера
        // Всегда будьте на чеку!
        if (Math.floor(Math.random() * 10) % 3 === 0) {
            res.status(500).send({ 'error': 'it\'s a magic, try again!' });
            return;
        }
        // Проверка на наличие ссылки
        if (!req.body.url) {
            res.status(400).send({ 'error': 'url not found' });
            return;
        }
        // Проверка на корректность ссылки
        if (!/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(req.body.url)) {
            res.status(400).send({ 'error': 'url is not correct' });
            return;
        }
        // Считываем имеющиеся данные
        var data = db.read();
        // Проверяем, есть ли массив подписчиков
        if (!data.subscribers)
            data.subscribers = []; // Если нет, создаем
        // Проверяем, есть ли такая запись
        if (data.subscribers.indexOf(req.body.url) === -1)
            data.subscribers.push(req.body.url);
        // Сохраняем данные
        db.write(data);
        // Сообщаем, что все ок
        res.send({
            'status': true
        })
    });

}