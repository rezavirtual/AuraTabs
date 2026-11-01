# 🎸 AuraTabs - Guitar Chords, Auto-Scroll & YouTube Companion

**AuraTabs** is a responsive, web-based guitar chords and tab reader designed specifically for **iPhone, iPad, and desktop**. It features hands-free smooth auto-scrolling with customizable speed, real-time transposition, interactive guitar chord diagrams, integrated YouTube playback, and a 1-click Ultimate Guitar favorites importer.

---

## ✨ Features

- 📱 **iPhone & iPad Optimized**: Touch-friendly interface, notch/safe-area support, PWA installable ("Add to Home Screen") for a fullscreen native app experience.
- 📜 **Hands-Free Auto-Scroll**:
  - Smooth 60fps variable-speed scrolling (5 to 120 px/sec).
  - Quick presets: **Slow**, **Normal**, **Fast**.
  - Spacebar or tap-to-pause anywhere.
  - Large thumb-friendly floating control bar.
  - Scroll speed is remembered individually per song.
- 💡 **Screen Wake Lock**: Prevents your iPhone or iPad screen from dimming or sleeping while you are playing guitar.
- 🎸 **Interactive Chords & Transposition**:
  - Instant transposition (`+` / `-` semitones) on the fly.
  - Capo indicator with key compensation.
  - Tap ANY chord to view an interactive SVG guitar fretboard diagram showing exact finger placements and open/muted strings.
- 📺 **YouTube Player Integration**:
  - Docked/floating YouTube player right above your chords.
  - Auto-generates matching YouTube search links for the song title and artist.
  - Save custom YouTube videos or acoustic covers per song.
- 📥 **Ultimate Guitar Favorites Importer**:
  - Extract all your saved tabs from `https://www.ultimate-guitar.com/user/mytabs` (for account `rezavirtual@gmail.com`).
  - 1-click browser console bookmarklet or file upload (`ug_my_tabs.json`).
  - Supports direct Ultimate Guitar tab URL import.
- 💾 **Offline Ready & Cloud Storage**:
  - Stores all songs locally in browser storage (IndexedDB / LocalStorage).
  - Works offline with Service Worker caching.
  - Export and import your library anytime as JSON.

---

## 🚀 How to Host on the Web (Free, Anytime Access on iPhone & iPad)

Because AuraTabs is built as a zero-dependency Progressive Web Application (PWA), you can host it for free in less than 2 minutes using any of these top platforms:

### Option A: Netlify Drop (Easiest - 30 Seconds, No Terminal Needed)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Sign in or sign up with your email or GitHub.
3. Drag and drop the entire `c:\AI\TAB` folder into the browser window.
4. Netlify will instantly give you a live URL like `https://reza-guitar-tabs.netlify.app`.
5. Open that URL on your iPhone and iPad!

### Option B: Vercel (1-Click Deployment)
1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New Project** and link your GitHub repository or drag and drop this project directory.
3. Your app is live with SSL at `https://your-app.vercel.app`.

### Option C: GitHub Pages (Free forever)
1. Create a new GitHub repository (e.g. `guitar-tabs`).
2. Upload the files in this folder to the repository.
3. Go to **Settings** > **Pages** > Select branch `main` and root `/` > Click **Save**.
4. Your site will be live at `https://<your-username>.github.io/guitar-tabs/`.

---

## 📲 Installing on iPhone & iPad (Fullscreen App Mode)

1. Open your live website URL in **Safari** on your iPhone or iPad.
2. Tap the **Share** button (the square with an arrow pointing up at the bottom on iPhone or top right on iPad).
3. Scroll down and tap **Add to Home Screen**.
4. Tap **Add**.
5. AuraTabs will now appear as an app icon on your home screen and open without Safari address bars in full-screen mode!

---

## 📥 How to Extract All Chords from Your Ultimate Guitar Account

Since your Ultimate Guitar favorites require authentication (`rezavirtual@gmail.com`), follow these quick steps:

1. On your computer or iPad, open [https://www.ultimate-guitar.com/user/mytabs](https://www.ultimate-guitar.com/user/mytabs) and make sure you are logged in.
2. Open developer tools:
   - On Chrome/Firefox/Edge: Press `F12` (or right-click > **Inspect** > click the **Console** tab).
   - On Safari: Enable the Develop menu in Settings > Show JavaScript Console.
3. In AuraTabs, click **Import UG Tabs** > click **Copy Script**.
4. Paste the script into the Ultimate Guitar console and press **Enter**:
   ```javascript
   (async function() {
     console.log("Extracting Ultimate Guitar Favorites...");
     let songs = [];
     try {
       const storeData = window.UGAPP?.store?.page?.data;
       if (storeData) {
         const items = storeData.tabs || storeData.items || storeData.favorites || [];
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
     } catch(e) {}
     if (songs.length === 0) {
       document.querySelectorAll('a[href*="/tab/"]').forEach(a => {
         const parts = a.innerText.trim().split(' - ');
         songs.push({
           id: 'ug_' + Math.random().toString(36).substr(2, 9),
           title: parts.length > 1 ? parts[1].trim() : a.innerText.trim(),
           artist: parts.length > 1 ? parts[0].trim() : 'Various',
           url: a.href,
           favorite: true,
           speed: 30,
           tags: ['Ultimate Guitar', 'Favorites']
         });
       });
     }
     const jsonStr = JSON.stringify(songs, null, 2);
     try { await navigator.clipboard.writeText(jsonStr); } catch(e){}
     const blob = new Blob([jsonStr], { type: 'application/json' });
     const dl = document.createElement('a');
     dl.href = URL.createObjectURL(blob);
     dl.download = 'ug_my_tabs.json';
     dl.click();
     alert("✅ Extracted " + songs.length + " tabs! File downloaded as ug_my_tabs.json");
   })();
   ```
5. It will automatically download `ug_my_tabs.json`.
6. Go back to **AuraTabs**, click **Import UG Tabs** > **Browse JSON File**, and select the downloaded file. All your favorites will be instantly imported into AuraTabs!

---

## 🛠️ Testing Locally

You can open `index.html` directly in any web browser (Safari, Chrome, Edge) by double-clicking it.
