const bcrypt=require("bcryptjs")
const helpers={}
/*
helpers.encryptPassword=async (password)=>{
const salt=await bcrypt.genSaltSync(10)
 const hash=await bcrypt.hashSync(password,salt)

 return hash
}
*/

helpers.matchPassword=async(password,savedpassword)=>{
 

try{
 return await bcrypt.compare(password,savedpassword)
}catch(e){
    console.log(e)
}

}

module.exports=helpers