const express =require('express')
const router =express.Router()
const driver=require('../models/driver')
const multer = require("multer");
var cloudinary = require('cloudinary');
const path = require('path');
          
cloudinary.config({ 
  cloud_name: 'dhj6zvh9f', 
  api_key: '435696971727228', 
  api_secret: 'Yi8BZLoNZcvMjYh2xx1xALPWmIQ' 
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'), // cb -> callback
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });
  
  // handler
  const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
  }).single("image");


//get request-------------------------------------+++++++++++++++++++++++
router.get('/',
async(req,res)=>{
try{
//   res.send('Hello World');
//   console.log('orderd request sended')

const drivers=await driver.find()
res.json(drivers)

} 
catch(err){
    res.send('Error'+err)
}

})
//-------------------------------------------------------------------------------


//post request------------------------------------++++++++++++++++++++
router.post('/',async(req,res)=>{
    //==============================
    handleMultipartData(req, res, async (err) => {
        if (err) {
          res.json({ msgs: err.message });
        }
    
        const filePath = req.file.path;
    
        if (!filePath) {
          return;
        }
    
        let cloud_FileLink;
       

        
        cloudinary.v2.uploader.upload(filePath, async (error, result) => {
          if (result.secure_url) {
            const Ndriver= new driver({

                name: req.body.name,
                nic: req.body.nic,
                lid: req.body.lid,
                image: result.secure_url

            
            })
        
        try{        
            const a1 =await Ndriver.save()
             res.json(a1)
        
        }catch(err){
            res.send('Error'+err)
        }
           
          } else {
            res.send(error.message);
          }
        });
      });
    });
//===============================================
    
//---------------------------------------------------------------------

module.exports=router