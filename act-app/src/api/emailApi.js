import emailjs from '@emailjs/browser';

export const sendNotifEmail = async (name,email) => {
    emailjs.send("service_58c5txy","template_1tmjxmp",{
        to_name: name,
        to_email: email,
        },
        "F9MS-ZZ1koqgBECRX");
};