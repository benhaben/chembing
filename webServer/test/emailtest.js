
//good
// https://github.com/andris9/Nodemailer
// https://github.com/niftylettuce/node-email-templates

// node-email

// A simple wrapper for the sendmail command

// Installation

// First make sure Sendmail is installed.

// then either

// npm install email
// or

// git clone git://github.com/aheckmann/node-email.git
// Examples

var Email = require('path/to/email').Email
var myMsg = new Email(
{ from: "me@example.com"
, to:   "you@example.com"
, subject: "Knock knock..."
, body: "Who's there?"
})

// if callback is provided, errors will be passed into it
// else errors will be thrown
myMsg.send(function(err){ ... })
// In this example we set the global from property so that all email is sent from the same address.

var lib = require('path/to/email')
  , Email = lib.Email;

lib.from = 'someAddress@youAlwaysSendFrom.com'

// no need to set the from property, already set
var mail = new Email(
{ to: "you@example.com"
, subject: "Knock knock..."
, body: "Who's there?"
})
mail.send()
// Note that no callback was passed into send(), therefore errors will throw.

// Options

new Email(config)
// config options:

// to {array|string}
// Email address(es) to which this msg will be sent
// from {string}
// Email address from which this msg is sent. If not set defaults to the exports.from global setting.
// replyTo {string}
// Email address to which replies will be sent. If not set defaults to from
// cc {array|string}
// Email address(es) who receive a copy
// bcc {array|string}
// Email address(es) who receive a blind copy
// subject {string}
// The subject of the email
// body {string}
// The message of the email
// bodyType {string}
// Content type of body. Only valid option is 'html' (for now). Defaults to text/plain.
// altText {string}
// If bodyType is set to 'html', this will be sent as the text alternative.
// timeout {number}
// Duration in milliseconds to wait before killing the process. If not set, defaults to exports.timeout global setting.
// path {string}

// Optional path to the sendmail executable
// Global settings

// exports.timeout {number}

// Duration in milliseconds to wait before killing the process. Defaults to 3000. Used when timeout is not set on a message.
// exports.from {string}
// Email address from which messages are sent. Used when from was not set on a message.
// Injection

// Some protection against injection attacks is enabled. Use at your own risk. Or better yet, fork it and submit something better!


// https://github.com/niftylettuce/node-email-templates
