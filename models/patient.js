var mongoose = require('mongoose');

var PatientSchema = new mongoose.Schema({
    name:{ type: String,required:true},
    age:{type:Number},
    mobile:{type:Number},
    cnic:{type:String},
    address:{type:String},
    doctor_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    prescriptionSerial : {type:String},
    serialNumber : {type:Number},
    date:{type:Date,default:Date.now()},
    generalHistory:{type:String},
    cheifComplaints:{type:String},
    clinic_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' },
    diagnosis:{type:String},
    advise:{type:String},
    treatment:{type:String}
});
module.exports = mongoose.model('Patient',PatientSchema);
