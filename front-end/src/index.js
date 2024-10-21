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
import UserForm from "./pages/User/UserForm";
import FloodForecast from "./pages/FloodData/FloodForecast";
import FloodMap from "./pages/FloodData/FloodMap/FloodMap";
import WeatherComponent from "./pages/Weather/WeatherComponent";
import { SearchProvider } from "./context/SearchContext";
import { UserLocationProvider } from "./context/UserLocationContext";
import { registerServiceWorker, SubscribeUserToPush } from "./services/pushNotifications";






// Set up the router
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // Public Routes (no need for sign up or sign in)
      { path: "/", element: (
        <UserLocationProvider>
      <HomePage />
      </UserLocationProvider>
    ) }, // Root-level route
      { path: "/contact", element: <ContactPage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },

      // Dashboard Layout with nested routes (needing login)
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { path: "home", element:(
            <UserLocationProvider>
             <HomePage /> 
             </UserLocationProvider>
            )},
          { path: 'profile', element: (
            <UsereProvider>
          <ProfilePage />
          </UsereProvider>
        )},  // Accessible as /dashboard/profile
          { path: 'user-form', element: (
          <UsereProvider>
          <UserForm /> 
          </UsereProvider>
        )},  // Accessible as /dashboard/profile
        { path: "flood", element: <FloodForecast /> },
        { path: "flood-map", element:(
           <SearchProvider>
              <FloodMap /> 
           </SearchProvider>
          )},
        { path: "weather", element:(
           <SearchProvider>
              <WeatherComponent />
           </SearchProvider>
          )},
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



// Register service worker and subscribe user to push notifications
// Register the service worker ( should be placed in  main entry point file)
// placed at the bottom of index.js to ensure that the app is fully initialized before the service worker is registered.
registerServiceWorker().then(SubscribeUserToPush);