self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: 'MaFiAnGo', body: 'Masz nowe powiadomienie' };
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'MaFiAnGo 🔔', {
      body: data.body || 'Sprawdź, co nowego w rodzinie!',
      icon: './ikona-192.png',
      badge: './ikona-192.png',
      data: { url: './index.html' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || './index.html')
  );
});
