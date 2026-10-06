/**
 * Core puzzle engine for Photo Shuffle Game
 * Handles grid mathematics, solvability guarantees, tile generation, and win validation.
 */

export const GAME_MODES = {
  SLIDE: 'slide',
  SWAP: 'swap',
};

export const GRID_SIZES = [
  { size: 3, label: '3 × 3 (Casual)', tilesCount: 9 },
  { size: 4, label: '4 × 4 (Standard)', tilesCount: 16 },
  { size: 5, label: '5 × 5 (Master)', tilesCount: 25 },
];

/**
 * Creates the initial solved state of tiles for given grid size and mode
 */
export function createSolvedTiles(gridSize, mode) {
  const totalTiles = gridSize * gridSize;
  const tiles = [];

  for (let i = 0; i < totalTiles; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const isEmpty = mode === GAME_MODES.SLIDE && i === totalTiles - 1;

    tiles.push({
      id: i,
      correctIndex: i,
      row,
      col,
      isEmpty,
    });
  }

  return tiles;
}

/**
 * Returns array of valid adjacent indices that can move into the given emptyIndex
 */
export function getAdjacentIndices(index, gridSize) {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  const neighbors = [];

  // Up
  if (row > 0) neighbors.push((row - 1) * gridSize + col);
  // Down
  if (row < gridSize - 1) neighbors.push((row + 1) * gridSize + col);
  // Left
  if (col > 0) neighbors.push(row * gridSize + (col - 1));
  // Right
  if (col < gridSize - 1) neighbors.push(row * gridSize + (col + 1));

  return neighbors;
}

/**
 * Checks if two board indices are adjacent horizontally or vertically
 */
export function areIndicesAdjacent(idx1, idx2, gridSize) {
  const row1 = Math.floor(idx1 / gridSize);
  const col1 = idx1 % gridSize;
  const row2 = Math.floor(idx2 / gridSize);
  const col2 = idx2 % gridSize;

  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

/**
 * Mathematically guaranteed solvable scramble for sliding puzzles via random walks.
 * Starting from solved state, performs a sequence of valid moves.
 */
export function scrambleSlidePuzzle(gridSize, movesCount = 120) {
  let tiles = createSolvedTiles(gridSize, GAME_MODES.SLIDE);
  let emptyIndex = tiles.length - 1;
  let lastMove = -1;

  for (let step = 0; step < movesCount; step++) {
    const neighbors = getAdjacentIndices(emptyIndex, gridSize).filter(
      (idx) => idx !== lastMove
    );

    // Pick random neighbor to swap with empty slot
    const targetIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
    
    // Swap tiles in array
    const temp = tiles[emptyIndex];
    tiles[emptyIndex] = tiles[targetIndex];
    tiles[targetIndex] = temp;

    lastMove = emptyIndex;
    emptyIndex = targetIndex;
  }

  // Ensure it's not solved right after shuffle
  if (isPuzzleSolved(tiles, GAME_MODES.SLIDE)) {
    return scrambleSlidePuzzle(gridSize, movesCount + 10);
  }

  return tiles;
}

/**
 * Shuffles swap mode puzzle using robust multi-pass Fisher-Yates with maximum displacement guarantee
 */
export function scrambleSwapPuzzle(gridSize) {
  let tiles = createSolvedTiles(gridSize, GAME_MODES.SWAP);
  const total = tiles.length;

  // Multi-pass Fisher-Yates shuffle
  for (let round = 0; round < 2; round++) {
    for (let i = total - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = temp;
    }
  }

  // Ensure high displacement so pieces are visibly randomized
  const solvedCount = tiles.filter((t, i) => t.id === i).length;
  if (solvedCount > Math.floor(total * 0.2)) {
    for (let i = 0; i < total; i++) {
      if (tiles[i].id === i) {
        const swapTarget = (i + Math.floor(total / 2)) % total;
        const temp = tiles[i];
        tiles[i] = tiles[swapTarget];
        tiles[swapTarget] = temp;
      }
    }
  }

  // Final check to guarantee it is not solved right after shuffle
  if (isPuzzleSolved(tiles, GAME_MODES.SWAP)) {
    const temp = tiles[0];
    tiles[0] = tiles[1];
    tiles[1] = temp;
  }

  return tiles;
}

/**
 * Checks if the puzzle is currently in the solved state
 */
export function isPuzzleSolved(tiles, mode) {
  if (!tiles || tiles.length === 0) return false;

  for (let i = 0; i < tiles.length; i++) {
    if (tiles[i].id !== i) {
      return false;
    }
  }

  return true;
}

/**
 * Calculates how many tiles are currently in their correct positions (0 to 100%)
 */
export function getSolvedPercentage(tiles) {
  if (!tiles || tiles.length === 0) return 0;
  let correctCount = 0;
  tiles.forEach((tile, index) => {
    if (tile.id === index) correctCount++;
  });
  return Math.round((correctCount / tiles.length) * 100);
}

/**
 * Finds next helpful hint:
 * For swap mode: returns [sourceIndex, targetIndex] of a misplaced tile and its home
 * For slide mode: returns candidate tile index adjacent to empty that moves closer to home
 */
export function getPuzzleHint(tiles, gridSize, mode) {
  if (mode === GAME_MODES.SWAP) {
    // Find first misplaced tile
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i].id !== i) {
        // Find where tile with id `i` is currently located
        const correctTileCurrentIdx = tiles.findIndex((t) => t.id === i);
        return {
          fromIndex: correctTileCurrentIdx,
          toIndex: i,
          type: 'swap',
        };
      }
    }
  } else if (mode === GAME_MODES.SLIDE) {
    const emptyIndex = tiles.findIndex((t) => t.isEmpty);
    const validMoves = getAdjacentIndices(emptyIndex, gridSize);
    
    // Check if any valid move puts that tile into its correct position
    for (const moveIdx of validMoves) {
      if (tiles[moveIdx].id === emptyIndex) {
        return {
          fromIndex: moveIdx,
          toIndex: emptyIndex,
          type: 'slide',
        };
      }
    }

    // Otherwise suggest first valid move
    if (validMoves.length > 0) {
      return {
        fromIndex: validMoves[0],
        toIndex: emptyIndex,
        type: 'slide',
      };
    }
  }

  return null;
}

/**
 * Computes player star performance rating (1 to 3 stars)
 */
export function calculateRating(moves, seconds, gridSize, mode) {
  const baseMoves = gridSize * gridSize * (mode === GAME_MODES.SLIDE ? 3.5 : 1.2);
  const baseTime = gridSize * gridSize * 6; // seconds

  if (moves <= baseMoves && seconds <= baseTime) {
    return 3;
  }
  if (moves <= baseMoves * 2 && seconds <= baseTime * 2) {
    return 2;
  }
  return 1;
}

/**
 * Format seconds to MM:SS string
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
