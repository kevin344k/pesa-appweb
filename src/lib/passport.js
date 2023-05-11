const passport = require("passport");
const LocalStrategy = require("passport-local");
const pool = require("../db.js");
const helpers=require('../lib/helpers')

console.log("hollaaaaaa")
passport.use("local.signin",new LocalStrategy( {
cifield:'ci',
passwordfield:'pass',
passReqToCallback:true
  
},async (req,ci,pass,done)=>{
  console.log(req.body)
console.log(ci)
  console.log(pass)
}))