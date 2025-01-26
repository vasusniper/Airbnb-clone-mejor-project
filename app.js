// Load environment variables in non-production environments
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('./utils/expressError.js');
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require('passport-local');
const User = require('./models/user.js');
const ejsMate = require("ejs-mate");
const path = require('path');
const Listing = require("./models/listing.js");
const MongoStore = require("connect-mongo");

// Initialize Express app
const app = express();

// Database connection URL
const DB_url = process.env.ATLASDB_URL;

// Session store setup using MongoDB
const store = MongoStore.create({
    mongoUrl: DB_url,
    crypto: { secret: process.env.SECRET_KEY },
    touchAfter: 24 * 3600, // Update session after 24 hours
});

// Error handler for session store
store.on("error", (err) => {
    console.log("Error in MongoDB session store:", err);
});

// Session configuration
const sessionOption = {
    store,
    secret: process.env.SECRET_KEY,
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        maxAge: 7 * 24 * 60 * 60 * 1000, // Max age of cookie (7 days)
        httpOnly: true
    }
}

// Setup ejs-mate for layout rendering
app.engine('ejs', ejsMate);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the views directory for ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static files (CSS, images) setup
app.use(express.static(path.join(__dirname, "public")));

// Method-override middleware (for supporting HTTP methods such as PUT)
app.use(methodOverride("_method"));

// Database connection
async function main() {
    try {
        await mongoose.connect(DB_url);
        console.log("Database connection successfully established.");
    } catch (err) {
        console.log("Error in database connection:", err);
    }
}

// Connect to MongoDB
main();

// Session middleware
app.use(session(sessionOption));

// Flash middleware for displaying success/error messages
app.use(flash());

// Passport authentication setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Locals middleware to make session data available in views
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// Routing for listings, reviews, and users
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Handle 404 - Page Not Found error
app.all("*", (req, res, next) => {
    const exError = new ExpressError(404, "Page not found");
    next(exError);
});

// General error handler
app.use((err, req, res, next) => {
    const { statusCode, message } = err;
    res.status(statusCode || 500).render("listings/error.ejs", { message });
});

// Start the server on port 8080
app.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});

// Home route
app.get("/", (req, res) => {
    res.send("Server is working successfully on port 8080");
});