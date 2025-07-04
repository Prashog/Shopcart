const userModel = require('../models/userModel')
const { generateToken } = require('../middlewares/authMiddleware')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

async function registerController(req, res) {
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: 'These fields are required'
            })
        }

        const check = await userModel.findOne({email: email});

        if(check) {
            return res.status(400).json({
                success: false,
                error: 'User already exists, Please login'
            })
        }

        const user = await userModel.create({name, email, password});

        const payload = {
            id: user.id,
            role: user.role
        }

        const token = generateToken(payload);

        res.status(200).json({
            success: true,
            response: user,
            token: token
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function loginController(req, res) {
     try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email: email})

        if(!user) {
            return res.status(401).json({
                status: false,
                error: 'incorrect email or password'
            })
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch) {
            return res.status(401).json({
                status: false,
                error: 'incorrect email or password'
            })
        }

        const payload = {
            id: user.id,
            role: user.role
        }

        const token = generateToken(payload)

        res.status(200).json({
            success: true,
            token: token
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function forgotPasswordController(req, res) {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({
                success: false,
                error: 'Email is required'
            })
        }

        const user = await userModel.findOne({email});

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        //Generating 6-digit otp
        const otp = crypto.randomInt(100000, 999999).toString();

        // set OTP expiry: 10min
        user.otp = otp;
        user.otpExpires = Date.now() + 10*60*1000 // 10minutes from now
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail', // or 'SendGrid', 'Mailtrap', etc.
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Support" <${process.env.SMTP_EMAIL}>`,
            to: user.email,
            subject: 'Your OTP for Password Reset',
            html: `<p>Your OTP is: <strong>${otp}</strong></p><p>This OTP is valid for 10 minutes.</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'OTP sent to your email address'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
};

async function verifyOtpController(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await userModel.findOne({ email });
        if (!user || !user.otp || !user.otpExpires) {
            return res.status(400).json({
                success: false,
                error: "OTP not found or expired"
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                success: false,
                error: "Invalid OTP"
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                error: "OTP expired"
            });
        }

        res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
}

async function resetPasswordViaOtpController(req, res) {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await userModel.findOne({ email });
        if (!user || !user.otp || !user.otpExpires) {
            return res.status(400).json({ success: false, error: 'OTP not found or expired' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, error: 'Invalid OTP' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ success: false, error: 'OTP expired' });
        }

        user.password = newPassword;
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
}

async function changePasswordController(req, res) {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);

        const {oldPass, newPass} = req.body;

        const isMatch = await user.comparePassword(oldPass);

        if(!isMatch) {
            return res.status(400).json({
                success: false,
                error: 'Incorrect password'
            })
        }

        user.password = newPass;
        const response = await user.save();

        if(!response) {
            return res.status(403).json({
                success: false,
                error: 'Error changing password'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    }catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

module.exports = {
    registerController,
    loginController,
    forgotPasswordController,
    changePasswordController,
    verifyOtpController,
    resetPasswordViaOtpController
}