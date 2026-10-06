import React, { useState } from 'react';
import { GAME_MODES, areIndicesAdjacent } from '../utils/puzzleEngine';
import { Sparkles, Check, Move, ArrowLeftRight } from 'lucide-react';

export function PuzzleBoard({
  tiles,
  gridSize,
  mode,
  imageUrl,
  onTileClick,
  onSwapTiles,
  showNumbers,
  isPeeking,
  hint,
  isSolved,
}) {
  const [selectedSwapIdx, setSelectedSwapIdx] = useState(null);
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [dragOverIdx, setDragOverIdx] = useState(null);

  // Find empty slot index for sliding mode
  const emptyIndex = mode === GAME_MODES.SLIDE ? tiles.findIndex((t) => t.isEmpty) : -1;

  const handleTileClick = (index) => {
    if (isSolved) return;

    if (mode === GAME_MODES.SLIDE) {
      // In slide mode, if adjacent to empty space, slide into it
      if (areIndicesAdjacent(index, emptyIndex, gridSize)) {
        onTileClick(index);
        setSelectedSwapIdx(null);
        return;
      }
      // If clicked tile is not adjacent to empty slot, allow selecting to swap with another tile
      if (selectedSwapIdx === null) {
        setSelectedSwapIdx(index);
      } else if (selectedSwapIdx === index) {
        setSelectedSwapIdx(null);
      } else {
        onSwapTiles(selectedSwapIdx, index);
        setSelectedSwapIdx(null);
      }
    } else {
      // Direct Swap mode
      if (selectedSwapIdx === null) {
        setSelectedSwapIdx(index);
      } else if (selectedSwapIdx === index) {
        setSelectedSwapIdx(null); // Deselect if tapped same
      } else {
        onSwapTiles(selectedSwapIdx, index);
        setSelectedSwapIdx(null);
      }
    }
  };

  // Drag and drop handlers (works smoothly in both modes!)
  const handleDragStart = (e, index) => {
    if (isSolved) return;
    setDraggedIdx(index);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    if (isSolved) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDragLeave = (e, index) => {
    if (dragOverIdx === index) {
      setDragOverIdx(null);
    }
  };

  const handleDrop = (e, targetIndex) => {
    if (isSolved) return;
    e.preventDefault();
    if (draggedIdx !== null && draggedIdx !== targetIndex) {
      onSwapTiles(draggedIdx, targetIndex);
    }
    setDraggedIdx(null);
    setDragOverIdx(null);
    setSelectedSwapIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  return (
    <div className="w-full max-w-[460px] sm:max-w-[500px] mx-auto select-none">
      
      {/* Floating Interactive Status Helper */}
      <div className="mb-2 px-3 py-1.5 rounded-xl glass-panel text-center text-xs flex items-center justify-center gap-1.5 transition-all duration-200">
        {selectedSwapIdx !== null ? (
          <div className="flex items-center gap-1.5 text-purple-300 font-semibold animate-pulse">
            <ArrowLeftRight className="w-3.5 h-3.5 text-pink-400" />
            <span>
              Piece #{tiles[selectedSwapIdx].id + 1} selected! Click any other piece to swap them.
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-slate-300">
            <ArrowLeftRight className="w-3.5 h-3.5 text-purple-400" />
            <span>
              {mode === GAME_MODES.SWAP
                ? 'Click any piece to select, then click another to swap — or drag & drop!'
                : 'Slide into empty slot, or click/drag any 2 pieces to swap them!'}
            </span>
          </div>
        )}
      </div>

      {/* Outer Board Frame */}
      <div className="relative aspect-square p-2.5 sm:p-3 rounded-3xl glass-panel border border-slate-700/60 shadow-glass">
        
        {/* Board Tiles Grid */}
        <div
          className="w-full h-full grid gap-1.5 sm:gap-2 rounded-2xl overflow-hidden bg-slate-950/60 p-1"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {tiles.map((tile, index) => {
            const isCorrect = tile.id === index;
            const isSelected = selectedSwapIdx === index;
            const isDropTarget = dragOverIdx === index && draggedIdx !== index;
            const isHintTarget = hint && (hint.fromIndex === index || hint.toIndex === index);
            const isAdjacentToEmpty =
              mode === GAME_MODES.SLIDE && !tile.isEmpty && areIndicesAdjacent(index, emptyIndex, gridSize);

            // Handle empty slot in sliding puzzle
            if (tile.isEmpty) {
              return (
                <div
                  key={`empty-${index}`}
                  onClick={() => {
                    // Clicking empty slot with a selected tile will slide or swap into it
                    if (selectedSwapIdx !== null) {
                      onSwapTiles(selectedSwapIdx, index);
                      setSelectedSwapIdx(null);
                    }
                  }}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={(e) => handleDragLeave(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`w-full h-full rounded-xl bg-slate-950/70 border-2 border-dashed flex items-center justify-center transition-all duration-200 ${
                    isDropTarget
                      ? 'border-emerald-400 bg-emerald-500/20 scale-105'
                      : 'border-slate-800/80'
                  }`}
                >
                  <span className="text-[10px] text-slate-600 font-mono select-none">
                    {isDropTarget ? 'DROP HERE' : 'EMPTY'}
                  </span>
                </div>
              );
            }

            // Calculate dynamic background coordinates
            const origCol = tile.id % gridSize;
            const origRow = Math.floor(tile.id / gridSize);
            const posX = gridSize > 1 ? (origCol / (gridSize - 1)) * 100 : 0;
            const posY = gridSize > 1 ? (origRow / (gridSize - 1)) * 100 : 0;

            return (
              <div
                key={tile.id}
                onClick={() => handleTileClick(index)}
                draggable={!isSolved}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={(e) => handleDragLeave(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                  backgroundPosition: `${posX}% ${posY}%`,
                }}
                className={`relative w-full h-full rounded-xl overflow-hidden cursor-pointer tile-transition transition-all duration-150 active:scale-95 group shadow-sm ${
                  isDropTarget
                    ? 'ring-4 ring-emerald-400 scale-105 z-30 shadow-glow-emerald brightness-110'
                    : ''
                } ${
                  isSelected
                    ? 'ring-4 ring-purple-400 scale-[0.97] shadow-glow-lg z-20 brightness-110 animate-pulse'
                    : ''
                } ${
                  isAdjacentToEmpty && !isSelected && !isDropTarget
                    ? 'ring-2 ring-indigo-400/50 hover:ring-indigo-400 hover:scale-[1.02] shadow-glow'
                    : ''
                } ${
                  isHintTarget && !isSelected && !isDropTarget
                    ? 'ring-4 ring-amber-400 scale-[1.02] z-10 animate-bounce-short'
                    : ''
                }`}
              >
                {/* 3D Sheen overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30 pointer-events-none group-hover:from-white/20" />

                {/* Selected Piece Pill */}
                {isSelected && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-purple-600/90 backdrop-blur-md text-white font-bold text-[10px] tracking-wide shadow border border-purple-300/40 select-none pointer-events-none">
                    SELECTED
                  </div>
                )}

                {/* Drop Target Pill */}
                {isDropTarget && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white font-bold text-[10px] tracking-wide shadow border border-emerald-300/40 select-none pointer-events-none">
                    SWAP HERE
                  </div>
                )}

                {/* Number Guide Badge */}
                {showNumbers && (
                  <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white font-mono font-bold text-[10px] sm:text-xs shadow border border-white/20 select-none pointer-events-none">
                    {tile.id + 1}
                  </div>
                )}

                {/* Correct Tile Indicator Dot */}
                {isCorrect && !isSolved && (
                  <div
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-glow-emerald border border-emerald-300/40 select-none pointer-events-none"
                    title="In correct place"
                  >
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}

                {/* Swap / Drag icon hint */}
                <div className="absolute bottom-1 right-1 p-0.5 rounded bg-black/40 text-purple-300 opacity-0 group-hover:opacity-80 transition pointer-events-none">
                  <ArrowLeftRight className="w-2.5 h-2.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Peek Overlay (Full Original Image Preview) */}
        {isPeeking && (
          <div className="absolute inset-0 z-40 m-2.5 sm:m-3 rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-500/80 animate-fade-in backdrop-blur-sm bg-slate-950/80 flex flex-col pointer-events-none">
            <img
              src={imageUrl}
              alt="Original Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-purple-300 text-xs font-semibold tracking-wide border border-purple-500/40 flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Full Image Preview</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
