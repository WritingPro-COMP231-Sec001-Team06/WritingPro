module.exports.Admin = (req, res, next) => {
    if(!req.user){
        return res.redirect("/login");
    }
    else if(req.user){
        if(req.user.role !== "admin"){
            return res.redirect("/" + req.user.role);
        }
        return next();
    }
};

module.exports.Instructor = (req, res, next) => {
    if(!req.user){
        return res.redirect("/login");
    }
    else if(req.user){
        if(req.user.role !== "instructor"){
            return res.redirect("/" + req.user.role);
        }
        else if(req.user.role === "instructor" && !req.user.isApproved){
            return res.redirect("/instructor/upload");
        }
        return next();
    }
};