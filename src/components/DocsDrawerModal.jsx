import React, { useState } from 'react';
import { X, BookOpen, Cpu, Code, Layers, FileText, CheckCircle2 } from 'lucide-react';

export function DocsDrawerModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('how-it-works');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl glass-panel border border-slate-700/80 shadow-glow-lg text-slate-200 animate-scale-up overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                Project Documentation & Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Deep dive into how the game works and how it was created
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

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800/80 bg-slate-900/40 overflow-x-auto">
          <button
            onClick={() => setActiveTab('how-it-works')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'how-it-works'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>How It Works (Mechanics & Math)</span>
          </button>

          <button
            onClick={() => setActiveTab('how-it-created')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'how-it-created'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>How It Was Created (Tech & Code)</span>
          </button>

          <button
            onClick={() => setActiveTab('docs-folder')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold border-b-2 transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'docs-folder'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Dedicated /docs Folder</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed">
          {activeTab === 'how-it-works' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  1. Mathematical Solvability Guarantee
                </h3>
                <p className="text-slate-300 mb-2">
                  In classical sliding tile puzzles (such as the 15-puzzle), a naive random permutation has a <strong>50% probability of being mathematically impossible</strong> to solve due to inversion parity constraints.
                </p>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono">
                  Solvability Rule: In N×N grid, if N is odd, number of inversions must be even. If N is even, (inversions + row of empty space) must have constant parity.
                </div>
                <p className="text-slate-300 mt-2">
                  To ensure <strong>100% solvability without fail</strong>, our engine utilizes a <em>Reverse Random Walk</em> algorithm. Starting from the verified solved state, the empty space undergoes 100+ random valid neighbor transitions. Because every scramble step is a legal game move, an inverse solution path is strictly guaranteed to exist!
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  2. Dynamic CSS Background Slicing
                </h3>
                <p className="text-slate-300">
                  Instead of cutting images into physical multiple canvas files, each tile renders the original image dynamically via pure CSS background position offsets:
                </p>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-indigo-300 text-xs font-mono mt-2">
                  backgroundSize = `${'{gridSize * 100}%'} ${'{gridSize * 100}%'}`<br />
                  posX = (tile.originalCol / (gridSize - 1)) * 100%<br />
                  posY = (tile.originalRow / (gridSize - 1)) * 100%
                </div>
                <p className="text-slate-300 mt-2">
                  This guarantees crisp high-resolution rendering, zero blurriness, and instantaneous responsiveness across mobile and retina displays.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  3. State & Win Condition Detection
                </h3>
                <p className="text-slate-300">
                  The board is represented as an array of length <code className="text-purple-300">N²</code>. When a player moves, the board updates. Win evaluation is an <code className="text-purple-300">O(N²)</code> check: each tile is verified against its index <code className="text-purple-300">tiles[i].id === i</code>. When satisfied, the timer stops, high scores persist to localStorage, and fireworks confetti trigger.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'how-it-created' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-400" />
                  Tech Stack Architecture
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <strong className="text-purple-300 block mb-1">React 19 + Vite 6</strong>
                    <span className="text-slate-400 text-xs">Lightning fast build times, reactive state management, customized modular hooks.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <strong className="text-indigo-300 block mb-1">Tailwind CSS v3 + Glassmorphism</strong>
                    <span className="text-slate-400 text-xs">Modern utility classes, backdrop-filter blur, custom glow shadows, responsive layout.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <strong className="text-emerald-300 block mb-1">HTML5 Web Audio API</strong>
                    <span className="text-slate-400 text-xs">Zero-dependency algorithmic synthesizers for clicks, sliding swooshes, and victory fanfares.</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <strong className="text-amber-300 block mb-1">Canvas Confetti & Lucide</strong>
                    <span className="text-slate-400 text-xs">Vibrant celebratory particle physics and clean vector iconography.</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  Key Components Breakdown
                </h3>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• <code className="text-purple-300 font-mono">App.jsx</code>: Central controller, keyboard listeners, timer interval, audio & game flow.</li>
                  <li>• <code className="text-purple-300 font-mono">PuzzleBoard.jsx</code>: Interactive responsive grid, drag & drop, tile positioning & peek preview.</li>
                  <li>• <code className="text-purple-300 font-mono">puzzleEngine.js</code>: Pure algorithmic logic, solvability scrambler, hint solver, rating calculation.</li>
                  <li>• <code className="text-purple-300 font-mono">audio.js</code>: Synthesizer generating real-time Web Audio oscillators and envelope gains.</li>
                  <li>• <code className="text-purple-300 font-mono">storage.js</code>: LocalStorage synchronization for best moves and best times.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'docs-folder' && (
            <div className="space-y-4">
              <p className="text-slate-300">
                In addition to this interactive dialog, a complete <strong>docs/</strong> folder has been created inside the project repository containing detailed markdown guides:
              </p>
              
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-purple-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-mono text-purple-300 font-semibold text-xs">docs/HOW_IT_WORKS.md</h4>
                    <p className="text-slate-400 text-xs">In-depth mathematical explanations of scramble algorithms, 15-puzzle solvability, coordinate slicing, and scoring.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-indigo-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-mono text-indigo-300 font-semibold text-xs">docs/ARCHITECTURE_AND_CREATION.md</h4>
                    <p className="text-slate-400 text-xs">Full architectural blueprint, component hierarchy, tech stack selection, state trees, and design choices.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-mono text-emerald-300 font-semibold text-xs">docs/USER_GUIDE.md</h4>
                    <p className="text-slate-400 text-xs">Player manual detailing controls, keyboard shortcuts, custom image uploads, and gameplay strategies.</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-mono text-amber-300 font-semibold text-xs">docs/ALGORITHM_SOLVABILITY.md</h4>
                    <p className="text-slate-400 text-xs">Deep dive into parity mathematics, permutation cycles, and avoiding unwinnable states.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            PhotoShuffle Pro • React & Tailwind CSS
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
