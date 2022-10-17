const fs=require("fs");
const db = require("../models");
const Player = db.player;
const config = require('../config/auth.config');
var uuid = require('uuid');
var path = require('path');
var AWS = require('aws-sdk');

exports.fileupload= async (req, res) => {

  const file=req.files.file
  console.log("Type="+req.params.type);
  AWS.config.update({
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY,
    Bucket: config.AWS_BUCKET_NAME+"/"+req.params.type
});

const s3 = new AWS.S3();
const extname=path.extname(file.name);
    let newfilename=uuid.v1()+""+extname
// Binary data base64
const fileContent  = Buffer.from(req.files.file.data, 'binary');

 // Setting up S3 upload parameters
 const params = {
  Bucket: config.AWS_BUCKET_NAME+"/"+req.params.type,
  Key: newfilename, // File name you want to save as in S3
  Body: fileContent 
};

// Uploading files to the bucket
s3.upload(params, function(err, data) {
  if (err) {
      throw err;
  }
  res.send({
    status:true,
        message:"file uploaded!",
        data:{
            // filepath:filepath,
            oldfilename:file.name,
            newfilename:newfilename,
            bucket:data.Bucket,
            fullPath:data.Location
        }
  });
});

};
