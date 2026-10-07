import React, { useState } from 'react';
import { 
  X, 
  Laptop,
  Smartphone,
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
  ArrowRightLeft,
  Hand
} from 'lucide-react';

export function HowToPlayModal({ isOpen, onClose }) {
  const [deviceTab, setDeviceTab] = useState('laptop'); // 'laptop' | 'phone' | 'modes'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl glass-panel border border-slate-700/80 shadow-glow-lg text-slate-200 animate-scale-up overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/90 flex items-center justify-between shrink-0 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-glow">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white font-display">
                  How to Play – User Manual
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 hidden xs:inline-block">
                  Illustrated Guide
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Visual controls and step-by-step instructions for all devices
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-button text-slate-400 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Device Switcher Navigation Tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 pb-2 border-b border-slate-800/80 bg-slate-900/40 overflow-x-auto shrink-0">
          <button
            onClick={() => setDeviceTab('laptop')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
              deviceTab === 'laptop'
                ? 'bg-purple-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Laptop & Desktop</span>
          </button>

          <button
            onClick={() => setDeviceTab('phone')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
              deviceTab === 'phone'
                ? 'bg-purple-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Phone & Tablet (Touch)</span>
          </button>

          <button
            onClick={() => setDeviceTab('modes')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 whitespace-nowrap ${
              deviceTab === 'modes'
                ? 'bg-purple-600 text-white shadow-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Game Modes & Rules</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm leading-relaxed flex-1">

          {/* TAB 1: LAPTOP & DESKTOP GUIDE */}
          {deviceTab === 'laptop' && (
            <div className="space-y-4 animate-fade-in">
              {/* Illustrated Image */}
              <div className="rounded-2xl overflow-hidden border border-purple-500/30 shadow-glow bg-slate-900/60 relative group">
                <img
                  src="/tutorials/how_to_desktop.jpg"
                  alt="How to play on Laptop & Desktop with Mouse and Keyboard"
                  className="w-full h-auto object-cover max-h-72 sm:max-h-80"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 sm:p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs sm:text-sm">
                    <Laptop className="w-4 h-4 text-purple-400" />
                    <span>Desktop Gameplay: Mouse Drag & Drop + Keyboard Controls</span>
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    WASD / Arrow Keys Ready
                  </span>
                </div>
              </div>

              {/* Laptop Instructions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Mouse Controls */}
                <div className="p-4 rounded-2xl glass-card border border-purple-500/20 bg-purple-950/15">
                  <h4 className="font-bold text-purple-300 text-sm mb-2 flex items-center gap-2">
                    <MousePointer className="w-4 h-4 text-purple-400" />
                    Mouse & Trackpad Controls
                  </h4>
                  <ul className="space-y-2 text-slate-300 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                      <span><strong>Click-to-Swap:</strong> In Swap Mode, click a piece to select it, then click another piece to swap their positions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                      <span><strong>Drag & Drop:</strong> Click and drag any puzzle piece right onto another to trade places in one smooth action.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                      <span><strong>Slide Click:</strong> In Classic Slide Mode, click any tile adjacent to the empty slot to slide it over.</span>
                    </li>
                  </ul>
                </div>

                {/* Keyboard Controls */}
                <div className="p-4 rounded-2xl glass-card border border-indigo-500/20 bg-indigo-950/15">
                  <h4 className="font-bold text-indigo-300 text-sm mb-2 flex items-center gap-2">
                    <Keyboard className="w-4 h-4 text-indigo-400" />
                    Keyboard Shortcuts (Pro Play)
                  </h4>
                  <ul className="space-y-2 text-slate-300 text-xs">
                    <li className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/50 border border-slate-800">
                      <span>Slide Tiles in Grid</span>
                      <div className="flex gap-1 font-mono text-purple-300">
                        <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">W</kbd>
                        <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">A</kbd>
                        <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">S</kbd>
                        <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">D</kbd>
                        <span className="text-slate-500">or</span>
                        <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">↑←↓→</kbd>
                      </div>
                    </li>
                    <li className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/50 border border-slate-800">
                      <span>Peek Full Photo</span>
                      <kbd className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-purple-300">P</kbd>
                    </li>
                    <li className="flex items-center justify-between p-1.5 rounded-lg bg-slate-950/50 border border-slate-800">
                      <span>Smart Hint</span>
                      <kbd className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 font-mono text-purple-300">H</kbd>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PHONE & TABLET GUIDE */}
          {deviceTab === 'phone' && (
            <div className="space-y-4 animate-fade-in">
              {/* Illustrated Image */}
              <div className="rounded-2xl overflow-hidden border border-pink-500/30 shadow-glow bg-slate-900/60 relative group">
                <img
                  src="/tutorials/how_to_mobile.jpg"
                  alt="How to play on Mobile Phone and Tablet with Touch Gestures"
                  className="w-full h-auto object-cover max-h-72 sm:max-h-80"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 sm:p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-pink-300 font-semibold text-xs sm:text-sm">
                    <Smartphone className="w-4 h-4 text-pink-400" />
                    <span>Mobile Gameplay: Simple Tap & Touch Drag Gestures</span>
                  </div>
                  <span className="text-[11px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    100% Touch Responsive
                  </span>
                </div>
              </div>

              {/* Mobile Instructions Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Touch Gestures */}
                <div className="p-4 rounded-2xl glass-card border border-pink-500/20 bg-pink-950/15">
                  <h4 className="font-bold text-pink-300 text-sm mb-2 flex items-center gap-2">
                    <Hand className="w-4 h-4 text-pink-400" />
                    Touch & Tap Gestures
                  </h4>
                  <ul className="space-y-2 text-slate-300 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                      <span><strong>Tap to Slide:</strong> In Classic Slide, just tap any tile next to the blank slot — it slides in instantly!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                      <span><strong>Two-Tap Swap:</strong> In Swap Mode, tap the first tile, then tap the destination tile to switch them immediately.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                      <span><strong>Finger Drag:</strong> Touch and hold a tile, then slide your finger over another tile to swap.</span>
                    </li>
                  </ul>
                </div>

                {/* Mobile Assistant Buttons */}
                <div className="p-4 rounded-2xl glass-card border border-emerald-500/20 bg-emerald-950/15">
                  <h4 className="font-bold text-emerald-300 text-sm mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    Quick Mobile Buttons
                  </h4>
                  <ul className="space-y-2 text-slate-300 text-xs">
                    <li className="flex items-start gap-2">
                      <Eye className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span><strong>Peek Button:</strong> Press and hold the "Peek" button anytime on your phone screen to check the solution preview.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Hash className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Numbers Toggle:</strong> Tap the "#" button to show numbers on small phone screens for effortless alignment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Hint Button:</strong> Need help? Tap the "Hint" icon to reveal your next best move.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GAME MODES & RULES */}
          {deviceTab === 'modes' && (
            <div className="space-y-4 animate-fade-in">
              {/* Quick Step by Step Flow */}
              <div className="p-4 rounded-2xl glass-card border border-slate-800 bg-slate-900/40">
                <h3 className="font-bold text-purple-300 text-sm mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  How Every Game Works
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-300">
                    <strong className="text-purple-300 block mb-0.5">1. Pick Photo</strong>
                    Choose from built-in galleries or upload your custom picture.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-300">
                    <strong className="text-indigo-300 block mb-0.5">2. Choose Size</strong>
                    Select 3×3 (Casual), 4×4 (Standard), or 5×5 (Hard).
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-300">
                    <strong className="text-pink-300 block mb-0.5">3. Select Mode</strong>
                    Pick free tile swap or classical sliding mechanics.
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-300">
                    <strong className="text-emerald-300 block mb-0.5">4. Solve & Win</strong>
                    Hit "Shuffle & Play" to track moves, time, and earn 3 stars!
                  </div>
                </div>
              </div>

              {/* Mode 1 & Mode 2 comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl glass-card border border-purple-500/20 bg-purple-950/15">
                  <h4 className="font-bold text-purple-300 text-sm mb-1.5 flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-purple-400" />
                    Change / Swap Pieces Mode
                  </h4>
                  <p className="text-slate-300 text-xs mb-2">
                    Free movement mode. All slices are visible on board. Swap any two tiles across the grid until the full image is reconstructed.
                  </p>
                  <span className="text-[11px] text-purple-400 font-semibold">Best for relaxing and quick puzzles.</span>
                </div>

                <div className="p-4 rounded-2xl glass-card border border-indigo-500/20 bg-indigo-950/15">
                  <h4 className="font-bold text-indigo-300 text-sm mb-1.5 flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-indigo-400" />
                    Classic Sliding Puzzle Mode
                  </h4>
                  <p className="text-slate-300 text-xs mb-2">
                    Authentic 15-puzzle format with one missing empty slot. Shift neighboring pieces step-by-step into the opening.
                  </p>
                  <span className="text-[11px] text-indigo-400 font-semibold">Best for brain challenge & speedrunning.</span>
                </div>
              </div>

              {/* Pro Tips & Star Ratings */}
              <div className="p-4 rounded-2xl glass-card border border-amber-500/20 bg-amber-950/15">
                <h4 className="font-bold text-amber-300 text-sm mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  Winning Strategies & 3-Star Rating
                </h4>
                <ul className="space-y-1.5 text-slate-300 text-xs">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Work row by row:</strong> Complete the top row from left to right first, then move to row 2, saving the final row for last.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Use Numbers:</strong> If an image has repetitive skies or patterns, turn on numbers to instantly see piece targets.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Score Stars:</strong> Finish with low moves and quick time to unlock all 3 stars and save your best score!</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Action Button Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800/90 bg-slate-950/70 shrink-0 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 hidden sm:block">
            Supports keyboard, mouse, and multi-touch on all modern devices.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow transition active:scale-95"
          >
            Got it, Let's Play!
          </button>
        </div>

      </div>
    </div>
  );
}
