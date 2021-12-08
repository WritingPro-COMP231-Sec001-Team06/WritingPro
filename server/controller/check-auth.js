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
        return next();
    }
};

module.exports.InstructorIsApproved = (req, res, next) => {
    if(req.user.isApproved){
        return next();
    }
    return res.redirect("/instructor/documents");
};