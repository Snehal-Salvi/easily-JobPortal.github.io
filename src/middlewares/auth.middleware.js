// auth middleware to check if user logged in as recruiter or not
export const auth = (req, res, next) => {
    if(req.session.userEmail){
        next();
    }else{
        res.render('error-page');
    }
}

