const db = require("../models");
const Program = db.Program;
const ProgramMapping=db.AtheleteProgramMapping;

exports.updateProgram = async (req, res) => {
  // Validate request
  if (!req.body==null) {
    return res.status(400).send({
      message: "Invalid Request",
    });
  } else {

    req.body.forEach(element => {

      var updated=false;
      // ProgramMapping.findOne({instructionId:element.instructionId,athlete_id:req.params.id ? req.params.id : req.userId}).then(data=>{
      //   console.log("FindOne="+data);

      // });
      ProgramMapping.findOneAndUpdate({instructionId:element.instructionId,athlete_id:req.params.id ? req.params.id : req.userId},{
        instructionId: element.instructionId,
        status: element.status,
        athlete_id:req.params.id ? req.params.id : req.userId,
      }).then(data=>{
        console.log("Already has data");
        if(data==null){
          console.log("Welcome");
          const programInstruction = new ProgramMapping({
            instructionId: element.instructionId,
            status: element.status,
            athlete_id:req.params.id ? req.params.id : req.userId,
          });
    
          programInstruction.save().then((subtitles) => {
            console.log("Added")
          });
        }
        // updated=true;
      }).catch(err => {
        console.log("error" + err)
    });
    });

    res.status(200).send({ message: "Program Updated" });
  }
};

exports.getAllProgramsByUser = async (req, res) => {
  try {
    const userId = req.params.id ? req.params.id : req.userId;
    var athleteMapping=await ProgramMapping.find({ athlete_id: userId});
    await Program.find({ athletes: { $in: userId }, isactive: true }).exec(
      (err, data) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        var result=data.map(function (value) {
          return {
            data:value.data
          };
        });

        var MapData=[];

        data.forEach(element => {
          element.data.forEach(element1=>{
            element1.instruction.forEach(element2=>{
              athleteMapping.forEach(map=>{
                console.log(map);
                if(map.instructionId==element2._id){
                  element2.status=map.status;
                }
              });
            })
          })
          MapData.push(element);
        });

        console.log(MapData);

        res.status(200).json({
          data: data.map(function (value) {
            return {
              id: value._id,
              title: value.title,
              created_at: value.created_at,
              data:MapData.filter(x => x._id === value._id)[0].data
            };
          }),
        });
      }
    );
  } catch (err) {
    res.status(500).send(err);
  }
};
