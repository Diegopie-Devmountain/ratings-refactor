const CACHE_NAME = "movie-ratings-cache-v1.5"
const filesToCache = [
  "/offline.html",
]

// * Handle Events
// self is how to reference the sw, think of document in our js env
// just like our all events, we have arg1 = Event TO Listen and arg2 = callback
self.addEventListener("install", (event) => {
  // This will let us handle what to do when installing a sw
  console.log("Service Worker Installed!");

  event.waitUntil(
    // Open Cache (promise)
    caches.open(CACHE_NAME)
    // Use returned cache from promise
    .then(cache => {
      return cache.addAll(filesToCache)
    })
    .catch(error => console.error("On SW Install, caching error: ", error))
  );

  // Demo then add
  self.skipWaiting()
})


self.addEventListener("activate", event => {
  // This will let us handle what to do once it is active and being used
  console.log("Service worker activated");
});