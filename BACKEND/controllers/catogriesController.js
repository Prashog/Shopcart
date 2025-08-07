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

async function categoryDisplay(req, res) {
    try {
        const category1 = await categoryModel.findById('68356379ed480025b762b79d');
        const category2 = await categoryModel.findById('686e3bbb14169f699d55647b');
        const category3 = await categoryModel.findById('688db80144fa85552e528e51');
        const category4 = await categoryModel.findById('688f41e6729ea6128980cc00');
        const category5 = await categoryModel.findById('688db8b244fa85552e528e65');

        res.status(200).json({
            success: true,
            category1,
            category2,
            category3,
            category4,
            category5
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        })
    }
}

module.exports = {
    allCategoriesController,
    addCategoriesController,
    categoryDisplay,
}