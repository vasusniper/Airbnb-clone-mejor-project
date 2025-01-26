const User = require('../models/user');

// Render signup form
module.exports.signupForm = (req, res) => {
    res.render('listings/signup.ejs');
}

// Handle signup logic
module.exports.signUp = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                next(err);
            }
            req.flash("success", "Welcome to Wandurlust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

// Render login form
module.exports.loginForm = (req, res) => {
    res.render("listings/login.ejs");
}

// Handle login logic
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

// Handle logout logic
module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "Logout successfully");
        res.redirect("/listings");
    });
}
