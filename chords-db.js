/**
 * AuraTabs - Chord Transposition & Fretboard Diagram Library
 */

const NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTES_FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

// Comprehensive guitar chord fretboard fingering database (strings: E, A, D, G, B, e)
// -1 = muted (x), 0 = open string, 1-24 = fret number
const GUITAR_CHORDS = {
  // A chords
  'A': { frets: [-1, 0, 2, 2, 2, 0], baseFret: 1, fingers: ['x', '0', '2', '1', '3', '0'] },
  'Am': { frets: [-1, 0, 2, 2, 1, 0], baseFret: 1, fingers: ['x', '0', '2', '3', '1', '0'] },
  'A7': { frets: [-1, 0, 2, 0, 2, 0], baseFret: 1, fingers: ['x', '0', '2', '0', '3', '0'] },
  'Am7': { frets: [-1, 0, 2, 0, 1, 0], baseFret: 1, fingers: ['x', '0', '2', '0', '1', '0'] },
  'Amaj7': { frets: [-1, 0, 2, 1, 2, 0], baseFret: 1, fingers: ['x', '0', '2', '1', '3', '0'] },
  'Asus2': { frets: [-1, 0, 2, 2, 0, 0], baseFret: 1, fingers: ['x', '0', '1', '2', '0', '0'] },
  'Asus4': { frets: [-1, 0, 2, 2, 3, 0], baseFret: 1, fingers: ['x', '0', '1', '2', '4', '0'] },

  // B chords
  'B': { frets: [-1, 2, 4, 4, 4, 2], baseFret: 1, barres: [2], fingers: ['x', '1', '3', '3', '3', '1'] },
  'Bm': { frets: [-1, 2, 4, 4, 3, 2], baseFret: 1, barres: [2], fingers: ['x', '1', '3', '4', '2', '1'] },
  'B7': { frets: [-1, 2, 1, 2, 0, 2], baseFret: 1, fingers: ['x', '2', '1', '3', '0', '4'] },
  'Bm7': { frets: [-1, 2, 4, 2, 3, 2], baseFret: 1, barres: [2], fingers: ['x', '1', '3', '1', '2', '1'] },
  'Bmaj7': { frets: [-1, 2, 4, 3, 4, 2], baseFret: 1, barres: [2], fingers: ['x', '1', '3', '2', '4', '1'] },

  // C chords
  'C': { frets: [-1, 3, 2, 0, 1, 0], baseFret: 1, fingers: ['x', '3', '2', '0', '1', '0'] },
  'Cm': { frets: [-1, 3, 5, 5, 4, 3], baseFret: 1, barres: [3], fingers: ['x', '1', '3', '4', '2', '1'] },
  'C7': { frets: [-1, 3, 2, 3, 1, 0], baseFret: 1, fingers: ['x', '3', '2', '4', '1', '0'] },
  'Cmaj7': { frets: [-1, 3, 2, 0, 0, 0], baseFret: 1, fingers: ['x', '3', '2', '0', '0', '0'] },
  'Cadd9': { frets: [-1, 3, 2, 0, 3, 3], baseFret: 1, fingers: ['x', '2', '1', '0', '3', '4'] },
  'C#': { frets: [-1, 4, 6, 6, 6, 4], baseFret: 1, barres: [4], fingers: ['x', '1', '3', '3', '3', '1'] },
  'C#m': { frets: [-1, 4, 6, 6, 5, 4], baseFret: 1, barres: [4], fingers: ['x', '1', '3', '4', '2', '1'] },
  'C#7': { frets: [-1, 4, 6, 4, 6, 4], baseFret: 1, barres: [4], fingers: ['x', '1', '3', '1', '4', '1'] },
  'Db': { frets: [-1, 4, 6, 6, 6, 4], baseFret: 1, barres: [4], fingers: ['x', '1', '3', '3', '3', '1'] },
  'Dbm': { frets: [-1, 4, 6, 6, 5, 4], baseFret: 1, barres: [4], fingers: ['x', '1', '3', '4', '2', '1'] },

  // D chords
  'D': { frets: [-1, -1, 0, 2, 3, 2], baseFret: 1, fingers: ['x', 'x', '0', '1', '3', '2'] },
  'Dm': { frets: [-1, -1, 0, 2, 3, 1], baseFret: 1, fingers: ['x', 'x', '0', '2', '3', '1'] },
  'D7': { frets: [-1, -1, 0, 2, 1, 2], baseFret: 1, fingers: ['x', 'x', '0', '2', '1', '3'] },
  'Dm7': { frets: [-1, -1, 0, 2, 1, 1], baseFret: 1, fingers: ['x', 'x', '0', '2', '1', '1'] },
  'Dmaj7': { frets: [-1, -1, 0, 2, 2, 2], baseFret: 1, fingers: ['x', 'x', '0', '1', '1', '1'] },
  'Dsus2': { frets: [-1, -1, 0, 2, 3, 0], baseFret: 1, fingers: ['x', 'x', '0', '1', '2', '0'] },
  'Dsus4': { frets: [-1, -1, 0, 2, 3, 3], baseFret: 1, fingers: ['x', 'x', '0', '1', '2', '3'] },
  'D/F#': { frets: [2, 0, 0, 2, 3, 2], baseFret: 1, fingers: ['1', '0', '0', '2', '4', '3'] },

  // E chords
  'E': { frets: [0, 2, 2, 1, 0, 0], baseFret: 1, fingers: ['0', '2', '3', '1', '0', '0'] },
  'Em': { frets: [0, 2, 2, 0, 0, 0], baseFret: 1, fingers: ['0', '2', '3', '0', '0', '0'] },
  'E7': { frets: [0, 2, 0, 1, 0, 0], baseFret: 1, fingers: ['0', '2', '0', '1', '0', '0'] },
  'Em7': { frets: [0, 2, 0, 0, 0, 0], baseFret: 1, fingers: ['0', '2', '0', '0', '0', '0'] },
  'Emaj7': { frets: [0, 2, 1, 1, 0, 0], baseFret: 1, fingers: ['0', '3', '1', '2', '0', '0'] },
  'Esus4': { frets: [0, 2, 2, 2, 0, 0], baseFret: 1, fingers: ['0', '2', '3', '4', '0', '0'] },

  // F chords
  'F': { frets: [1, 3, 3, 2, 1, 1], baseFret: 1, barres: [1], fingers: ['1', '3', '4', '2', '1', '1'] },
  'Fm': { frets: [1, 3, 3, 1, 1, 1], baseFret: 1, barres: [1], fingers: ['1', '3', '4', '1', '1', '1'] },
  'F7': { frets: [1, 3, 1, 2, 1, 1], baseFret: 1, barres: [1], fingers: ['1', '3', '1', '2', '1', '1'] },
  'Fmaj7': { frets: [-1, -1, 3, 2, 1, 0], baseFret: 1, fingers: ['x', 'x', '3', '2', '1', '0'] },
  'F#': { frets: [2, 4, 4, 3, 2, 2], baseFret: 1, barres: [2], fingers: ['1', '3', '4', '2', '1', '1'] },
  'F#m': { frets: [2, 4, 4, 2, 2, 2], baseFret: 1, barres: [2], fingers: ['1', '3', '4', '1', '1', '1'] },
  'F#7': { frets: [2, 4, 2, 3, 2, 2], baseFret: 1, barres: [2], fingers: ['1', '3', '1', '2', '1', '1'] },
  'F#m7': { frets: [2, 4, 2, 2, 2, 2], baseFret: 1, barres: [2], fingers: ['1', '3', '1', '1', '1', '1'] },

  // G chords
  'G': { frets: [3, 2, 0, 0, 0, 3], baseFret: 1, fingers: ['2', '1', '0', '0', '0', '3'] },
  'Gm': { frets: [3, 5, 5, 3, 3, 3], baseFret: 1, barres: [3], fingers: ['1', '3', '4', '1', '1', '1'] },
  'G7': { frets: [3, 2, 0, 0, 0, 1], baseFret: 1, fingers: ['3', '2', '0', '0', '0', '1'] },
  'Gmaj7': { frets: [3, 2, 0, 0, 0, 2], baseFret: 1, fingers: ['2', '1', '0', '0', '0', '3'] },
  'Gsus4': { frets: [3, 3, 0, 0, 1, 3], baseFret: 1, fingers: ['2', '3', '0', '0', '1', '4'] },
  'G/B': { frets: [-1, 2, 0, 0, 3, 3], baseFret: 1, fingers: ['x', '1', '0', '0', '3', '4'] },

  // Flats & Sharps common
  'F#': { frets: [2, 4, 4, 3, 2, 2], baseFret: 1, barres: [2], fingers: ['1', '3', '4', '2', '1', '1'] },
  'F#m': { frets: [2, 4, 4, 2, 2, 2], baseFret: 1, barres: [2], fingers: ['1', '3', '4', '1', '1', '1'] },
  'F#7': { frets: [2, 4, 2, 3, 2, 2], baseFret: 1, barres: [2], fingers: ['1', '3', '1', '2', '1', '1'] },
  'Gb': { frets: [2, 4, 4, 3, 2, 2], baseFret: 1, barres: [2], fingers: ['1', '3', '4', '2', '1', '1'] },
  'G#': { frets: [4, 6, 6, 5, 4, 4], baseFret: 1, barres: [4], fingers: ['1', '3', '4', '2', '1', '1'] },
  'G#m': { frets: [4, 6, 6, 4, 4, 4], baseFret: 1, barres: [4], fingers: ['1', '3', '4', '1', '1', '1'] },
  'Ab': { frets: [4, 6, 6, 5, 4, 4], baseFret: 1, barres: [4], fingers: ['1', '3', '4', '2', '1', '1'] },
  'Abm': { frets: [4, 6, 6, 4, 4, 4], baseFret: 1, barres: [4], fingers: ['1', '3', '4', '1', '1', '1'] },
  'A#': { frets: [-1, 1, 3, 3, 3, 1], baseFret: 1, barres: [1], fingers: ['x', '1', '3', '3', '3', '1'] },
  'A#m': { frets: [-1, 1, 3, 3, 2, 1], baseFret: 1, barres: [1], fingers: ['x', '1', '3', '4', '2', '1'] },
  'Bb': { frets: [-1, 1, 3, 3, 3, 1], baseFret: 1, barres: [1], fingers: ['x', '1', '3', '3', '3', '1'] },
  'Bbm': { frets: [-1, 1, 3, 3, 2, 1], baseFret: 1, barres: [1], fingers: ['x', '1', '3', '4', '2', '1'] },
  'D#': { frets: [-1, -1, 1, 3, 4, 3], baseFret: 1, fingers: ['x', 'x', '1', '3', '4', '2'] },
  'D#m': { frets: [-1, -1, 1, 3, 4, 2], baseFret: 1, fingers: ['x', 'x', '1', '3', '4', '1'] },
  'Eb': { frets: [-1, -1, 1, 3, 4, 3], baseFret: 1, fingers: ['x', 'x', '1', '3', '4', '2'] },
  'Ebm': { frets: [-1, -1, 1, 3, 4, 2], baseFret: 1, fingers: ['x', 'x', '1', '3', '4', '1'] },
};

/**
 * Transpose a chord string by semitones (+/-)
 */
function transposeChord(chord, semitones) {
  if (semitones === 0 || !chord) return chord;

  // Handle slash chords (e.g. D/F# or C/E)
  if (chord.includes('/')) {
    const parts = chord.split('/');
    return `${transposeChord(parts[0], semitones)}/${transposeChord(parts[1], semitones)}`;
  }

  // Parse root note and chord quality (e.g. "C#m7" -> root: "C#", quality: "m7")
  const match = chord.match(/^([A-G][#b]?)(.*)$/);
  if (!match) return chord;

  const root = match[1];
  const quality = match[2];

  let noteIndex = NOTES_SHARP.indexOf(root);
  let useFlat = false;

  if (noteIndex === -1) {
    noteIndex = NOTES_FLAT.indexOf(root);
    useFlat = true;
  }

  if (noteIndex === -1) return chord;

  // Calculate new note index (modulo 12)
  let newIndex = (noteIndex + semitones) % 12;
  if (newIndex < 0) newIndex += 12;

  // Prefer natural or appropriate flat/sharp
  const newRoot = (useFlat || [1, 3, 6, 8, 10].includes(newIndex)) 
    ? NOTES_FLAT[newIndex] 
    : NOTES_SHARP[newIndex];

  return newRoot + quality;
}

/**
 * Generate crisp SVG Fretboard Chord Diagram
 */
function renderChordSVG(chordName) {
  const data = GUITAR_CHORDS[chordName] || GUITAR_CHORDS[chordName.replace('#', '')] || GUITAR_CHORDS['C'];
  
  const width = 160;
  const height = 180;
  const numStrings = 6;
  const numFrets = 4;
  const startX = 30;
  const startY = 35;
  const stringSpacing = 20;
  const fretSpacing = 26;

  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Nut or Top fret line (thicker if baseFret === 1)
  const isNut = (data.baseFret || 1) === 1;
  svg += `<line x1="${startX}" y1="${startY}" x2="${startX + stringSpacing * 5}" y2="${startY}" stroke="${isNut ? '#fbbf24' : '#64748b'}" stroke-width="${isNut ? '4' : '2'}"/>`;

  // Draw Fret lines
  for (let i = 1; i <= numFrets; i++) {
    const y = startY + i * fretSpacing;
    svg += `<line x1="${startX}" y1="${y}" x2="${startX + stringSpacing * 5}" y2="${y}" stroke="#475569" stroke-width="1.5"/>`;
  }

  // Draw Strings
  for (let s = 0; s < numStrings; s++) {
    const x = startX + s * stringSpacing;
    svg += `<line x1="${x}" y1="${startY}" x2="${x}" y2="${startY + numFrets * fretSpacing}" stroke="#94a3b8" stroke-width="${1 + (numStrings - 1 - s) * 0.3}"/>`;
  }

  // Draw Barres if present
  if (data.barres && data.barres.length > 0) {
    const barreFret = data.barres[0];
    const y = startY + (barreFret - 0.5) * fretSpacing;
    svg += `<rect x="${startX}" y="${y - 6}" width="${stringSpacing * 5}" height="12" rx="6" fill="#818cf8" opacity="0.85"/>`;
  }

  // Draw finger markers, open string 'o', muted 'x'
  data.frets.forEach((fret, sIdx) => {
    const x = startX + sIdx * stringSpacing;
    if (fret === -1) {
      // Muted string 'x'
      svg += `<text x="${x}" y="${startY - 10}" fill="#ef4444" font-size="12" font-family="monospace" text-anchor="middle" font-weight="bold">×</text>`;
    } else if (fret === 0) {
      // Open string 'o'
      svg += `<circle cx="${x}" cy="${startY - 12}" r="4" fill="none" stroke="#22c55e" stroke-width="1.5"/>`;
    } else if (fret > 0) {
      // Pressed finger dot
      const y = startY + (fret - 0.5) * fretSpacing;
      svg += `<circle cx="${x}" cy="${y}" r="6.5" fill="#6366f1" stroke="#ffffff" stroke-width="1.5"/>`;
      
      // Finger number label if available
      if (data.fingers && data.fingers[sIdx] && data.fingers[sIdx] !== '0' && data.fingers[sIdx] !== 'x') {
        svg += `<text x="${x}" y="${y + 3.5}" fill="#ffffff" font-size="9" font-family="sans-serif" text-anchor="middle" font-weight="bold">${data.fingers[sIdx]}</text>`;
      }
    }
  });

  // Base Fret indicator if > 1
  if (data.baseFret && data.baseFret > 1) {
    svg += `<text x="${startX - 14}" y="${startY + 16}" fill="#fbbf24" font-size="11" font-weight="bold" font-family="sans-serif">${data.baseFret}fr</text>`;
  }

  svg += `</svg>`;
  return svg;
}

// Export for app use
window.AuraChords = {
  transposeChord,
  renderChordSVG,
  GUITAR_CHORDS
};
