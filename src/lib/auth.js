module.exports = {

    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            //console.log('authenticated');
            return next();
        }
        return res.redirect('/signin');
    },
    isNotLoggedIn (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');
    }
    
};