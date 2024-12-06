const sendEmail = require('../Config/sendEmail');

module.exports.authorityConfirm = async (req, res) => {
    const { email, subject, message } = req.body;
    try {
        await sendEmail(email, subject, message);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email' });
    }
}