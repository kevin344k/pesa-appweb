module.exports={
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }else{
            return res.redirect('auth/notAuth')
        }
    },

isNotLoggedIn(req, res,next){
    if(!req.isAuthenticated()){
        return next()
    }else{return res.redirect('/profile')}


            
    }

}