const request = require('request');

const URL = process.env.INPUT_URL;

request.post({
    uri: URL,
    headers: { "Content-type": "application/json" },
    json: {
        "text": process.env.INPUT_TEXT
    }
});