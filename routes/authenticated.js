const express = require('express');
var router = express.Router();

// //routes for user table of database
var user=require('../api/user.js');





var patient = require('../api/patient.js');
router.post('/createNewPatient',patient.createNewPatient);
router.post('/getPatientDetails',patient.getPatientDetails);
router.post('/getAllPatients',patient.getAllPatients);
router.post('/updatePatientPrescription',patient.updatePatientPrescription);
router.post('/addExistingPatientPrescription',patient.addExistingPatientPrescription);
module.exports = router;
