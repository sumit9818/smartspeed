const controller = require("../controllers/fileupload.controller");
const checkIsValidExcelFormat = require("../middleware/fileupload");
var multer = require('multer');
var AWS = require('aws-sdk');

module.exports = function(app) {

//   AWS.config.update({
//     accessKeyId: "AKIAUV262NRQ6JQECXE5",
//     secretAccessKey: "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",
//     Bucket: "myclaytonbucket"
// });
// var s3 = new AWS.S3();

//  app.use(multer({ // https://github.com/expressjs/multer
//   dest: './public/uploads/', 
//   limits : { fileSize:100000 },
//   rename: function (fieldname, filename) {
//     return filename.replace(/\W+/g, '-').toLowerCase();
//   },
//   onFileUploadData: function (file, data, req, res) {
//     // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
//     var params = {
//       Bucket: 'makersquest',
//       Key: file.name,
//       Body: data
//     };

//     s3.putObject(params, function (perr, pres) {
//       if (perr) {
//         console.log("Error uploading data: ", perr);
//       } else {
//         console.log("Successfully uploaded data to myBucket/myKey");
//       }
//     });
//   }
// }));


// app.post('/api/fileupload',[checkIsValidExcelFormat], function(req, res){
//   if(req.files.image !== undefined){ // `image` is the field name from your form
//       res.redirect("/uploads"); // success
//   }else{
//       res.send("error, no file chosen");
//   }
// });

  app.post('/api/fileupload/:type' ,[checkIsValidExcelFormat],controller.fileupload);
};