import nodemailer from 'nodemailer';

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'mansoorihassan409@gmail.com',
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const mailOptions = {
            from: 'mansoorihassan409@gmail.com',
            to: email,
            subject: subject,
            text: text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent:', info.response);
        return info;

    } catch (error) {
        console.error('❌ Email error:', error);
        throw error;
    }
}

