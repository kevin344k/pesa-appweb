module.exports={
    isLoggedIn(req,res,next){
      
        if(req.isAuthenticated()){
          console.log(req)
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