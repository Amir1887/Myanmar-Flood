self.addEventListener("push", (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon,
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

async function subscribeUser() {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BE1cSjKp6z_NSDUiAnjIFqvg4ksydWFibnJUtIuCTMJ5_5zBzyRy2Ibuphgidh2cOCovNf17XU2FfFsjYi3nokk',
  });

  // Send the subscription object to the backend to store
  await fetch("http://localhost:4000/api/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });
}

if (Notification.permission === "default") {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      subscribeUser();
    }
  });
}
