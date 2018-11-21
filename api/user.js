const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
var sendgrid = require("sendgrid")(process.env.sendgridApiKey);

var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var hashedPassword = require('password-hash');
const passport = require('passport');
var cookieParser = require('cookie-parser');

exports.homePage = function (req, res) {
  res.sendFile(__dirname + '/index.html');
}

exports.register = function (req, res) {
  var params = req.body;
  if(parmas.email!=null && parmas.email!=undefined && parmas.email!=''){
    if(parmas.password!=null && parmas.password!=undefined && parmas.password!=''){
      if(parmas.mobile!=null && parmas.mobile!=undefined && parmas.mobile!=''){
        if(parmas.name!=null && parmas.name!=undefined && parmas.name!=''){
          User.create(params).then(function(result){
            res.status(202).send({messgae:"created successfully",result:result});
          })
        }else{
          res.status(403).send({message:"name required"});
        }
      }else{
        res.status(403).send({message:"mobile required"});
      }
    }else{
      res.status(403).send({message:"password required"});
    }
  }else{
    res.status(403).send({message:"email required"});
  }
}

exports.authenticate = function (req, res) {
  console.log("Request : ",req.body);
  if (req.body.email != null && req.body.email != "") {
    console.log("in email");
    User.findOne({ email: req.body.email , isDeleted:false}).select('+password').exec(function (err, user) {
      if (err) {
        throw err;
      } else if (user) {

        image.findOne({ userId: user._id }).exec(function (err, image) {

          if (user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {

                user.password = undefined;
                var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
                User.findOne({_id:user._id}).then(function(found){
                  res.status('200').send({ success: true, token: 'JWT ' + token, user: found});
                })

            } else {
              res.status(401).send({ success: false, message: 'password did not match.' });
            }
          }));
        })
      } else {
        res.status(401).send({ success: false, message: 'user not found' })
      }

    });
  } else {
    res.status(403).send({ message: "Perameters Missing" });
  }
}


// //function used to edit some data in database
exports.edit = function (req, res) {
  console.log("Request : ", req.body);
  User
  .findOne({ _id: req.user._id }).select('+password')
  .exec(function (error, user) {
    //  console.log(user);
    user.name = req.body.name
    ? req.body.name
    : user.name;
    user.email = req.body.email
    ? req.body.email
    : user.email;


    user.save(function (error, user) {
      if (error) {

        res
        .status('500')
        .send({ error: error })
      } else {

            res
            .status('200')
            .send({ message: 'updated' })
          }
          });


  })

}
