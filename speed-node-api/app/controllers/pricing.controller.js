const db=require('../models')
const Pricing=db.Pricing;
const paypal = require('paypal-rest-sdk');
const config = require('../config/paypal.config');
paypal.configure({
    'mode': config.PAYPAL_MODE, //sandbox or live
    'client_id': config.PAYPAL_CLIENTID,
    'client_secret': config.PAYPAL_SECRET
  });


exports.createPricing= async (req, res) => {
    console.log('res == ' , res)
    console.log("Started.....")
    try{
        if(!req.body.title) {
            return res.status(400).send({
                message: "Title can not be empty"
            });
        }
        else {

            var billingPlanAttributes = {
                "product_id": "PROD-18F926416A6717317",
                "name": req.body.title,
                "description": req.body.description,
                "type": "fixed",
                "payment_definitions": [{
                    "name": "Standard Plan",
                    "type": "REGULAR",
                    "frequency_interval": "1",
                    "frequency": "MONTH",
                    "cycles": "0",
                    "amount": {
                        "currency": "AUD",
                        "value": req.body.price
                    }
                }],
                "merchant_preferences": {
                    "setup_fee": {
                        "currency": "AUD",
                        "value": "0"
                    },
                    "cancel_url": "http://localhost:3000/cancel",
                    "return_url": "http://localhost:3000/processagreement",
                    "max_fail_attempts": "0",
                    "auto_bill_amount": "YES",
                    "initial_fail_amount_action": "CONTINUE"
                },
                "type": "INFINITE"
            };
            var billingPlanUpdateAttributes = [{
                "op": "replace",
                "path": "/",
                "value": {
                    "state": "ACTIVE"
                }
            }];

            // Create the billing plan
paypal.billingPlan.create(billingPlanAttributes, function (error, billingPlan) {
    console.log('works')
    if (error) {
        console.log(error);
        throw error;
    } else {
        console.log("Create Billing Plan Response");
        console.log(billingPlan);

        // Activate the plan by changing status to Active
        paypal.billingPlan.update(billingPlan.id, billingPlanUpdateAttributes, function (error, response) {
            if (error) {
                console.log(error);
                throw error;
            } else {
                const pricing = new Pricing({
                    title : req.body.title,
                    isactive:req.body.isactive,
                    description : req.body.description,
                    price:req.body.price,
                    month:req.body.month,
                    plan_id:billingPlan.id
                })
                pricing.save().then(data=>{
                    res.send(
                        { 
                         success:true,
                           message: "Pricing added successfully",
                          "data":data
                      });
                }).catch(err=>{
                    console.log("error"+err)
                    res.status(500).send(err)
                })
            }
        });
    }
});
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            message: error
        });
    }
   }

   
exports.updatePricing= async (req, res) => {
    // Validate request
    if(!req.body.title) {
       return res.status(400).send({
           message: "Pricing can not be empty"
       });
   }
   else {

       await Pricing.findOneAndUpdate({_id:req.params.id},{
            title : req.body.title,
            isactive:req.body.isactive,
            description : req.body.description,
            price:req.body.price,
            month:req.body.month
    }).then(data=>{
        res.status(200).send({
            "message":"Pricing Detail Updated",
            "data": data
        })
    }).catch(ex=>{
        res.status(500).send({
            "message":"Invalid description ID"
        })
    });
    
   }
   }

   exports.getAllPricings= async (req,res)=>{
    try{
        const pricing = await Pricing.find({isactive:true})
        if(!pricing){
            res.status(500).send({
                "message":"There are no Pricings"
            })
        } else {
            res.status(200).send({
                "data": pricing
            })
        }
    }catch(err){
        res.status(500).send(err)
    }
}

exports.getSinglePricing= async (req,res)=>{
    try{
       await Pricing.findOne({ _id: req.params.id}) .then(data=>{
        if(!data){
            res.status(404).send({
                success:false,
                "message":"Pricing not found"
            })
        } else {
            res.status(200).send({ 
                success:true,
                data: data });
        }
    }).catch(err=>{
        res.status(500).send({
            success:false,
            "message":"Something went wrong"
        })
    })
    }catch(err){
        res.status(500).send(err)
    }
}

exports.deletePricing=async(req,res)=>{
    try{
        //Delete Pricing
      await Pricing.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    success:false,
                    "message":"Pricing not found"
                })
            } else {
                res.status(200).send({ 
                    success:true,
                    message: "Pricing deleted successfully." });
            }
        }).catch(err=>{
            res.status(500).send({
                success:false,
                "message":"Something went wrong"
            })
        })
    }
    catch(err){
    res.status(400).send({  
                            success:false,
                            message: `Something is wrong with pricing!`
                         });
                              return;
                            }
                        
                        };