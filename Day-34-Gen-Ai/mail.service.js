
const nodemailer =  require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD,

    },

});

async function sendEmail({ to, subject, html, text }) {
    try {
        const info = await transporter.sendMail({
            from: process.env.GOOGLE_USER,
            to,
            subject,
            text,
            html,
        });

        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error:", error)
    }
    return 'email send successfully, to' + to
}

module.exports = { sendEmail }