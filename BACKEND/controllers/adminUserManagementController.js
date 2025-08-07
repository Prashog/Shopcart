const userModel = require('../models/userModel');

async function getAllUsersController(req, res) {
    try {
        const users = await userModel.find().select("-password -role -wishlist -otp -otpExpires");

        if(!users) {
            return res.status(404).json({
                success: false,
                error: 'Users Not Found'
            })
        }

        res.status(200).json({
            success: false,
            response: users
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
};

async function toggleUserAccessController(req, res) {
    try {
        const userId = req.params.id;
        const user = await userModel.findById(userId);

        if(!user) {
            return res.status(400).json({
                success: false,
                error: 'User does not exist'
            })
        }

        if(user.isActive === true) {
            const response = await userModel.findByIdAndUpdate(userId, {isActive: false});

            if(!response) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to update'
                })
            }
        }else {
            const response = await userModel.findByIdAndUpdate(userId, {isActive: true});

            if(!response) {
                return res.status(500).json({
                    success: false,
                    error: 'Failed to update'
                })
            }
        }

        res.status(200).json({
            success: true,
            message: 'Updated successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
};

module.exports = {
    getAllUsersController,
    toggleUserAccessController
}