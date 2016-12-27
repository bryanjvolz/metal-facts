'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en-GB": {
        "translation": {
            "FACTS": [
                "Ozzy has done more drugs than every generation of your family combined",
                "Motorhead's drummer has had an orange-sized lump on his neck ",
                "The first edition of 'Metal Massacre' misspelled Metallica's name with two Ts",
                "While serving time for petty theft as a teen, Ozzy used a piece of graphite to write O-Z-Z-Y across his knuckles",
                "On the cover of Iron Maiden's Powerslave, artitst Derek Riggs hid a number of easter eggs including 'Indiana Jones was here'.",
                "Kerry King had a stint as a breeder of show dogs",
                "Before Metallica, Cliff Burton was in a band with Faith No More members Jim Martin and Mike Bordin",
                "No one likes Dave Mustaine",
                "After being fired from Cannibal Corpse, Bob Rusay became a golfing instructor",
                "Michael Starr from Steel Panther has a PhD in English"
            ],
            "SKILL_NAME" : "Metal Facts",
            "GET_FACT_MESSAGE" : "Here's your bloody fact: ",
            "HELP_MESSAGE" : "You can say tell me a metal fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "Ok geezer, what can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    },
    "en-US": {
        "translation": {
            "FACTS": [
                "Ozzy has done more drugs than every generation of your family combined",
                "Motorhead's drummer has had an orange-sized lump on his neck ",
                "The first edition of 'Metal Massacre' misspelled Metallica's name with two Ts",
                "While serving time for petty theft as a teen, Ozzy used a piece of graphite to write O-Z-Z-Y across his knuckles",
                "On the cover of Iron Maiden's Powerslave, artitst Derek Riggs hid a number of easter eggs including 'Indiana Jones was here'.",
                "Kerry King had a stint as a breeder of show dogs",
                "Before Metallica, Cliff Burton was in a band with Faith No More members Jim Martin and Mike Bordin",
                "No one likes Dave Mustaine",
                "After being fired from Cannibal Corpse, Bob Rusay became a golfing instructor",
                "Michael Starr from Steel Panther has a PhD in English"
            ],
            "SKILL_NAME" : "Metal Facts",
            "GET_FACT_MESSAGE" : "Here's your fact: ",
            "HELP_MESSAGE" : "You can say tell me a metal fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "Arrrrrgh, what can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
    },
    "de-DE": {
        "translation": {
            "FACTS": [
                "",
                "",
            ],
            "SKILL_NAME" : "Weltraumwissen auf Deutsch",
            "GET_FACT_MESSAGE" : "Hier sind deine Fakten: ",
            "HELP_MESSAGE" : "Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?",
            "HELP_REPROMPT" : "Wie kann ich dir helfen?",
            "STOP_MESSAGE" : "Auf Wiedersehen!"
        }
    }
};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random metal fact from the metal facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Create speech output
        var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};