// This game moved into GameHub (/momahjong/). Phones that still have the old offline helper
// fetch this file as an update: it deletes the old saved copy of the game, steps aside, and
// sends the open page to the new game. GameHub's caches and saves are left alone.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
    event.waitUntil((async () => {
        const names = await caches.keys();
        await Promise.all(names.filter((n) => n.startsWith('jade-mahjong-')).map((n) => caches.delete(n)));
        await self.registration.unregister();
        for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate('/momahjong/');
    })());
});
