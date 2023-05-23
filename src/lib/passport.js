const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool=require('../db')
const helpers=require('../lib/helpers')

passport.use('local',new LocalStrategy({
  usernameField:'username',
  passwordField:'password',
passReqToCallback: true
},async function (req,username,password,done){
  console.log(req,"passport-req")
    console.log(password,"passport-pass")

//console.log(req.body,"req passsport")

const dataUser={username,password}
 const [result]= await pool.query('select * from usuarios where cedula=?',[dataUser.username])
 // console.log(result)
if(result.length>0){
  const user=result[0]
  console.log(user,"passport")
const validPassword=await helpers.matchPassword(password,user.pass)
//console.log(validPassword)
  if(validPassword){
    console.log(req.body, 'if validpass')
     done(null,user,req.flash('success','Welcome'+ user.nombres))
} else{
  
     done(null,false,req.flash('failed',"Incorrect password"))
}
  
} else{
   done(null,false,req.flash('message',"The user does not exists"))
}
  
}))

passport.serializeUser((user,done)=>{
  console.log(user,'serialize')
  done(null,user.cedula)
})

passport.deserializeUser(async(id,done)=>{
const rows=await  pool.query('select * from usuarios where cedula=?',[id])

console.log([id], 'deserialice')
  done(null,rows[0])
})