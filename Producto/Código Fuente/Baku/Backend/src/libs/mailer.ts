import nodemailer from 'nodemailer';

export const  transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 25,
    secure: false,
    auth: {
        user: 'bakulibros@gmail.com',
        pass: 'qpdorauaotmrjvgt'
    },
    tls: {
        rejectUnauthorized: false
    }
}
);

transporter.verify().then(() => {
    console.log('Servidor listo para envio de mails');
}
).catch(err => {
    console.log('Error connecting: ', err);
}
);
