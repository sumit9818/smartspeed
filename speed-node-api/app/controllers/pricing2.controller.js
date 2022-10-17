const db = require('../models')
const Pricing2 = db.Pricing2;
const paypal = require('paypal-rest-sdk');
const config = require('../config/paypal.config');

exports.createPricing2 = async (req, res) => {
    try {
        if (!req.body.title) {
            return res.status(400).send({
                message: "Note content can not be empty"
            });
        }
        else {
            const pricing2 = new Pricing2({
                title : req.body.title,
                isactive:req.body.isactive,
                description : req.body.description,
                price:req.body.price,
                plan_type:req.body.plan_type

            })
            pricing2.save().then(data => {

                res.send(
                    {
                        success: true,
                        message: "One Time Plan added successfully",
                        "data": data
                    });
            }).catch(err => {
                console.log("error" + err)
                res.status(500).send(err)
            })
        }
    }
    catch (error) {
        return res.status(500).send({
            message: error
        });
    }
}


exports.updatePricing2 = async (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "data can not be empty"
        });
    }
    else {

        await Pricing2.findOneAndUpdate({ _id: req.params.id }, {
            title : req.body.title,
            isactive:req.body.isactive,
            description : req.body.description,
            price:req.body.price,
            plan_type:req.body.plan_type
        }).then(data => {
            res.status(200).send({
                "message": "Plan Detail Updated",
                "data": data
            })
        }).catch(ex => {
            res.status(500).send({
                "message": "Invalid description ID"
            })
        });

    }
}

exports.getAllPricings2 = async (req, res) => {
    try {
        const pricing2 = await Pricing2.find({ isactive: true });
        if (!pricing2) {
          res.status(500).send({
            message: "There are no Pricings",
          });
        } else {
          res.status(200).send({
            data: pricing2,
          });
        }
      } catch (err) {
        res.status(500).send(err);
      }
}
exports.getSinglePricing2 = async (req, res) => {
    try {
        await Pricing2.findOne({ _id: req.params.id }).then(data => {
            if (!data) {
                res.status(404).send({
                    success: false,
                    "message": "plan not found"
                })
            } else {
                res.status(200).send({
                    success: true,
                    data: data
                });
            }
        }).catch(err => {
            res.status(500).send({
                success: false,
                "message": "Something went wrong"
            })
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deletePricing2 = async (req, res) => {
    try {
        //Delete Blog
        await Pricing2.findByIdAndRemove(req.params.id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        success: false,
                        "message": "Plan not found"
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "plan deleted successfully."
                    });
                }
            }).catch(err => {
                res.status(500).send({
                    success: false,
                    "message": "Something went wrong"
                })
            })
    }
    catch (err) {
        res.status(400).send({
            success: false,
            message: `Something is wrong with description!`
        });
        return;
    }

};