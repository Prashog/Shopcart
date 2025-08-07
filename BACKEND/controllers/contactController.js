const nodemailer = require('nodemailer');

const sendContactMessageController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"ShopCart Contact" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      subject: `New Contact Message from ${name || 'Customer'}`,
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json({ success: true, message: 'Message sent successfully' });

  } catch (err) {
    console.error('Failed to send contact message:', err);
    res.status(500).json({ success: false, error: 'Failed to send message', details: err.message });
  }
};

module.exports = { sendContactMessageController };