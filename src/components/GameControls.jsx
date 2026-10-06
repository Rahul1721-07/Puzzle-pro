import React from 'react';
import { GAME_MODES, GRID_SIZES } from '../utils/puzzleEngine';
import { Shuffle, Eye, EyeOff, Hash, Lightbulb, RotateCcw } from 'lucide-react';

export function GameControls({
  mode,
  onModeChange,
  gridSize,
  onGridSizeChange,
  onShuffle,
  onReset,
  showNumbers,
  onToggleNumbers,
  isPeeking,
  onPeekStart,
  onPeekEnd,
  onTogglePeek,
  onGetHint,
}) {
  return (
    <div className="w-full max-w-xl mx-auto space-y-4 mb-6">
      
      {/* Primary Selector Row: Mode & Grid Size */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-2xl glass-panel border border-slate-800">
        
        {/* Game Mode Pill Selector */}
        <div className="flex items-center w-full sm:w-auto p-1 bg-slate-900/90 rounded-xl border border-slate-800/80">
          <button
            onClick={() => onModeChange(GAME_MODES.SWAP)}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              mode === GAME_MODES.SWAP
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Change / Swap Pieces</span>
          </button>
          <button
            onClick={() => onModeChange(GAME_MODES.SLIDE)}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              mode === GAME_MODES.SLIDE
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Slide / Swipe Mode</span>
          </button>
        </div>

        {/* Grid Size Picker */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-end">
          <span className="text-[11px] font-medium text-slate-400 mr-1 hidden md:inline">
            Grid:
          </span>
          {GRID_SIZES.map((item) => (
            <button
              key={item.size}
              onClick={() => onGridSizeChange(item.size)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                gridSize === item.size
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-glow'
                  : 'glass-button text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {item.size}×{item.size}
            </button>
          ))}
        </div>

      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        
        {/* Primary Shuffle Button */}
        <button
          onClick={onShuffle}
          className="flex-1 min-w-[130px] sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-glow hover:shadow-glow-lg transition flex items-center justify-center gap-2 group active:scale-95"
        >
          <Shuffle className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
          <span>Shuffle & Play</span>
        </button>

        {/* Reset */}
        <button
          onClick={onReset}
          className="px-3.5 py-2.5 rounded-xl glass-button text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium active:scale-95"
          title="Reset to solved view"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* Peek Image (Hold on mobile/desktop, or click to toggle) */}
        <button
          onMouseDown={onPeekStart}
          onMouseUp={onPeekEnd}
          onTouchStart={onPeekStart}
          onTouchEnd={onPeekEnd}
          onClick={onTogglePeek}
          className={`px-3.5 py-2.5 rounded-xl glass-button transition flex items-center gap-1.5 text-xs font-medium active:scale-95 ${
            isPeeking ? 'text-purple-400 border-purple-500/50 bg-purple-500/10' : 'text-slate-300 hover:text-white'
          }`}
          title="Hold or click to peek at full original photo"
        >
          {isPeeking ? <EyeOff className="w-4 h-4 text-purple-400" /> : <Eye className="w-4 h-4 text-indigo-400" />}
          <span>{isPeeking ? 'Peeking...' : 'Peek (P)'}</span>
        </button>

        {/* Numbers Guide Toggle */}
        <button
          onClick={onToggleNumbers}
          className={`px-3.5 py-2.5 rounded-xl glass-button transition flex items-center gap-1.5 text-xs font-medium active:scale-95 ${
            showNumbers ? 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' : 'text-slate-300 hover:text-white'
          }`}
          title="Toggle number indicators on tiles"
        >
          <Hash className="w-4 h-4" />
          <span>{showNumbers ? 'Numbers ON' : 'Numbers'}</span>
        </button>

        {/* Next Hint */}
        <button
          onClick={onGetHint}
          className="px-3.5 py-2.5 rounded-xl glass-button text-amber-300 hover:text-amber-200 border-amber-500/30 hover:border-amber-500/60 transition flex items-center gap-1.5 text-xs font-medium active:scale-95"
          title="Show a hint for the next move"
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Hint</span>
        </button>

      </div>
    </div>
  );
}
