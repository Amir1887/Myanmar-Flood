import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";


// Import the layouts
import DashboardLayout from "./layouts/dashboard-layout";
import RootLayout from "./layouts/root-layout";

import { UsereProvider } from "./context/UserContext";
import HomePage from "./pages/General/HomePage";
import AboutPage from "./pages/General/AboutPage";
import ContactPage from "./pages/General/ContactPage";
import SignInPage from "./pages/General/SignInPage";
import SignUpPage from "./pages/General/SignUpPage";
import ProfilePage from "./pages/ProfilePage"




// Set up the router
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Public Routes (no need for sign up or sign in)
      { path: "/", element: <HomePage /> }, // Root-level route
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },

      // Dashboard Layout with nested routes (needing login)
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { path: "home", element: <HomePage /> },
          { path: 'profile', element: <ProfilePage /> },  // Accessible as /dashboard/profile
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);


