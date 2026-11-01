/**
 * AuraTabs - Main Application Logic
 */

// Starter library with popular acoustic/rock classics
const DEFAULT_SONGS = [
  {
    id: 'song_hotel_california',
    title: 'Hotel California',
    artist: 'Eagles',
    key: 'Bm',
    capo: '7th fret',
    speed: 28,
    youtube: 'https://www.youtube.com/watch?v=09839DpTctU',
    favorite: true,
    tags: ['Rock', 'Acoustic', 'Favorites'],
    content: `[Intro]
Am  E7  G  D  F  C  Dm  E7

[Verse 1]
Am                          E7
On a dark desert highway, cool wind in my hair
G                         D
Warm smell of colitas, rising up through the air
F                         C
Up ahead in the distance, I saw a shimmering light
Dm
My head grew heavy and my sight grew dim
E7
I had to stop for the night

[Verse 2]
Am                               E7
There she stood in the doorway; I heard the mission bell
G
And I was thinking to myself
             D
This could be Heaven or this could be Hell
F                           C
Then she lit up a candle and she showed me the way
Dm
There were voices down the corridor,
E7
I thought I heard them say...

[Chorus]
F                          C
Welcome to the Hotel California
        E7                                Am
Such a lovely place (such a lovely place), such a lovely face
F                               C
Plenty of room at the Hotel California
    Dm                                     E7
Any time of year (any time of year) you can find it here`
  },
  {
    id: 'song_stand_by_me',
    title: 'Stand By Me',
    artist: 'Ben E. King',
    key: 'A',
    capo: '2nd fret',
    speed: 32,
    youtube: 'https://www.youtube.com/watch?v=hwZNL7QVJjE',
    favorite: true,
    tags: ['Acoustic', 'Easy', 'Favorites'],
    content: `[Intro]
G   Em   C   D   G

[Verse 1]
             G                      Em
When the night has come and the land is dark
         C           D              G
And the moon is the only light we'll see
       G                         Em
No I won't be afraid, no I won't be afraid
          C            D           G
Just as long as you stand, stand by me

[Chorus]
                 G                  Em
So darling, darling stand by me, oh stand by me
    C         D         G
Oh stand, stand by me, stand by me

[Verse 2]
       G                                Em
If the sky that we look upon should tumble and fall
        C              D             G
Or the mountain should crumble to the sea
        G                        Em
I won't cry, I won't cry, no I won't shed a tear
         C           D             G
Just as long as you stand, stand by me`
  },
  {
    id: 'song_hallelujah',
    title: 'Hallelujah',
    artist: 'Leonard Cohen / Jeff Buckley',
    key: 'C',
    capo: '5th fret',
    speed: 25,
    youtube: 'https://www.youtube.com/watch?v=y8AWFf7EAc4',
    favorite: true,
    tags: ['Acoustic', 'Favorites'],
    content: `[Intro]
C   Am   C   Am

[Verse 1]
     C                Am
I've heard there was a secret chord
     C                   Am
That David played, and it pleased the Lord
    F                G               C       G
But you don't really care for music, do you?
   C                   F           G
It goes like this, the fourth, the fifth
    Am              F
The minor fall, the major lift
    G                E7          Am
The baffled king composing Hallelujah

[Chorus]
      F           Am          F           C    G   C
Hallelujah, Hallelujah, Hallelujah, Hallelu-u-u-u-jah`
  },
  {
    id: 'song_wonderwall',
    title: 'Wonderwall',
    artist: 'Oasis',
    key: 'Em',
    capo: '2nd fret',
    speed: 35,
    youtube: 'https://www.youtube.com/watch?v=6hzrDeceEKc',
    favorite: false,
    tags: ['Rock', 'Acoustic'],
    content: `[Intro]
Em7   G   Dsus4   A7sus4  (x4)

[Verse 1]
Em7            G
Today is gonna be the day
             Dsus4                A7sus4
That they're gonna throw it back to you
Em7             G
By now you should've somehow
        Dsus4             A7sus4
Realized what you gotta do
Em7                  G        Dsus4          A7sus4
I don't believe that anybody feels the way I do
             Cadd9   Dsus4   A7sus4
About you now

[Chorus]
           Cadd9    Em7    G
Because maybe
       Em7                Cadd9     Em7   G
You're gonna be the one that saves me
    Em7     Cadd9    Em7   G
And after all
          Em7    Cadd9    Em7   G   Em7
You're my wonderwall`
  }
];

class AuraTabsApp {
  constructor() {
    this.songs = [];
    this.currentSong = null;
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.transposeSemitones = 0;
    this.fontSize = 15; // in px

    // Auto-scroll variables
    this.isScrolling = false;
    this.scrollSpeed = 30; // px per second
    this.scrollAnimId = null;
    this.lastScrollTime = null;
    this.wakeLock = null;

    this.initDOM();
    this.loadLibrary();
    this.bindEvents();
    this.initPWA();
  }

  initDOM() {
    // Views
    this.libraryView = document.getElementById('library-view');
    this.playerView = document.getElementById('player-view');
    this.btnBack = document.getElementById('btn-back');

    // Search & Filter elements
    this.searchInput = document.getElementById('search-input');
    this.btnClearSearch = document.getElementById('btn-clear-search');
    this.songsContainer = document.getElementById('songs-container');
    this.emptyState = document.getElementById('empty-state');
    this.filterTabs = document.querySelectorAll('.filter-tab');
    this.countAll = document.getElementById('count-all');
    this.countFavs = document.getElementById('count-favs');

    // Player elements
    this.songTitle = document.getElementById('song-title');
    this.songArtist = document.getElementById('song-artist');
    this.songFavBtn = document.getElementById('song-fav-btn');
    this.capoBadge = document.getElementById('capo-badge');
    this.capoValue = document.getElementById('capo-value');
    this.chordContainer = document.getElementById('chord-sheet-container');
    this.chordContent = document.getElementById('chord-sheet-content');

    // Controls
    this.transposeVal = document.getElementById('transpose-val');
    this.btnTransposeUp = document.getElementById('btn-transpose-up');
    this.btnTransposeDown = document.getElementById('btn-transpose-down');
    this.btnFontInc = document.getElementById('btn-font-increase');
    this.btnFontDec = document.getElementById('btn-font-decrease');

    // YouTube Drawer
    this.btnToggleYouTube = document.getElementById('btn-toggle-youtube');
    this.youtubeDrawer = document.getElementById('youtube-drawer');
    this.youtubeIframe = document.getElementById('youtube-iframe');
    this.youtubeUrlInput = document.getElementById('youtube-url-input');
    this.btnSaveYtUrl = document.getElementById('btn-save-yt-url');
    this.youtubeExternalLink = document.getElementById('youtube-external-link');

    // Auto-scroll controls
    this.btnToggleScroll = document.getElementById('btn-toggle-scroll');
    this.scrollIconPlay = document.getElementById('scroll-icon-play');
    this.scrollIconPause = document.getElementById('scroll-icon-pause');
    this.speedSlider = document.getElementById('speed-slider');
    this.speedIndicator = document.getElementById('speed-indicator');
    this.scrollPercentage = document.getElementById('scroll-percentage');
    this.scrollStateBadge = document.getElementById('scroll-state-badge');
    this.btnScrollTop = document.getElementById('btn-scroll-top');
    this.btnSpeedSlow = document.getElementById('btn-speed-slow');
    this.btnSpeedMed = document.getElementById('btn-speed-med');
    this.btnSpeedFast = document.getElementById('btn-speed-fast');

    // Modals
    this.ugModal = document.getElementById('ug-modal');
    this.btnImportUg = document.getElementById('btn-import-ug');
    this.btnBannerImport = document.getElementById('btn-banner-import');
    this.btnCloseUgModal = document.getElementById('btn-close-ug-modal');
    this.extractorCode = document.getElementById('extractor-code');
    this.btnCopyExtractorCode = document.getElementById('btn-copy-extractor-code');
    this.ugFileInput = document.getElementById('ug-file-input');
    this.btnFetchUgUrl = document.getElementById('btn-fetch-ug-url');
    this.ugUrlInput = document.getElementById('ug-url-input');
    this.ugRawPaste = document.getElementById('ug-raw-paste');
    this.btnImportRawPaste = document.getElementById('btn-import-raw-paste');

    // Tab buttons in UG modal
    this.tabBtnBookmarklet = document.getElementById('tab-btn-bookmarklet');
    this.tabBtnPaste = document.getElementById('tab-btn-paste');
    this.tabContentBookmarklet = document.getElementById('tab-content-bookmarklet');
    this.tabContentPaste = document.getElementById('tab-content-paste');

    // Song Editor Modal
    this.songEditorModal = document.getElementById('song-editor-modal');
    this.btnAddSong = document.getElementById('btn-add-song');
    this.btnEditSong = document.getElementById('btn-edit-song');
    this.btnCloseEditorModal = document.getElementById('btn-close-editor-modal');
    this.btnCancelEditor = document.getElementById('btn-cancel-editor');
    this.btnSaveSong = document.getElementById('btn-save-song');
    this.btnDeleteSong = document.getElementById('btn-delete-song');
    this.editTitle = document.getElementById('edit-title');
    this.editArtist = document.getElementById('edit-artist');
    this.editKey = document.getElementById('edit-key');
    this.editCapo = document.getElementById('edit-capo');
    this.editSpeed = document.getElementById('edit-speed');
    this.editYoutube = document.getElementById('edit-youtube');
    this.editContent = document.getElementById('edit-content');

    // Chord Diagram Modal
    this.chordDiagramModal = document.getElementById('chord-diagram-modal');
    this.diagramChordName = document.getElementById('diagram-chord-name');
    this.diagramSvgContainer = document.getElementById('diagram-svg-container');
    this.diagramChordFingers = document.getElementById('diagram-chord-fingers');
    this.btnCloseChordDiagram = document.getElementById('btn-close-chord-diagram');

    // Toast
    this.toast = document.getElementById('toast');
    this.toastMessage = document.getElementById('toast-message');

    // Populate Bookmarklet Code snippet
    if (this.extractorCode && window.UGImporter) {
      this.extractorCode.value = window.UGImporter.BOOKMARKLET_CODE;
    }
  }

  loadLibrary() {
    const defaultList = window.UG_DEFAULT_SONGS || DEFAULT_SONGS;
    const CURRENT_VERSION = 'v3_fix_sharps_2026';
    const savedVer = localStorage.getItem('auratabs_version');

    if (savedVer !== CURRENT_VERSION) {
      // Force upgrade to the 100% original full Ultimate Guitar chords
      this.songs = [...defaultList];
      localStorage.setItem('auratabs_version', CURRENT_VERSION);
      this.saveLibrary();
    } else {
      const saved = localStorage.getItem('auratabs_songs');
      if (saved) {
        try {
          this.songs = JSON.parse(saved);
        } catch (e) {
          this.songs = [...defaultList];
        }
      } else {
        this.songs = [...defaultList];
        this.saveLibrary();
      }
    }
    this.renderSongsList();
    this.updateCounters();
  }

  saveLibrary() {
    localStorage.setItem('auratabs_songs', JSON.stringify(this.songs));
    this.updateCounters();
  }

  updateCounters() {
    this.countAll.textContent = this.songs.length;
    this.countFavs.textContent = this.songs.filter(s => s.favorite).length;
  }

  bindEvents() {
    // Theme Toggle
    this.btnThemeToggle = document.getElementById('btn-theme-toggle');
    if (this.btnThemeToggle) {
      this.btnThemeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        this.btnThemeToggle.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}" class="w-4 h-4"></i>`;
        lucide.createIcons({ root: this.btnThemeToggle });
      });
    }

    // Navigation
    this.btnBack.addEventListener('click', () => this.showLibraryView());

    // Search & Filter
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.btnClearSearch.classList.toggle('hidden', !this.searchQuery);
      this.renderSongsList();
    });

    this.btnClearSearch.addEventListener('click', () => {
      this.searchInput.value = '';
      this.searchQuery = '';
      this.btnClearSearch.classList.add('hidden');
      this.renderSongsList();
    });

    this.filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.filterTabs.forEach(t => {
          t.classList.remove('active', 'bg-indigo-600', 'text-white');
          t.classList.add('bg-slate-800/80', 'text-slate-300');
        });
        tab.classList.add('active', 'bg-indigo-600', 'text-white');
        tab.classList.remove('bg-slate-800/80', 'text-slate-300');
        this.currentFilter = tab.dataset.filter;
        this.renderSongsList();
      });
    });

    // Favorite toggle inside player
    this.songFavBtn.addEventListener('click', () => {
      if (!this.currentSong) return;
      this.currentSong.favorite = !this.currentSong.favorite;
      this.saveLibrary();
      this.updatePlayerFavState();
      this.showToast(this.currentSong.favorite ? 'Added to Favourites ★' : 'Removed from Favourites');
    });

    // Transpose
    this.btnTransposeUp.addEventListener('click', () => this.adjustTranspose(1));
    this.btnTransposeDown.addEventListener('click', () => this.adjustTranspose(-1));

    // Font size
    this.btnFontInc.addEventListener('click', () => {
      this.fontSize = Math.min(26, this.fontSize + 2);
      this.applyFontSize();
    });
    this.btnFontDec.addEventListener('click', () => {
      this.fontSize = Math.max(12, this.fontSize - 2);
      this.applyFontSize();
    });

    // YouTube Drawer
    this.btnToggleYouTube.addEventListener('click', () => {
      this.youtubeDrawer.classList.toggle('hidden');
    });

    this.btnSaveYtUrl.addEventListener('click', () => {
      if (!this.currentSong) return;
      const url = this.youtubeUrlInput.value.trim();
      this.currentSong.youtube = url;
      this.saveLibrary();
      this.loadYouTubeVideo(url);
      this.showToast('YouTube track saved!');
    });

    // Auto-Scroll Controls
    const handleScrollToggle = (e) => {
      if (e) e.preventDefault();
      this.toggleAutoScroll();
    };
    this.btnToggleScroll.addEventListener('click', handleScrollToggle);
    this.btnToggleScroll.addEventListener('touchend', handleScrollToggle);
    
    // Tap anywhere on chord container to pause if currently scrolling
    this.chordContainer.addEventListener('click', (e) => {
      if (this.isScrolling && !e.target.closest('.chord-badge')) {
        this.stopAutoScroll();
      }
    });

    // Update scroll percentage indicator on manual scroll
    this.chordContainer.addEventListener('scroll', () => {
      this.updateScrollProgress();
    });

    // Speed Slider & Presets
    this.speedSlider.addEventListener('input', (e) => {
      this.setScrollSpeed(parseInt(e.target.value, 10));
    });

    this.btnSpeedSlow.addEventListener('click', () => this.setScrollSpeed(18));
    this.btnSpeedMed.addEventListener('click', () => this.setScrollSpeed(35));
    this.btnSpeedFast.addEventListener('click', () => this.setScrollSpeed(60));

    this.btnScrollTop.addEventListener('click', () => {
      this.stopAutoScroll();
      this.chordContainer.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Keyboard Shortcuts (Spacebar toggle scroll)
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        this.toggleAutoScroll();
      }
    });

    // UG Importer Modal
    const openUgModal = () => {
      this.ugModal.classList.remove('hidden');
      this.ugModal.classList.add('flex');
    };
    this.btnImportUg.addEventListener('click', openUgModal);
    this.btnBannerImport.addEventListener('click', openUgModal);

    this.btnCloseUgModal.addEventListener('click', () => {
      this.ugModal.classList.add('hidden');
      this.ugModal.classList.remove('flex');
    });

    // Tab switcher in UG Modal
    this.tabBtnBookmarklet.addEventListener('click', () => {
      this.tabBtnBookmarklet.classList.add('border-indigo-500', 'text-indigo-400');
      this.tabBtnBookmarklet.classList.remove('border-transparent', 'text-slate-400');
      this.tabBtnPaste.classList.remove('border-indigo-500', 'text-indigo-400');
      this.tabBtnPaste.classList.add('border-transparent', 'text-slate-400');
      this.tabContentBookmarklet.classList.remove('hidden');
      this.tabContentPaste.classList.add('hidden');
    });

    this.tabBtnPaste.addEventListener('click', () => {
      this.tabBtnPaste.classList.add('border-indigo-500', 'text-indigo-400');
      this.tabBtnPaste.classList.remove('border-transparent', 'text-slate-400');
      this.tabBtnBookmarklet.classList.remove('border-indigo-500', 'text-indigo-400');
      this.tabBtnBookmarklet.classList.add('border-transparent', 'text-slate-400');
      this.tabContentPaste.classList.remove('hidden');
      this.tabContentBookmarklet.classList.add('hidden');
    });

    // Copy Extractor script button
    this.btnCopyExtractorCode.addEventListener('click', () => {
      if (this.extractorCode) {
        navigator.clipboard.writeText(this.extractorCode.value);
        this.showToast('Extractor script copied to clipboard!');
      }
    });

    // UG File Input (.json upload)
    this.ugFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const songs = JSON.parse(event.target.result);
          this.importSongsBatch(songs);
        } catch (err) {
          alert('Could not parse JSON file. Please check format.');
        }
      };
      reader.readAsText(file);
    });

    // Raw paste importer
    this.btnImportRawPaste.addEventListener('click', () => {
      const raw = this.ugRawPaste.value.trim();
      if (!raw) return;
      const parsed = window.UGImporter.parseUGTextContent(raw);
      this.importSongsBatch(parsed);
      this.ugRawPaste.value = '';
    });

    // Fetch UG URL handler
    this.btnFetchUgUrl.addEventListener('click', async () => {
      const url = this.ugUrlInput.value.trim();
      if (!url) return;
      // Pre-fill editor with song from URL
      this.openSongEditor({
        title: url.split('/').pop().replace(/-/g, ' ').replace(/\d+$/, '').trim() || 'New Tab',
        artist: 'Ultimate Guitar',
        url: url,
        content: `[Intro]\n// Chords imported from ${url}\n\n[Verse 1]\n`
      });
      this.ugModal.classList.add('hidden');
    });

    // Song Editor Modal
    this.btnAddSong.addEventListener('click', () => this.openSongEditor());
    this.btnEditSong.addEventListener('click', () => {
      if (this.currentSong) this.openSongEditor(this.currentSong);
    });
    this.btnCloseEditorModal.addEventListener('click', () => this.closeSongEditor());
    this.btnCancelEditor.addEventListener('click', () => this.closeSongEditor());
    this.btnSaveSong.addEventListener('click', () => this.saveSongFromEditor());
    this.btnDeleteSong.addEventListener('click', () => this.deleteCurrentSong());

    // Chord Diagram Modal Close
    this.btnCloseChordDiagram.addEventListener('click', () => {
      this.chordDiagramModal.classList.add('hidden');
      this.chordDiagramModal.classList.remove('flex');
    });
  }

  // --- RENDERING LIBRARY ---

  renderSongsList() {
    this.songsContainer.innerHTML = '';
    
    let filtered = this.songs.filter(song => {
      // Filter tab
      if (this.currentFilter === 'favorites' && !song.favorite) return false;
      if (this.currentFilter === 'acoustic' && !(song.tags && song.tags.includes('Acoustic'))) return false;
      if (this.currentFilter === 'rock' && !(song.tags && song.tags.includes('Rock'))) return false;
      if (this.currentFilter === 'easy' && !(song.tags && song.tags.includes('Easy'))) return false;

      // Search query
      if (this.searchQuery) {
        const titleMatch = song.title.toLowerCase().includes(this.searchQuery);
        const artistMatch = song.artist.toLowerCase().includes(this.searchQuery);
        const contentMatch = song.content && song.content.toLowerCase().includes(this.searchQuery);
        return titleMatch || artistMatch || contentMatch;
      }
      return true;
    });

    if (filtered.length === 0) {
      this.emptyState.classList.remove('hidden');
      return;
    }

    this.emptyState.classList.add('hidden');

    filtered.forEach(song => {
      const card = document.createElement('div');
      card.className = 'group bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between gap-3 relative';
      
      const favClass = song.favorite ? 'text-amber-400 fill-amber-400' : 'text-slate-600 hover:text-amber-400';

      card.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <div class="min-w-0">
            <h3 class="font-bold text-slate-100 group-hover:text-indigo-300 transition-colors truncate text-sm sm:text-base">${song.title}</h3>
            <p class="text-xs text-indigo-400 font-medium truncate mt-0.5">${song.artist}</p>
          </div>
          <button class="btn-card-fav p-1.5 -mr-1.5 -mt-1.5 rounded-lg transition-colors z-10" data-id="${song.id}">
            <i data-lucide="star" class="w-4 h-4 ${favClass}"></i>
          </button>
        </div>

        <div class="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
          <div class="flex items-center gap-2">
            ${song.key ? `<span class="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-indigo-300 font-semibold">Key: ${song.key}</span>` : ''}
            ${song.capo ? `<span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px]">Capo ${song.capo}</span>` : ''}
          </div>
          ${song.youtube ? `
            <span class="flex items-center gap-1 text-[11px] text-red-400 font-medium">
              <i data-lucide="youtube" class="w-3.5 h-3.5"></i> Video
            </span>` : ''}
        </div>
      `;

      // Open song on click
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-card-fav')) {
          e.stopPropagation();
          song.favorite = !song.favorite;
          this.saveLibrary();
          this.renderSongsList();
          this.showToast(song.favorite ? 'Added to Favourites ★' : 'Removed from Favourites');
          return;
        }
        this.openSong(song);
      });

      this.songsContainer.appendChild(card);
    });

    lucide.createIcons({ root: this.songsContainer });
  }

  // --- OPEN & VIEW SONG ---

  openSong(song) {
    this.currentSong = song;
    this.transposeSemitones = 0;
    this.transposeVal.textContent = '0';
    this.scrollSpeed = song.speed || 30;
    this.speedSlider.value = this.scrollSpeed;
    this.speedIndicator.textContent = this.scrollSpeed;

    this.songTitle.textContent = song.title;
    this.songArtist.textContent = song.artist;
    this.updatePlayerFavState();

    if (song.capo) {
      this.capoBadge.classList.remove('hidden');
      this.capoValue.textContent = song.capo;
    } else {
      this.capoBadge.classList.add('hidden');
    }

    // Configure YouTube track
    this.loadYouTubeVideo(song.youtube);

    // Render Chords & Lyrics
    this.renderChordSheet();

    // Switch View
    this.libraryView.classList.add('hidden');
    this.playerView.classList.remove('hidden');
    this.btnBack.classList.remove('hidden');

    // Reset scroll & request wake lock
    this.stopAutoScroll();
    this.chordContainer.scrollTop = 0;
    this.requestWakeLock();
    this.updateScrollProgress();

    // Update Lucide icons
    lucide.createIcons({ root: this.playerView });
  }

  showLibraryView() {
    this.stopAutoScroll();
    this.releaseWakeLock();
    this.playerView.classList.add('hidden');
    this.btnBack.classList.add('hidden');
    this.libraryView.classList.remove('hidden');
    this.renderSongsList();
  }

  updatePlayerFavState() {
    if (!this.currentSong) return;
    const isFav = this.currentSong.favorite;
    const starIcon = this.songFavBtn.querySelector('i');
    if (starIcon) {
      if (isFav) {
        starIcon.classList.add('text-amber-400', 'fill-amber-400');
        starIcon.classList.remove('text-slate-500');
      } else {
        starIcon.classList.remove('text-amber-400', 'fill-amber-400');
        starIcon.classList.add('text-slate-500');
      }
    }
  }

  // --- CHORD RENDERING & TRANSPOSITION ---

  renderChordSheet() {
    if (!this.currentSong) return;
    const rawContent = this.currentSong.content || '';
    const lines = rawContent.split('\n');
    let html = '';

    lines.forEach(line => {
      const trimmed = line.trim();

      // Section Header e.g. [Chorus], [Verse 1]
      if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
        const sectionName = trimmed.slice(1, -1);
        html += `<div class="section-header">${sectionName}</div>\n`;
        return;
      }

      // Comment or metadata line
      if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
        html += `<div class="comment-line">${line}</div>\n`;
        return;
      }

      // Check if line contains chords (standard chord detector)
      if (this.isChordLine(line)) {
        html += `<div class="tab-line">${this.formatChordLine(line)}</div>\n`;
      } else {
        html += `<div class="tab-line text-slate-200">${line || '&nbsp;'}</div>\n`;
      }
    });

    this.chordContent.innerHTML = html;
    this.applyFontSize();

    // Attach click listeners to all chord badges to open fretboard popup
    this.chordContent.querySelectorAll('.chord-badge').forEach(badge => {
      badge.addEventListener('click', (e) => {
        e.stopPropagation();
        const chordName = badge.dataset.chord;
        this.openChordDiagram(chordName);
      });
    });
  }

  isChordLine(line) {
    if (!line.trim()) return false;
    // Split line into tokens
    const tokens = line.trim().split(/\s+/);
    if (tokens.length === 0) return false;

    // Pattern for standard guitar chord notation
    const chordRegex = /^[A-G][#b]?(m|maj|min|dim|aug|sus|add|M)?[0-9]?((\/|-)[A-G][#b]?)?$/;
    let chordCount = 0;

    for (const token of tokens) {
      if (chordRegex.test(token)) {
        chordCount++;
      }
    }

    // If at least 50% of words are chords or contains 1+ valid chords
    return (chordCount >= 1 && (chordCount / tokens.length) >= 0.5) || chordCount >= 2;
  }

  formatChordLine(line) {
    // Regex that accurately matches sharps (#) and flats (b) without splitting at word boundary \b
    const chordRegex = /\b([A-G][#b]?(?:m|maj|min|dim|aug|sus|add|M)?[0-9]?(?:[\/-][A-G][#b]?)?)(?!\w|[#b])/g;
    
    return line.replace(chordRegex, (match) => {
      const transposed = window.AuraChords.transposeChord(match, this.transposeSemitones);
      return `<span class="chord-badge" data-chord="${transposed}">${transposed}</span>`;
    });
  }

  adjustTranspose(delta) {
    this.transposeSemitones += delta;
    this.transposeVal.textContent = (this.transposeSemitones > 0 ? '+' : '') + this.transposeSemitones;
    this.renderChordSheet();
  }

  applyFontSize() {
    this.chordContainer.style.fontSize = `${this.fontSize}px`;
  }

  // --- CHORD DIAGRAM POPUP ---

  openChordDiagram(chordName) {
    this.diagramChordName.textContent = chordName;
    const svg = window.AuraChords.renderChordSVG(chordName);
    this.diagramSvgContainer.innerHTML = svg;

    const data = window.AuraChords.GUITAR_CHORDS[chordName];
    if (data && data.frets) {
      const fretStr = data.frets.map(f => f === -1 ? 'x' : f).join(' ');
      this.diagramChordFingers.textContent = `Strings (E A D G B e): ${fretStr}`;
    } else {
      this.diagramChordFingers.textContent = 'Fretboard guide';
    }

    this.chordDiagramModal.classList.remove('hidden');
    this.chordDiagramModal.classList.add('flex');
    lucide.createIcons({ root: this.chordDiagramModal });
  }

  // --- AUTO-SCROLL ENGINE ---

  toggleAutoScroll() {
    if (this.isScrolling) {
      this.stopAutoScroll();
    } else {
      this.startAutoScroll();
    }
  }

  startAutoScroll() {
    this.isScrolling = true;
    document.body.classList.add('is-scrolling');
    this.scrollIconPlay.classList.add('hidden');
    this.scrollIconPause.classList.remove('hidden');

    this.scrollStateBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Scrolling`;
    this.scrollStateBadge.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300';

    this.currentScrollPos = this.chordContainer.scrollTop;
    this.lastScrollTime = performance.now();
    this.scrollAnimId = requestAnimationFrame(this.scrollStep.bind(this));
    this.requestWakeLock();
  }

  stopAutoScroll() {
    this.isScrolling = false;
    document.body.classList.remove('is-scrolling');
    this.scrollIconPlay.classList.remove('hidden');
    this.scrollIconPause.classList.add('hidden');

    this.scrollStateBadge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span> Paused`;
    this.scrollStateBadge.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-400';

    if (this.scrollAnimId) {
      cancelAnimationFrame(this.scrollAnimId);
      this.scrollAnimId = null;
    }
  }

  scrollStep(currentTime) {
    if (!this.isScrolling) return;

    if (!this.lastScrollTime) {
      this.lastScrollTime = currentTime;
    }

    const delta = Math.min(0.1, (currentTime - this.lastScrollTime) / 1000);
    this.lastScrollTime = currentTime;

    // Calculate distance to scroll based on speed (pixels per second)
    const pxToScroll = this.scrollSpeed * delta;
    
    // Maintain fractional position to avoid iOS Safari integer rounding bug
    if (isNaN(this.currentScrollPos) || Math.abs(this.currentScrollPos - this.chordContainer.scrollTop) > 10) {
      this.currentScrollPos = this.chordContainer.scrollTop;
    }
    this.currentScrollPos += pxToScroll;
    this.chordContainer.scrollTop = this.currentScrollPos;

    this.updateScrollProgress();

    // Check if reached bottom
    const maxScroll = this.chordContainer.scrollHeight - this.chordContainer.clientHeight;
    if (maxScroll > 15 && this.chordContainer.scrollTop >= maxScroll - 4) {
      this.stopAutoScroll();
      this.showToast('Reached end of song 🎵');
      return;
    }

    this.scrollAnimId = requestAnimationFrame(this.scrollStep.bind(this));
  }

  setScrollSpeed(speed) {
    this.scrollSpeed = speed;
    this.speedSlider.value = speed;
    this.speedIndicator.textContent = speed;
    if (this.currentSong) {
      this.currentSong.speed = speed;
      this.saveLibrary();
    }
  }

  updateScrollProgress() {
    const maxScroll = this.chordContainer.scrollHeight - this.chordContainer.clientHeight;
    if (maxScroll <= 0) {
      this.scrollPercentage.textContent = '0%';
      return;
    }
    const percent = Math.min(100, Math.round((this.chordContainer.scrollTop / maxScroll) * 100));
    this.scrollPercentage.textContent = `${percent}%`;
  }

  // --- YOUTUBE INTEGRATION ---

  loadYouTubeVideo(urlOrId) {
    this.youtubeUrlInput.value = urlOrId || '';

    if (!urlOrId) {
      // Default to YouTube Search URL
      const query = encodeURIComponent(`${this.currentSong.title} ${this.currentSong.artist} guitar chords`);
      const searchUrl = `https://www.youtube.com/results?search_query=${query}`;
      this.youtubeExternalLink.href = searchUrl;
      this.youtubeIframe.src = '';
      return;
    }

    const videoId = this.extractYouTubeId(urlOrId);
    if (videoId) {
      this.youtubeIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1`;
      this.youtubeExternalLink.href = `https://www.youtube.com/watch?v=${videoId}`;
    } else {
      this.youtubeIframe.src = '';
      this.youtubeExternalLink.href = urlOrId;
    }
  }

  extractYouTubeId(url) {
    if (!url) return null;
    if (url.length === 11 && !url.includes('/') && !url.includes('?')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : null;
  }

  // --- WAKE LOCK API (Keep iPad & iPhone screen on while playing) ---

  async requestWakeLock() {
    try {
      if ('wakeLock' in navigator) {
        this.wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      console.log('Wake Lock request error:', err);
    }
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release().then(() => {
        this.wakeLock = null;
      });
    }
  }

  // --- SONG EDITOR MODAL ---

  openSongEditor(songToEdit = null) {
    this.editingSongId = songToEdit ? songToEdit.id : null;
    const isEditing = !!songToEdit;

    document.getElementById('editor-modal-title').textContent = isEditing ? 'Edit Chord Tab' : 'Add New Chord Tab';
    this.btnDeleteSong.classList.toggle('hidden', !isEditing);

    this.editTitle.value = songToEdit ? songToEdit.title : '';
    this.editArtist.value = songToEdit ? songToEdit.artist : '';
    this.editKey.value = songToEdit ? (songToEdit.key || '') : '';
    this.editCapo.value = songToEdit ? (songToEdit.capo || '') : '';
    this.editSpeed.value = songToEdit ? (songToEdit.speed || 30) : 30;
    this.editYoutube.value = songToEdit ? (songToEdit.youtube || '') : '';
    this.editContent.value = songToEdit ? (songToEdit.content || '') : '';

    this.songEditorModal.classList.remove('hidden');
    this.songEditorModal.classList.add('flex');
    this.editTitle.focus();
  }

  closeSongEditor() {
    this.songEditorModal.classList.add('hidden');
    this.songEditorModal.classList.remove('flex');
  }

  saveSongFromEditor() {
    const title = this.editTitle.value.trim();
    const artist = this.editArtist.value.trim();
    const content = this.editContent.value.trim();

    if (!title || !artist || !content) {
      alert('Please fill in Title, Artist, and Chords content.');
      return;
    }

    if (this.editingSongId) {
      // Update existing
      const song = this.songs.find(s => s.id === this.editingSongId);
      if (song) {
        song.title = title;
        song.artist = artist;
        song.key = this.editKey.value.trim();
        song.capo = this.editCapo.value.trim();
        song.speed = parseInt(this.editSpeed.value, 10) || 30;
        song.youtube = this.editYoutube.value.trim();
        song.content = content;
        if (this.currentSong && this.currentSong.id === song.id) {
          this.openSong(song);
        }
      }
    } else {
      // Add new
      const newSong = {
        id: 'song_' + Date.now(),
        title,
        artist,
        key: this.editKey.value.trim(),
        capo: this.editCapo.value.trim(),
        speed: parseInt(this.editSpeed.value, 10) || 30,
        youtube: this.editYoutube.value.trim(),
        content,
        favorite: true,
        tags: ['Custom', 'Favorites']
      };
      this.songs.unshift(newSong);
    }

    this.saveLibrary();
    this.renderSongsList();
    this.closeSongEditor();
    this.showToast('Tab saved successfully!');
  }

  deleteCurrentSong() {
    if (!this.editingSongId) return;
    if (!confirm('Are you sure you want to delete this tab?')) return;

    this.songs = this.songs.filter(s => s.id !== this.editingSongId);
    this.saveLibrary();
    this.closeSongEditor();
    this.showLibraryView();
    this.showToast('Tab deleted.');
  }

  // --- UG BATCH IMPORT ---

  importSongsBatch(importedList) {
    if (!Array.isArray(importedList) || importedList.length === 0) {
      alert('No valid songs found in the import.');
      return;
    }

    let addedCount = 0;
    importedList.forEach(item => {
      if (item.title && (item.content || item.url)) {
        // Prevent duplicate IDs
        const existing = this.songs.find(s => s.title.toLowerCase() === item.title.toLowerCase() && s.artist.toLowerCase() === (item.artist || '').toLowerCase());
        if (!existing) {
          this.songs.unshift({
            id: 'ug_' + Date.now() + Math.random().toString(36).substr(2, 4),
            title: item.title,
            artist: item.artist || 'Ultimate Guitar',
            key: item.key || '',
            capo: item.capo || '',
            speed: item.speed || 30,
            youtube: item.youtube || '',
            content: item.content || `[Verse 1]\n${item.title}\nVisit: ${item.url || ''}`,
            favorite: true,
            tags: ['Ultimate Guitar', 'Favorites']
          });
          addedCount++;
        }
      }
    });

    this.saveLibrary();
    this.renderSongsList();
    this.ugModal.classList.add('hidden');
    this.ugModal.classList.remove('flex');
    this.showToast(`Imported ${addedCount} songs from Ultimate Guitar! 🎉`);
  }

  // --- NOTIFICATION TOAST ---

  showToast(message) {
    this.toastMessage.textContent = message;
    this.toast.classList.remove('opacity-0', 'pointer-events-none');
    this.toast.classList.add('opacity-100');

    setTimeout(() => {
      this.toast.classList.remove('opacity-100');
      this.toast.classList.add('opacity-0', 'pointer-events-none');
    }, 2500);
  }

  // --- PWA INITIALIZATION ---

  initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').catch(() => {});
      });
    }
  }
}

// Instantiate App
document.addEventListener('DOMContentLoaded', () => {
  window.AuraTabs = new AuraTabsApp();
});
