const request = require('request');
const URL = process.env.INPUT_URL;

const text = process.env.INPUT_TEXT;
const headerTitle = process.env.INPUT_HEADER_TITLE;
const headerSubtitle = process.env.INPUT_HEADER_SUBTITLE;
const headerImage = process.env.INPUT_HEADER_IMAGE;

const buttonFirst = process.env.INPUT_BUTTON_FIRST;
const buttonSecond = process.env.INPUT_BUTTON_SECOND;

var card = {};

if (headerTitle || headerSubtitle || headerImage) {
    card["header"] = {
        "title": headerTitle,
        "subtitle": headerSubtitle,
        "imageUrl": headerImage,
    }
}

const buttonFirstMatch = buttonFirst.match(/^\[(.+)\]\((.*)\)$/);
if (buttonFirstMatch) {
    card["sections"] = [
        {
            "widgets": [
                {
                    "buttons": [
                        {
                            "textButton": {
                                "text": buttonFirstMatch[1],
                                "onClick": {
                                    "openLink": {
                                        "url": buttonFirstMatch[2]
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

const buttonSecondMatch = buttonSecond.match(/^\[(.+)\]\((.*)\)$/);
if (buttonSecondMatch) {
    card["sections"][0]["widgets"][0]["buttons"][1] = {
        "textButton": {
            "text": buttonSecondMatch[1],
            "onClick": {
                "openLink": {
                    "url": buttonSecondMatch[2]
                }
            }
        }
    }
}

request.post({
    uri: URL,
    headers: { "Content-type": "application/json" },
    json: {
        "text": text,
        "cards": [card]
    }
}, (err, res, data) => {
    console.log(err, res, data);
});