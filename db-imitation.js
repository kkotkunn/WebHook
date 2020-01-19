const fs = require('fs');
const path = require('path');

module.exports = class db {
    constructor() { }

    read() {
        var data = fs.readFileSync(path.join(__dirname + '/db-imitation.txt')).toString('utf8');
        var model = data;
        try {
            model = JSON.parse(data);
        } catch {
            model = {};
        }
        return model;
    }
    write(obj) {
        var text = JSON.stringify(obj);
        fs.writeFileSync(path.join(__dirname + '/db-imitation.txt'), text);
    }
};