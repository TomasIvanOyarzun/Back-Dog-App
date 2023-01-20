import { transport } from "./nodeMailer"

interface dataEmail {
    name : string,
    email : string,
    token : string | null
}
export const emailRegister = async (datos : dataEmail) =>{
        
    const {name, email , token } = datos
   
     await transport.sendMail({
    from : `"Dog - dog breeds "`,
    to: email,
    subject : "Comprueba tu cuenta",
    text : "Comprueba tu cuenta en Dog App",
    html : `<p>Hi ${name}, please check your Dog app account.</p>
    <p>Your account is ready, you just have to check it in the following link</p>
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">check account</a>
        <p>If you did not create this account, you can ignore this email</p>`
    })
}