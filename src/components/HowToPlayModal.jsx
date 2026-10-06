import React from 'react';
import { X, ArrowRight, MousePointer, Hand, Lightbulb, Keyboard, Eye, Hash } from 'lucide-react';

export function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-7 rounded-3xl glass-panel border border-slate-700/80 shadow-glow-lg text-slate-200 animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl glass-button text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              How to Play PhotoShuffle
            </h2>
            <p className="text-xs text-slate-400">
              Master both game styles and puzzle strategies
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          
          {/* Mode 1: Classic Sliding Puzzle */}
          <div className="p-4 rounded-2xl glass-card border border-slate-800">
            <h3 className="font-bold text-indigo-400 text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              1. Classic Sliding Puzzle
            </h3>
            <p className="text-slate-300 leading-relaxed mb-2">
              A classic 15-puzzle variant with one empty slot. Click or tap any tile adjacent to the empty slot to slide it into position.
            </p>
            <div className="flex items-center gap-2 text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
              <Keyboard className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                <strong>Keyboard support:</strong> Use <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200">Arrow Keys</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200">WASD</kbd> to slide tiles quickly!
              </span>
            </div>
          </div>

          {/* Mode 2: Direct Tile Swap */}
          <div className="p-4 rounded-2xl glass-card border border-slate-800">
            <h3 className="font-bold text-purple-400 text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              2. Direct Tile Swap Mode
            </h3>
            <p className="text-slate-300 leading-relaxed mb-2">
              All tiles are on screen. Simply click the first tile, then click a second tile to instantly swap their locations.
            </p>
            <div className="flex items-center gap-2 text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
              <MousePointer className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                <strong>Drag & Drop:</strong> You can also drag any tile directly on top of another tile to swap them!
              </span>
            </div>
          </div>

          {/* Assistant Tools */}
          <div className="p-4 rounded-2xl glass-card border border-slate-800">
            <h3 className="font-bold text-emerald-400 text-sm mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Helpful Tools & Hints
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span><strong>Peek (P):</strong> Press and hold the Peek button or tap the <kbd className="px-1 py-0.5 bg-slate-800 rounded">P</kbd> key to preview the completed reference photo at any time.</span>
              </li>
              <li className="flex items-start gap-2">
                <Hash className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Numbers:</strong> Toggle tile numbers to view each piece's numerical position (1, 2, 3...) from top-left to bottom-right.</span>
              </li>
              <li className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span><strong>Hint:</strong> Highlights the optimal next move if you ever feel stuck.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow transition active:scale-95"
        >
          Got it, Let's Play!
        </button>

      </div>
    </div>
  );
}
