const categoryModel = require('../models/categoryModel')

async function allCategoriesController(req, res) {
    try {
        const response = await categoryModel.find();

        res.status(200).json({
            success: true,
            response: response
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

async function addCategoriesController(req, res) {
    try {
        const {name, description} = req.body;
        const check = await categoryModel.findOne({name: name});

        if(check) {
            return res.status(400).json({
                success: false,
                error: 'Category already exists'
            })
        }

        const newCategory = await categoryModel.create({name,description});

        res.status(200).json({
            success: true,
            response: newCategory
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
};

module.exports = {
    allCategoriesController,
    addCategoriesController
}