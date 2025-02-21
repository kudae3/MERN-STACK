import nodemailer from 'nodemailer';
import ejs from 'ejs';

const sendEmail = ({view, data, from, to, subject})  => {
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "60e7e653a90fba",
            pass: "dff22aa9d32b79"
            }
        });

        ejs.renderFile(`./views/${view}.ejs`, data, async(err, html) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error rendering template');
            }
            // send mail with defined transport object
            await transport.sendMail({
                from, 
                to, 
                subject, 
                html, 
            });
        });

}

export default sendEmail;