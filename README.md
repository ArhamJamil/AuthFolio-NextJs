This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## AuthFolio App

AuthFolio is a Next.js based authentication application that provides user registration, login, and email verification features. The app uses MongoDB for storing user data, bcrypt for password hashing, and JWT for authentication tokens. The email verification and password reset functionalities are implemented using nodemailer.

## Features:

  - User Registration
  - User Login
  - Email Verification
  - Password Reset

## Technologies Used:
  
  - Next.js
  - Shadcn ui
  - JWT
  - MongoDb
  - bcrypt.js
  - nodemailer
  - mongoose
  - axios

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/authfolio.git
   cd authfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
   ```bash
   MONGO_URI=your_mongo_uri
   DOMAIN_PORT=3000
   DOMAIN_NAME=http://localhost
   EMAIL_AUTH_PORT=2525
   EMAIL_AUTH_NAME=your_email_auth_name
   EMAIL_AUTH_PASS=your_email_auth_pass
   AUTH_TOKEN=your_jwt_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Registration

- Users can register by providing a username, email, and password.
- A verification email is sent to the user's email address upon successful registration.

### Login

- Users can log in using their email and password.
- A JWT token is generated upon successful login, which is stored in an HTTP-only cookie.

### Email Verification

- Users receive an email with a verification link upon registration.
- The link directs them to a verification endpoint that verifies the token and activates the user's account.

### Password Reset

- Users can request a password reset by providing their email.
- A reset link is sent to the user's email.
- The link directs them to a reset endpoint where they can set a new password.

## Project Structure

```bash
.
├── components
│   └── ... # Your UI components
├── pages
│   ├── api
│   │   ├── users
│   │   │   ├── signup.js
│   │   │   ├── login.js
│   │   │   ├── verify.js
│   │   │   └── reset.js
│   └── ... # Your page components
├── public
│   └── ... # Public assets
├── styles
│   └── ... # CSS and styling files
├── utils
│   ├── dbConn.js
│   ├── mailer.utils.js
│   └── ... # Other utility functions
└── .env.local # Environment variables
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact

For any inquiries, please reach out to [codewitharham.remote@gmail.com](codewitharham.remote@gmail.com).

