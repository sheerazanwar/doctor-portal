var mongoose = require('mongoose');

var ClinicSchema = new mongoose.Schema({
    name:{ type: String,required:true},
    contact:{type:Number},
    address:{type:String},
    doctor_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Clinic',ClinicSchema);
