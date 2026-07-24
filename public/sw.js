const CACHE_NAME = "babushka-cache-v2";

const PRECACHE_URLS = [
  "/",
  "/stats",
  "/vocabulary",
  "/recipes",
  "/manifest.json",
];

const STATIC_ASSET_PATTERNS = [
  /\/_next\/static\/.*/,
  /\/icons\/.*/,
  /\/assets\/.*/,
  /\/favicon\.ico$/,
  /\/.*\.(css|js)$/,
];

const API_NEWS_PATTERN = /^\/api\/news/;

function isNavigationRequest(request) {
  return request.mode === "navigate";
}

function isApiNewsRequest(url) {
  return API_NEWS_PATTERN.test(url.pathname);
}

function isStaticAsset(url) {
  return STATIC_ASSET_PATTERNS.some((p) => p.test(url.pathname));
}

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

async function networkFirstCacheFallback(request, cacheKey) {
  try {
    const response = await fetch(request);
    if (response.ok || response.type === "opaqueredirect") {
      const clone = response.clone();
      const cache = await caches.open(CACHE_NAME);
      cache.put(cacheKey || request, clone);
    }
    return response;
  } catch {
    const cached = await caches.match(cacheKey || request);
    return cached || Response.error();
  }
}

async function cacheFirstWithFallback(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const clone = response.clone();
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, clone);
    }
    return response;
  } catch {
    return Response.error();
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {
        // Some pages may not be available at install time, that's fine
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (!isSameOrigin(url)) return;

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstWithFallback(request));
    return;
  }

  if (isApiNewsRequest(url)) {
    event.respondWith(networkFirstCacheFallback(request));
    return;
  }

  if (isNavigationRequest(request)) {
    event.respondWith(networkFirstCacheFallback(request, "/"));
    return;
  }
});
