# Myanmar-Flood  

This project is focused on developing tech solutions to improve disaster response for Myanmar's flood crisis that started on 9 September 2024. The app will assist in real-time damage assessment, needs analysis, and provide a dashboard for decision-makers and aid organizations.  

## Technology Stack  
-------------------------------------  
**##Backend:**
    - **PostgreSQL**: A SQL database for storing application data.  
    - **Express.js**: A web application framework for Node.js.  
    - **Node.js**: A JavaScript runtime for server-side programming.
    - **Prisma**: An ORM for database modeling and querying with PostgreSQL.
**##FrontEnd:**
    - **React**: A JavaScript library for building user interfaces.  
    - **Tailwind CSS**: A utility-first CSS framework for styling the frontend.
    - **Material Ui** : for modern design
    - **Clerk**: An authentication and user management service to handle user sign-up, sign-in, and access control.
  

## Prerequisites for Local Deployment  
---------------------------------------  
Before you begin, ensure you have the following requirements met:  
- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).  
- **PostgreSQL**: Set up a PostgreSQL database locally or using a cloud provider.
- **Prisma: Install Prisma CLI globally or locally in your project. 


## Installation  
---------------  
1. Clone the repository:  
    ```bash  
    git clone https://github.com/Amir1887/Myanmar-Flood.git  
    cd Myanmar-Flood  
    ```  

2. Install server dependencies:  
    ```bash  
    cd back-end  # Navigate to the backend directory  
    npm install  
    ```  

3. Set up environment variables in the server directory (.env file):  
    ```bash  
    DATABASE_URL=<your-postgresql-connection-string>  
    PORT=4000 
    ```  
4. Initialize Prisma:
    Create your Prisma schema file:
    ```bash  
       npx prisma init
    ```
    Add the PostgreSQL connection string in the newly created .env file:
    ```bash  
       DATABASE_URL=postgresql://<username>:<password>@localhost:5432/MyanmarFlood?schema=public

    ```

5. Generate Prisma client and run migrations:  
    ```bash  
    npx prisma generate  
    npx prisma migrate dev --name init  
 
    ```
   ** This will apply the migrations and set up your database schema.
   
6. Install client dependencies:  
    ```bash  
     cd ../front-end/myanmar-flood  # Navigate to the frontend directory   
    npm install  
    ```  

7. Set up environment variables for the client in the client directory (.env file):  
    ```bash  
    REACT_APP_BASE_URL='http://localhost:4000'
    REACT_APP_CLERK_PUBLISHABLE_KEY=..............
    REACT_APP_SIGN_IN_REDIRECT_URL=................
    REACT_APP_SIGN_IN_FALLBACK_REDIRECT_URL=................
    ```  

## Using Tailwind CSS 
---------------  
This project uses Tailwind CSS for responsive, utility-first styling. To modify the design system or extend styles, check tailwind.config.js and add your custom styles or themes.

Tailwind Setup:
1.Tailwind is already installed as part of the front-end dependencies.
2.Custom colors and themes are defined in tailwind.config.js. Feel free to modify and extend this file based on your taste.
```bash  
    module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3AB0FF',
          DEFAULT: '#1E3A8A',
          dark: '#1E2A5A',
        },
      },
    },
  },
  plugins: [],
};
```
3. Tailwind utilities can be used directly in JSX, like so:
   ```bash  
    <button className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded">
    Click me
    </button>
  
    ``` 
   
## Using Clerk for Authentication 
---------------  
Clerk is used to handle user authentication, sign-up, sign-in, and access control. Follow these steps to ensure Clerk is integrated properly:
1.Sign up for a Clerk account and get your frontend API key and backend API URL from the Clerk dashboard.
2.In the frontend, Clerk is integrated with React using the Clerk React SDK. Ensure the environment variables are set as follows in your .env: 
```bash  
    REACT_APP_CLERK_PUBLISHABLE_KEY=<your-clerk-frontend-api>
    REACT_APP_SIGN_IN_REDIRECT_URL=................
    REACT_APP_SIGN_IN_FALLBACK_REDIRECT_URL=................
  ``` 
3.Wrap your application in the ClerkProvider: 
in my application I put it in root-layout.js but You can put it in index.js 
 ```bash  
import {  Outlet, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';

import Footer from '../components/Footer';

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

// default to /dashboard
const clerkConfig = {
  signInRedirectUrl: process.env.REACT_APP_SIGN_IN_REDIRECT_URL || '/dashboard',
  signInFallbackRedirectUrl: process.env.REACT_APP_SIGN_IN_FALLBACK_REDIRECT_URL || '/dashboard',
};


if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

//This component acts as the root layout(It's a wrapper for the whole app, providing the Clerk context.)
// Ensure no unclosed elements or extra spaces in JSX
export default function RootLayout() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      {...clerkConfig}
    >
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet />  {/* Ensures child routes render correctly */}
        </main>
        <Footer className="flex-none" />
      </div>
    </ClerkProvider>
  );
}
```
4.Use Clerk hooks and components like SignIn, SignUp, and UserButton to implement authentication features in your app:
```bash 
import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return(
    <div className='flex items-center justify-center p-4'>
       <SignIn path="/sign-in" />
    </div>
  )
}
 ```
5.In the backend, use Clerk middleware to secure API routes and authenticate users using the Clerk API.
## Running the Application  
---------------  
1. Run the server (from the server directory):  
    ```bash  
    npm run dev  
    ```  

   Or with Nodemon (if installed):  
    ```bash  
    nodemon server.js  
    ```  

   The backend should be running at http://localhost:4000.  

2. Run the client (from the client directory):  
    ```bash  
    npm run dev  
    ```  

   The frontend should be running at http://localhost:3000.  



## Prisma Commands Cheat Sheet  
---------------  
1. Generate Prisma Client:
     ```bash  
    npx prisma generate    
    ```  
3.Run Migrations:  
 ```bash  
  npx prisma migrate dev --name <migration_name>  
  ``` 
4. Seed Database (optional):
    **To populate the database with some initial data: 
   ```bash  
    npx prisma db seed      
    ```  
5. Prisma Studio (Database Browser):
    **To view and interact with your database: 
   ```bash  
    npx prisma studio        
    ```  
## Contributing  
---------------  
1. Fork the repository.  
2. Create a new branch (`git checkout -b feature-branch`).  
3. Make your changes.  
4. Commit your changes (`git commit -m 'Add some feature'`).  
5. Push to the branch (`git push origin feature-branch`).  
6. Open a pull request.
