module.exports={
    isLoggedIn(req,res,next){
        console.log(req.body,'auth')
        if(req.isAuthenticated()){
        
          //req.flash('success','Ingreso exitoso')
            return next()
        }else{
            return res.redirect('/notAuth')
        }
    },

isNotLoggedIn(req, res,next){
    if(!req.isAuthenticated()){
        return next()
    }else{return res.redirect('/profile')}


            
    }

}