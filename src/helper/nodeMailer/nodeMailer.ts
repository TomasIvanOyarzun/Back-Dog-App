import nodemailer from 'nodemailer'


    export const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure : true,
        auth : {
            user : 'xilent312@gmail.com',
            pass : process.env.PASS_APLICATION
        },
    })
