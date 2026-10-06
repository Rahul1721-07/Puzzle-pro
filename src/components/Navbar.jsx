import React from 'react';
import { Volume2, VolumeX, HelpCircle, BookOpen, Sparkles, RefreshCw } from 'lucide-react';

export function Navbar({ isMuted, onToggleMute, onOpenHelp, onOpenDocs, onResetGame }) {
  return (
    <header className="w-full glass-panel border-b border-slate-800/80 sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-0.5 shadow-glow flex items-center justify-center">
            <div className="w-full h-full bg-slate-950/80 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight gradient-text font-display m-0">
                PhotoShuffle Pro
              </h1>
              <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                React + Tailwind
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Interactive Image Puzzle & Sliding Challenge
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 sm:px-3 sm:py-2 rounded-xl glass-button text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium"
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span className="hidden md:inline text-rose-300">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline text-slate-200">Audio ON</span>
              </>
            )}
          </button>

          {/* How to Play */}
          <button
            onClick={onOpenHelp}
            className="p-2 sm:px-3 sm:py-2 rounded-xl glass-button text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium"
            title="How to Play Guide"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">How to Play</span>
          </button>

          {/* Documentation & Architecture */}
          <button
            onClick={onOpenDocs}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow transition flex items-center gap-1.5 text-xs font-semibold"
            title="Project Docs & Architecture Details"
          >
            <BookOpen className="w-4 h-4 text-purple-200" />
            <span>Docs & Details</span>
          </button>
        </div>
      </div>
    </header>
  );
}
