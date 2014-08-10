var nodemailer = require('nodemailer');
var conf = require('./dev/conf');
var extend = require('extend');

function _submitNewLink(req, res) {

    console.log(["configuring mail", conf.mail]);
    var transport = nodemailer.createTransport(conf.mail.transport, conf.mail.opts);

    var mailOptions = extend({
        html: "New Suggestion has arrived : " + JSON.stringify(req.body.suggestion)
    }, conf.mails.linkSuggestion);

    console.log(["submitting new suggestion", req.body.suggestion, mailOptions]);

    // send mail with defined transport object
    transport.sendMail(mailOptions, function (error, result) {
        if (error) {
            console.log(error);
            res.send("feedbackError");
        } else {
            console.log("Message sent: " + result.message);
            res.send("feedbackSent");
        }
    });


}


exports.submitNewLink = _submitNewLink;