const addressModel = require('../models/addressModel')

async function addAddress(req, res) {
    try {
        const userId = req.user.id;
        const { address, landmark, city, state, postalCode, country, isDefault } = req.body;

        const response = await addressModel.create({
            userId: userId,
            address: address,
            landmark: landmark,
            city: city,
            state: state,
            postalCode: postalCode,
            country: country,
            isDefault: isDefault
        })

        res.status(201).json({
            success: true,
            response
        })
    } catch (err) {
        console.log(err);
        res.status(500),json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function updateAddress(req, res) {
    try {
        const addressId = req.params.id;
        const body = req.body;
        const address = await addressModel.findById(addressId);

        if(!address) {
            return res.status(404).json({
                success: false,
                error: "Address does not exist"
            })
        }

        const response = await addressModel.findByIdAndUpdate(addressId, body, {new: true});

        res.status(200).json({
            success: true,
            response
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}

async function removeAddress(req, res) {
    try {
        const addressId = req.params.id;
        const check = await addressModel.findById(addressId);

        if(!check) {
            return res.status(404).json({
                success: false,
                error: 'Addres not found'
            })
        }

        const response = await addressModel.findByIdAndDelete(addressId);
        if(!response) {
            return res.status(400).json({
                success: false,
                error: 'Failed to delete address'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        })
    }
}

async function fetchAddresses(req, res) {
    try {
        const userId = req.user.id;
        const addresses = await addressModel.find({userId: userId});

        if(!addresses) {
            return res.status(404).json({
                success: false,
                error: "Address Not Found"
            })
        }

        res.status(200).json({
            success: true,
            response: addresses
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

async function fetchPrimaryAddress(req, res) {
    try {
        const primaryAddress = await addressModel.findOne({isDefault: true});

        if(!primaryAddress) {
            return res.status(404).json({
                success: false,
                error: 'Primary address not found'
            })
        }

        res.status(200).json({
            success: true,
            response: primaryAddress
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Intenal Server Error'
        })
    }
}

module.exports = {
    addAddress,
    updateAddress,
    removeAddress,
    fetchAddresses,
    fetchPrimaryAddress
}