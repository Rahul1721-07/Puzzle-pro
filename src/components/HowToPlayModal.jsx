import React from 'react';
import { 
  X, 
  MousePointer, 
  Lightbulb, 
  Keyboard, 
  Eye, 
  Hash, 
  BookOpen, 
  Trophy, 
  Sparkles, 
  Gamepad2, 
  CheckCircle2,
  ArrowRightLeft
} from 'lucide-react';

export function HowToPlayModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 rounded-3xl glass-panel border border-slate-700/80 shadow-glow-lg text-slate-200 animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl glass-button text-slate-400 hover:text-white transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-glow">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                How to Play – User Manual
              </h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Player Guide
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Everything you need to know to solve puzzles, beat high scores, and have fun
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          
          {/* Quick Start Guide */}
          <div className="p-4 rounded-2xl glass-card border border-slate-800 bg-slate-900/40">
            <h3 className="font-bold text-purple-300 text-sm mb-2.5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Quick Start (4 Easy Steps)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                <span><strong>Choose Photo:</strong> Pick a preset image or upload your own.</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                <span><strong>Select Difficulty:</strong> Pick 3×3 (Casual), 4×4 (Medium), or 5×5 (Hard).</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                <span><strong>Select Mode:</strong> Choose <em>Swap Pieces</em> or <em>Classic Slide</em>.</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">4</span>
                <span><strong>Shuffle & Solve:</strong> Reassemble the picture to win!</span>
              </div>
            </div>
          </div>

          {/* Mode 1: Tile Swap Mode */}
          <div className="p-4 rounded-2xl glass-card border border-purple-500/20 bg-purple-950/10">
            <h3 className="font-bold text-purple-300 text-sm mb-2 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-purple-400" />
              Game Mode 1: Change / Swap Pieces Mode
            </h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              All tiles are visible on the board. You can swap any two tiles regardless of distance until the whole picture is aligned.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-300">
                <MousePointer className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Click-to-Swap:</strong> Click the first tile to select it (it glows purple), then click any other tile to swap their positions.
                </span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-300">
                <Gamepad2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Drag & Drop:</strong> Drag any piece directly onto another piece to swap them effortlessly.
                </span>
              </div>
            </div>
          </div>

          {/* Mode 2: Classic Sliding Puzzle */}
          <div className="p-4 rounded-2xl glass-card border border-indigo-500/20 bg-indigo-950/10">
            <h3 className="font-bold text-indigo-300 text-sm mb-2 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-indigo-400" />
              Game Mode 2: Classic Sliding Puzzle
            </h3>
            <p className="text-slate-300 leading-relaxed mb-3">
              The traditional 15-puzzle format with one empty tile slot. Shift tiles into the empty space one by one to reconstruct the complete image.
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-slate-300">
                <MousePointer className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Mouse / Tap:</strong> Click or tap any tile adjacent (above, below, left, or right) to the empty slot to slide it in.
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                <Keyboard className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  <strong>Keyboard shortcuts:</strong> Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-purple-300 font-mono text-xs">Arrow Keys</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-purple-300 font-mono text-xs">W / A / S / D</kbd> to slide tiles rapidly without clicking!
                </span>
              </div>
            </div>
          </div>

          {/* Helpful In-Game Assistance Tools */}
          <div className="p-4 rounded-2xl glass-card border border-slate-800 bg-slate-900/40">
            <h3 className="font-bold text-emerald-300 text-sm mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              Helpful Tools & Assistance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-slate-300">
              <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                <div className="flex items-center gap-1.5 text-indigo-300 font-semibold mb-1">
                  <Eye className="w-4 h-4" />
                  <span>Peek (Key: P)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Hold down the <strong>Peek</strong> button or press <kbd className="px-1 py-0.2 bg-slate-800 rounded text-slate-300 font-mono">P</kbd> to view the full original picture anytime.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1">
                  <Hash className="w-4 h-4" />
                  <span>Tile Numbers</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Toggle numbers on each tile (1, 2, 3...) to know where each slice belongs in reading order.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                  <Lightbulb className="w-4 h-4" />
                  <span>Smart Hint</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Feeling stuck? Click <strong>Hint</strong> to highlight the best tile to move next.
                </p>
              </div>
            </div>
          </div>

          {/* Scoring & Pro Tips */}
          <div className="p-4 rounded-2xl glass-card border border-amber-500/20 bg-amber-950/10">
            <h3 className="font-bold text-amber-300 text-sm mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              Pro Tips & 3-Star Rating
            </h3>
            <ul className="space-y-1.5 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Solve row by row:</strong> Start by getting the top row in place, then the second row, leaving the bottom rows for last.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Aim for 3 Stars:</strong> Complete the puzzle with fewer moves and faster time to achieve the highest star rating and set personal best records!
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow transition active:scale-95"
        >
          Got it, Let's Play!
        </button>

      </div>
    </div>
  );
}
