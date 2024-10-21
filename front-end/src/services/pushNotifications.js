
// Register the service worker
export async function registerServiceWorker() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('Service Worker registered with scope:', registration.scope);
        return registration;
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    } else {
      console.warn('Service Worker or PushManager not supported in this browser.');
    }
  }
  
  // Function to subscribe the user to push notifications
  export async function SubscribeUserToPush(registration) {
    if (!registration) return;
  
    try {
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:  'BE1cSjKp6z_NSDUiAnjIFqvg4ksydWFibnJUtIuCTMJ5_5zBzyRy2Ibuphgidh2cOCovNf17XU2FfFsjYi3nokk', 
      });
  
      console.log('User is subscribed:', subscription);
  
      // Send the subscription object to the backend to store in the database
      await fetch('http://localhost:4000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });
  
      console.log('Subscription saved to the server');
    } catch (error) {
      console.error('Failed to subscribe the user:', error);
    }
  }
  
  

