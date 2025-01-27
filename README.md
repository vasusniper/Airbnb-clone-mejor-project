# Airbnb Clone Project
  live project https://wanderlust-guca.onrender.com/listings

## Overview
This is a full-stack Airbnb clone project built using modern web development technologies. The project replicates core functionalities of Airbnb, allowing users to browse listings, view property details, and manage their bookings. The focus of this project is on building a responsive and user-friendly interface with robust backend support.

## Features
- User Authentication:
  - Sign up, login, and logout functionality using **Passport.js**.
  - Password hashing for secure storage.
- Property Listings:
  - View available properties with images, descriptions, and prices.
  - Filter and search functionalities.
- Booking Management:
  - Users can book available properties.
  - View and manage bookings.
- Flash Messages:
  - Real-time feedback using **express-session** and **connect-flash** to display messages like errors or success notifications.
- Responsive Design:
  - Optimized for both desktop and mobile devices.
- Server-side rendering (SSR) with EJS for faster initial page loads and SEO optimization.

## Technologies Used

### Frontend:
- **HTML** and **CSS**: For structure and styling.
- **JavaScript**: For dynamic functionality.
- **EJS**: Embedded JavaScript templates for server-side rendering.

### Backend:
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building APIs and rendering views with EJS.
- **Passport.js**: Middleware for user authentication.

### Database:
- **MongoDB**: For storing user and property data.

### Other Tools and Libraries:
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **passport-local**: For secure user authentication.
- **Pbkdf2**: For password hashing algorithm.
- **express-session**: For session management.
- **connect-flash**: For displaying flash messages.
- **MVC**: for clean code and easily understand.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/airbnb-clone.git
   cd Airbnb-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     SESSION_SECRET=your_session_secret
     ```

4. Run the application:
   ```bash
   npm start
   ```

5. Open your browser and visit:
   ```
   http://localhost:5000
   ```

## Project Structure
```
.
├── backend
│   ├── errors
│   │   └── myErrors.js
│   ├── init  // for data initialization
│   │   └── data.js
│   │   └── index.js
│   ├── models
│   │   └── listing.js
│   │   └── review.js
│   │   └── user.js
│   ├── routes
│   │   └── listings.js
│   │   └── review.js
│   │   └── user.js
│   └── utils
│   │    └── expressError.js
│   │    └── wrapAsync.js
│   └── Middleware.js
│   ├── app.js
├── frontend
│   ├── public
│   │   ├── styles
│   │   │    └── CSS
│   │   ├── validate
│   │        └── Script.js
│   ├── Views
│   │   ├── includes
│   │   │    └── flash.ejs
│   │   │    └── footer.ejs
│   │   │    └── navbar.ejs
│   │   ├── layouts
│   │   │    └── template.ejs
│   │   ├── listings
│   │   │    └── addNew.ejs
│   │   │    └── error.ejs
│   │   │    └── index.ejs
│   │   │    └── login.ejs
│   │   │    └── showlist.ejs
│   │   │    └── signup.ejs
│   │   │    └── update.ejs
└── README.md
```

## Future Enhancements
- Add payment integration using Stripe or PayPal.
- Implement advanced search filters (e.g., by amenities, location).
- Allow property owners to add and manage their listings.
- Add real-time chat functionality for users to communicate with property owners.
- Integrate Google Maps API for property locations.

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for review.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
Special thanks to the open-source community for providing tools and libraries that made this project possible.
