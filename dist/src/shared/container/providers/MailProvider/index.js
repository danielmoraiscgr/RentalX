"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const EtherealMailPovider_1 = require("./implementations/EtherealMailPovider");
const SendGridMailProvider_1 = require("./implementations/SendGridMailProvider");
const SESMailProvider_1 = require("./implementations/SESMailProvider");
const mailProvider = {
    ethereal: tsyringe_1.container.resolve(EtherealMailPovider_1.EtherealMailProvider),
    ses: tsyringe_1.container.resolve(SESMailProvider_1.SESMailProvider),
    sendgrid: tsyringe_1.container.resolve(SendGridMailProvider_1.SendGridMailProvider)
};
tsyringe_1.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);
