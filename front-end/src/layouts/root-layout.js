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

