/**
 * AuraTabs - Ultimate Guitar Importer & Favorites Sync
 * Supports scraping/exporting from https://www.ultimate-guitar.com/user/mytabs
 */

const UG_BOOKMARKLET_CODE = `
(async function() {
  console.log("🎸 AuraTabs: Extracting Ultimate Guitar Favorites...");
  let songs = [];

  // Strategy 1: Check UGAPP global store (contains complete structured data)
  try {
    const storeData = window.UGAPP?.store?.page?.data;
    if (storeData) {
      const items = storeData.tabs || storeData.items || storeData.favorites || [];
      if (items.length > 0) {
        items.forEach(t => {
          songs.push({
            id: 'ug_' + (t.id || Date.now() + Math.random()),
            title: t.song_name || t.songname || t.name || 'Unknown Song',
            artist: t.artist_name || t.artistname || 'Unknown Artist',
            key: t.tonality_name || '',
            capo: t.capo ? t.capo + ' fret' : '',
            url: t.tab_url || t.url || '',
            content: t.content || '',
            favorite: true,
            speed: 30,
            tags: ['Ultimate Guitar', 'Favorites']
          });
        });
      }
    }
  } catch(e) { console.warn("UGAPP store parse attempt:", e); }

  // Strategy 2: Parse DOM links if store was unavailable
  if (songs.length === 0) {
    const tabLinks = document.querySelectorAll('a[href*="/tab/"]');
    tabLinks.forEach(a => {
      const href = a.href;
      const text = a.innerText.trim();
      if (text && !songs.find(s => s.url === href)) {
        const parts = text.split(' - ');
        songs.push({
          id: 'ug_' + Math.random().toString(36).substr(2, 9),
          title: parts.length > 1 ? parts[1].trim() : text,
          artist: parts.length > 1 ? parts[0].trim() : 'Various',
          url: href,
          favorite: true,
          speed: 30,
          tags: ['Ultimate Guitar', 'Favorites']
        });
      }
    });
  }

  if (songs.length === 0) {
    alert("No tabs found. Make sure you are logged into https://www.ultimate-guitar.com/user/mytabs!");
    return;
  }

  // Copy to clipboard
  const jsonStr = JSON.stringify(songs, null, 2);
  try {
    await navigator.clipboard.writeText(jsonStr);
  } catch(err) {}

  // Trigger file download
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const dl = document.createElement('a');
  dl.href = URL.createObjectURL(blob);
  dl.download = 'ug_my_tabs.json';
  dl.click();

  alert("✅ Success! Extracted " + songs.length + " tabs from your Ultimate Guitar Favorites!\\n\\nSaved as 'ug_my_tabs.json' and copied to your clipboard.\\nNow open AuraTabs and click 'Browse JSON File' or paste to load them.");
})();
`.trim();

/**
 * Parse raw Ultimate Guitar tab or text content
 */
function parseUGTextContent(raw) {
  // Check if JSON
  try {
    const json = JSON.parse(raw);
    if (Array.isArray(json)) return json;
    if (json.content || json.tab_view) {
      return [{
        id: 'ug_' + Date.now(),
        title: json.song_name || 'Imported Song',
        artist: json.artist_name || 'Artist',
        key: json.tonality_name || '',
        capo: json.capo ? `${json.capo} fret` : '',
        content: json.content || (json.tab_view && json.tab_view.wiki_tab ? json.tab_view.wiki_tab.content : raw),
        favorite: true,
        speed: 30
      }];
    }
  } catch (e) {
    // Not json, parse as plain tab text
  }

  // Extract metadata if available in headers
  let title = "Imported Tab";
  let artist = "Unknown Artist";
  let capo = "";
  let key = "";

  const lines = raw.split('\n');
  lines.slice(0, 20).forEach(line => {
    if (line.toLowerCase().includes('artist:')) artist = line.split(':')[1].trim();
    if (line.toLowerCase().includes('song:')) title = line.split(':')[1].trim();
    if (line.toLowerCase().includes('capo:')) capo = line.split(':')[1].trim();
    if (line.toLowerCase().includes('key:')) key = line.split(':')[1].trim();
  });

  // Clean UG [ch] [/ch] and [tab] tags
  let cleaned = raw
    .replace(/\[ch\]/gi, '')
    .replace(/\[\/ch\]/gi, '')
    .replace(/\[tab\]/gi, '')
    .replace(/\[\/tab\]/gi, '');

  return [{
    id: 'imported_' + Date.now(),
    title,
    artist,
    key,
    capo,
    content: cleaned,
    favorite: true,
    speed: 30,
    tags: ['Imported']
  }];
}

window.UGImporter = {
  BOOKMARKLET_CODE: UG_BOOKMARKLET_CODE,
  parseUGTextContent
};
