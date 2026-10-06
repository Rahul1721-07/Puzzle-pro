# How PhotoShuffle Pro Works ⚙️

This document explains the inner mechanics, algorithms, mathematical guarantees, and rendering techniques behind **PhotoShuffle Pro**.

---

## 1. Core Mechanics Overview

PhotoShuffle Pro supports two distinct gameplay styles:

### A. Direct Piece Change / Swap Mode (Primary Default)
- All $N^2$ tiles are visible on the board (full picture, no missing cutouts).
- Players can change and swap any pieces freely across the board:
  - **Click to Swap**: Click piece 1 (highlights with glowing purple selection ring and "SELECTED" tag) and then click piece 2 to instantly exchange their positions!
  - **Drag and Drop**: Drag any tile directly on top of another piece. The target tile lights up with an emerald highlight ("SWAP HERE") and drops into place.
- Full cycle decomposition allows solving any arbitrary scrambled configuration.

### B. Classic Sliding Puzzle (Swipe Mode)
- The grid consists of $N \times N$ spaces containing $(N^2 - 1)$ numbered photo tiles and **one empty slot**.
- A tile can slide if it is directly adjacent to the empty slot.
- Players can use mouse clicks, touch taps, keyboard arrows (<kbd>↑</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd> / <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>), or drag pieces directly to swap.

---

## 2. 100% Solvable Scramble Algorithm

### The Mathematical Trap of Sliding Puzzles
In an $N \times N$ sliding tile puzzle, a naive random shuffle (e.g. standard random permutation) will result in an **unsolvable board 50% of the time**!

This happens because sliding moves preserve **permutation parity** (the even/odd nature of inversions relative to the empty space's row). If an arbitrary permutation has an odd parity discrepancy, no sequence of valid moves can ever reach the solved state.

### Our Solution: Reverse Random Walk Scramble
Instead of an unconstrained permutation, PhotoShuffle Pro scrambles the board using a **Reverse Random Walk**:

```javascript
export function scrambleSlidePuzzle(gridSize, movesCount = 120) {
  let tiles = createSolvedTiles(gridSize, GAME_MODES.SLIDE);
  let emptyIndex = tiles.length - 1;
  let lastMove = -1;

  for (let step = 0; step < movesCount; step++) {
    // 1. Find all valid neighbors of the empty space
    const neighbors = getAdjacentIndices(emptyIndex, gridSize).filter(
      (idx) => idx !== lastMove // Prevent immediate undo oscillation
    );

    // 2. Pick a random valid neighbor
    const targetIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
    
    // 3. Perform a legal slide swap
    const temp = tiles[emptyIndex];
    tiles[emptyIndex] = tiles[targetIndex];
    tiles[targetIndex] = temp;

    lastMove = emptyIndex;
    emptyIndex = targetIndex;
  }

  return tiles;
}
```

#### Why this guarantees solvability:
1. Every scramble step is a **strictly legal game move**.
2. Reversing the sequence of moves step-by-step is a guaranteed path back to the solved state.
3. Therefore, every generated game is **100% mathematically solvable**.

---

## 3. Dynamic CSS Background Slicing

Traditional photo puzzle implementations often pre-slice images using server-side tools or complex HTML5 Canvas exports. PhotoShuffle Pro instead uses **mathematical CSS background positioning**:

Each tile calculates its offset percentages based on its original index $I$:
$$\text{col} = I \pmod N, \quad \text{row} = \lfloor I / N \rfloor$$

$$\text{posX} = \left(\frac{\text{col}}{N - 1}\right) \times 100\%, \quad \text{posY} = \left(\frac{\text{row}}{N - 1}\right) \times 100\%$$

```jsx
<div
  style={{
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
    backgroundPosition: `${posX}% ${posY}%`,
  }}
/>
```

### Advantages:
1. **Instantaneous**: Zero image cropping latency or canvas export overhead.
2. **Lossless Resolution**: Works at full native image resolution and responds smoothly to retina screens and viewport resize events.
3. **Flexible**: Seamlessly supports any custom uploaded image URL or local photo file immediately.

---

## 4. Web Audio API Synthesizer

Rather than requiring large external `.mp3` or `.wav` files that could fail to load or add bandwidth delays, PhotoShuffle Pro generates custom audio synthesizers directly in the browser via the HTML5 `AudioContext`:

- **Tile Slide**: Triangle wave oscillator sweeping from 260 Hz to 380 Hz with exponential gain decay.
- **Tile Swap**: Dual-tone sine chords (523 Hz + 659 Hz) staggered by 40ms.
- **Victory Fanfare**: Arpeggiated C-major celebratory chord sequence (C5, E5, G5, C6, E6).
- **Mute Mode**: Globally controllable mute state with zero audio overhead when silenced.

---

## 5. Win Detection & Star Ratings

### Solved State Check
On every move, the engine performs an $O(N^2)$ check:
```javascript
export function isPuzzleSolved(tiles, mode) {
  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].id !== i) return false;
  }
  return true;
}
```

### Performance Scoring Formula
Stars ($\star\star\star$) are awarded based on move efficiency and time thresholds relative to the grid size $N$:
$$\text{baseMoves} = N^2 \times (\text{mode} == \text{slide} ? 3.5 : 1.2)$$
$$\text{baseTime} = N^2 \times 6 \text{ seconds}$$

- **3 Stars ($\star\star\star$)**: $\text{moves} \le \text{baseMoves}$ and $\text{time} \le \text{baseTime}$
- **2 Stars ($\star\star$)**: $\text{moves} \le 2 \times \text{baseMoves}$ and $\text{time} \le 2 \times \text{baseTime}$
- **1 Star ($\star$)**: Solved successfully!
