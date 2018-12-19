var patient = require('../models/patient.js');

exports.createNewPatient = function(req,res){
  var params = req.body;
  if(params.name!=null && params.name!=undefined && params.name!=''){
    if(params.age!=null && params.age!=undefined && params.age!=''){
      if(params.mobile!=null && params.mobile!=undefined && params.mobile!=''){
        if(params.generalHistory!=null && params.generalHistory!=undefined && params.generalHistory!=''){
          if(params.diagnosis!=null && params.diagnosis!=undefined && params.diagnosis!=''){
            if(params.treatment!=null && params.treatment!=undefined && params.treatment!=''){
              params.doctor_id = req.user._id;
              patient.find({doctor_id : req.user._id}).sort({serialNumber:-1}).exec(function(error,patientResult){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  if(patientResult.length>0){
                    params.serialNumber = parseInt(patientResult[0].serialNumber)+1;
                  }else{
                    params.serialNumber = 1;
                  }
                  patient.create(params).then(function(result){
                    console.log("Patient created",result);
                    res.status(202).send({message:"created successfully",result:result});
                  })
                }
              })
            }else{
              res.status(403).send({message:"treatment required"});
            }
          }else{
            res.status(403).send({message:"diagnosis required"});
          }
        }else{
          res.status(403).send({message:"generalHistory required"});
        }
      }else{
        res.status(403).send({message:"mobile required"});
      }
    }else{
      res.status(403).send({message:"age required"});
    }
  }else{
    res.status(403).send({message:"name required"});
  }
}

exports.addExistingPatientPrescription = function(req,res){
  var params = req.body;
  if(params.name!=null && params.name!=undefined && params.name!=''){
    if(params.age!=null && params.age!=undefined && params.age!=''){
      if(params.mobile!=null && params.mobile!=undefined && params.mobile!=''){
        if(params.generalHistory!=null && params.generalHistory!=undefined && params.generalHistory!=''){
          if(params.diagnosis!=null && params.diagnosis!=undefined && params.diagnosis!=''){
            if(params.treatment!=null && params.treatment!=undefined && params.treatment!=''){
              params.doctor_id = req.user._id;
              patient.findOne({doctor_id : req.user._id, serialNumber:parms.serialNumber}).sort({serialNumber:-1}).exec(function(error,patientResult){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  if(patientResult){
                    params.serialNumber = patientResult.serialNumber;
                    patient.create(params).then(function(result){
                      console.log("Patient data created",result);
                      res.status(200).send({message:"created successfully",result:result});
                    })
                  }else{
                    res.status(404).send({message:"patient not found"});
                  }
                }
              })
            }else{
              res.status(403).send({message:"treatment required"});
            }
          }else{
            res.status(403).send({message:"diagnosis required"});
          }
        }else{
          res.status(403).send({message:"generalHistory required"});
        }
      }else{
        res.status(403).send({message:"mobile required"});
      }
    }else{
      res.status(403).send({message:"age required"});
    }
  }else{
    res.status(403).send({message:"name required"});
  }
}

exports.updatePatientPrescription = function(req,res){
  var params = req.body;
  if(params.serialNumber!=null && params.serialNumber!=undefined && params.serialNumber!='' && (params.prescriptionSerial!=null && params.prescriptionSerial!=undefined && params.prescriptionSerial!='')){
      patient.findOne({doctor_id:req.user._id,serialNumber:params.serialNumber,prescriptionSerial:params.prescriptionSerial}).exec(function(error,result){
        if(error){
          res.staus(500).send({error:error});
        }else{
          if(result){
              result.name = req.body.name
              ? req.body.name
              : result.name;
              result.age = req.body.age
              ? req.body.age
              : result.age;
              result.mobile = req.body.mobile
              ? req.body.mobile
              : result.mobile;
              result.cnic = req.body.cnic
              ? req.body.cnic
              : result.cnic;
              result.address = req.body.address
              ? req.body.address
              : result.address;
              result.prescriptionSerial = req.body.prescriptionSerial
              ? req.body.prescriptionSerial
              : result.prescriptionSerial;
              result.generalHistory = req.body.generalHistory
              ? req.body.generalHistory
              : result.generalHistory;
              result.cheifComplaints = req.body.cheifComplaints
              ? req.body.cheifComplaints
              : result.cheifComplaints;
              result.diagnosis = req.body.diagnosis
              ? req.body.diagnosis
              : result.diagnosis;
              result.advise = req.body.advise
              ? req.body.advise
              : result.advise;
              result.treatment = req.body.treatment
              ? req.body.treatment
              : result.treatment;
              result.save(function(error,saved){
                if(error){
                  res.status(500).send({error:error});
                }else{
                  res.status(200).send({message:"updated successfully",result:saved});
                }
              })
          }else{
            res.status(404).send({message:"patient not found"});
          }
        }
      })
  }else{
    res.status(403).send({message:"serialNumber required"})
  }
}

exports.getAllPatients = function(req,res){
  patient.find({}).populate("doctor_id").exec(function(error,result){
    if(error){
      res.status(500).send({error:error});
    }else{
      if(result.length>0){
        res.status(200).send({result:result});
      }else{
        res.status(404).send({message:"no record found"});
      }
    }
  })
}


exports.getPatientDetails = function(req,res){
  var params = req.body;
  if(params.serialNumber!=null && params.serialNumber!=undefined && params.serialNumber!=''){
    patient.find({_id:params.serialNumber,doctor_id:req.user._id}).populate("doctor_id clinic_id").exec(function(error,result){
      if(error){
        res.status(500).send({error:error});
      }else{
        res.status(200).send({result:result});
      }
    })
  }else{
    res.status(403).send({message:"patient_id required"});
  }
}
