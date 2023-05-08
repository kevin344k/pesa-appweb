const passport=require("passport")
const LocalStrategy=require("passport-local").Strategy
const pool  =require ("./db.js");


passport.use("local-signup",new LocalStrategy({
  usernameField:"nameUser",
  passwordField:"password",
  passReqToCallback: true
},(req,nameUser,password,done)=>{
  
}))