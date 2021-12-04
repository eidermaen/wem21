const CACHE_NAME = 'WEM_JITTER2S_PWA';
const URLS_TO_CACHE = [
	'./index.html',
	'./js/*',
	'./js/*',
	'./css/*',
	'./favicon.ico'
]

self.addEventListener('install', event => {
	console.log('Inside the install hook');

	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => {
				cache.addAll(URLS_TO_CACHE)
			})
	)
});

self.addEventListener('activate', event => {
	console.log('SW now ready to handle fetches!');
});


self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request)
			.then(r => {
				return r || fetch(event.request).then((response) => {
					return caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, response.clone());
						return response;
					});
				});
			})
	)
})
