const CACHE_NAME = "tyrone-portfolio-v1";
const OFFLINE_URL = new URL("offline.html", self.registration.scope).href;

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll([
                OFFLINE_URL,
                new URL("pictures/000.jpeg", self.registration.scope).href
            ]))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key =>
                    key.startsWith("tyrone-portfolio-") &&
                    key !== CACHE_NAME
                ).map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    const request = event.request;

    if (request.method !== "GET") return;

    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request).catch(async () =>
                await caches.match(OFFLINE_URL)
            )
        );
        return;
    }

    if (new URL(request.url).origin === self.location.origin) {
        event.respondWith(
            caches.match(request).then(cached => {
                if (cached) return cached;

                return fetch(request).then(response => {
                    if (response.ok) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => cache.put(request, copy));
                    }
                    return response;
                });
            })
        );
    }
});
