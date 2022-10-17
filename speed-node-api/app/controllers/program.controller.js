const db=require('../models')
const Program=db.Program;
const User=db.User;
const AtheleteCoachMapping=db.AthleteCoachMapping;


exports.createProgram= async (req, res) => {
    try{
        if(!req.body.title) {
            return res.status(400).send({
                message: "program title can not be empty"
            });
        }
        else {
            console.log(req.body.data);
                const program = new Program({
                    title : req.body.title,
                    isactive:req.body.isactive,
                    data:req.body.data,
                    athletes :req.body.athletes
                });

                program
          .save()
          .then((data) => {
            res.send({
              success: true,
              message: "Program added successfully",
              data: data,
            });
          })
          .catch((err) => {
            res.status(500).send(err);
          });
        }
    }
    catch(error){
        return res.status(500).send({
            message: error
        });
    }
   }

   
exports.updateProgram= async (req, res) => {
    // Validate request
    if(!req.body.title) {
       return res.status(400).send({
           message: "Program can not be empty"
       });
   }
   else {

    await Program.findOneAndUpdate({_id:req.params.id},{
        title : req.body.title,
        isactive:req.body.isactive,
        athletes :req.body.athletes,
        data:req.body.data
}).then(data=>{
    console.log(data);
}).catch(ex=>{
    res.status(500).send({
        "message":"Invalid program ID"
    })
});


await Program.findOne({_id:req.params.id}).then(data => {
    if (!data) {
        res.status(404).send({
            success: false,
            "message": "There is no Program, Please add your first."
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

   }
   }

// exports.getSingleProgram = async (req, res) => {
//     try {
//         await Program.findOne({_id:req.params.id}).then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     success: false,
//                     "message": "There is no Program, Please add your first."
//                 })
//             } else {
//                 res.status(200).send({
//                     success: true,
//                     data: data
//                 });
//             }
//         }).catch(err => {
//             res.status(500).send({
//                 success: false,
//                 "message": "Something went wrong"
//             })
//         })
//     } catch (err) {
//         res.status(500).send(err)
//     }
// }

exports.getSingleProgram= async (req,res)=>{
    try{
       await Program.findOne({ _id: req.params.id})
            .populate("athletes", "-__v")
            .exec((err, data) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.status(200).json({
                data:{
                      id: data._id,
                      title: data.title,
                      athletes: data.athletes,
                      created_at:data.created_at,
                      isactive:data.isactive,
                      data:data.data
                  }
               });
            });
    }catch(err){
        res.status(500).send(err)
    }
}

// exports.getAllPrograms = async (req, res) => {
//     try {
//         await Program.find({isactive:true}).then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     success: false,
//                     "message": "There is no Program, Please add your first."
//                 })
//             } else {
//                 res.status(200).send({
//                     success: true,
//                     data: data
//                 });
//             }
//         }).catch(err => {
//             res.status(500).send({
//                 success: false,
//                 "message": "Something went wrong"
//             })
//         })
//     } catch (err) {
//         res.status(500).send(err)
//     }
// }

exports.getAllPrograms= async (req,res)=>{
    try{
        console.log('all');
        Program.find({})
            .populate("athletes", "-__v")
            .exec((err, data) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
        
              res.status(200).json({
                data: data.map(function (value) {
                    console.log(value);
                  return {
                      _id: value._id,
                      title: value.title,
                      athletes: value.athletes,
                      created_at:value.created_at,
                      isactive:value.isactive,
                      data:value.data
                  }
              })
               });
            });
    }catch(err){
        res.status(500).send(err)
    }
}

exports.deleteProgram=async(req,res)=>{
    try{
        //Delete Program
        Program.findByIdAndRemove(req.params.id)
        .then(data=>{
            if(!data){
                res.status(404).send({
                    success:false,
                    "message":"Program not found"
                })
            } else {
                res.status(200).send({ 
                    success:true,
                    message: "Program deleted successfully." });
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
                            message: `Something is wrong with program!`
                         });
                              return;
                            }};