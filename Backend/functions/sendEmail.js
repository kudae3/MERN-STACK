import nodemailer from 'nodemailer';
import ejs from 'ejs';

const sendEmail = async({view, data, from, to, subject})  => {
    try {
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "60e7e653a90fba",
            pass: "dff22aa9d32b79"
            }
        });

        let html =  await ejs.renderFile(`./views/${view}.ejs`, data);
        await transport.sendMail({
            from, 
            to, 
            subject, 
            html, 
        });
    } catch (e) {
        throw new Error(e);
    }
}

export default sendEmail;