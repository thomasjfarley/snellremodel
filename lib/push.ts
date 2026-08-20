import webpush from 'web-push'
import { getCloudflareContext } from '@opennextjs/cloudflare'

const VAPID_PUBLIC_KEY = 'BC6HVYbO9t2_nCnPwt_BCogNul4UO_FzEkUNQ_s8lvrNmYQiiHnYV4SKwf39DuH3B3VD8xLUjAyacUo6jTqep7c'

type PushPayload = {
  title: string
  body: string
  url?: string
}

export async function sendPushNotifications(payload: PushPayload) {
  try {
    const ctx = await getCloudflareContext({ async: true })
    const env = ctx.env as Record<string, unknown>
    const db = env.DB as D1Database | undefined
    const vapidPrivateKey = env.VAPID_PRIVATE_KEY as string | undefined

    if (!db || !vapidPrivateKey) {
      console.warn('[push] Missing DB or VAPID_PRIVATE_KEY — skipping push')
      return
    }

    webpush.setVapidDetails('mailto:snelremodeling@gmail.com', VAPID_PUBLIC_KEY, vapidPrivateKey)

    const { results } = await db
      .prepare('SELECT endpoint, p256dh, auth FROM push_subscriptions')
      .all<{ endpoint: string; p256dh: string; auth: string }>()

    if (results.length === 0) return

    await Promise.allSettled(
      results.map((sub) =>
        webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          JSON.stringify(payload)
        )
      )
    )
  } catch (err) {
    console.error('[push] Failed to send push notifications:', err)
  }
}
