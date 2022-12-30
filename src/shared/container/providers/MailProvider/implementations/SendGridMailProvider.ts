import { injectable } from "tsyringe";

import nodemailer , { Transporter } from "nodemailer";
import nodemailerSendgrid  from "nodemailer-sendgrid";
import handlebars from "handlebars";
import fs from "fs";

import { IMailProvider } from "../IMailProvider";

@injectable()
class SendGridMailProvider implements IMailProvider{
    private client: Transporter;

    constructor(){
        this.client = nodemailer.createTransport(
            nodemailerSendgrid({
                apiKey: process.env.SENDGRID_API_KEY
            })
        )
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
       const templateFileContent = fs.readFileSync(path).toString("utf-8");

       const templateParse = handlebars.compile(templateFileContent);

       const templateHTML = templateParse(variables);

       await this.client.sendMail({
           to,
           from: "Rentx <daniel.morais@bumlai.com.br>",
           subject,
           html: templateHTML, 
       });
    }

}

export { SendGridMailProvider };