// Service worker for Snel Remodeling portal push notifications

self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Snel Remodeling', {
      body: data.body ?? 'You have a new notification.',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: 'snel-contact',
      renotify: true,
      data: { url: data.url ?? '/srsp' },
    })
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/srsp') && 'focus' in client) {
          return client.focus()
        }
      }
      return clients.openWindow(event.notification.data?.url ?? '/srsp')
    })
  )
})
