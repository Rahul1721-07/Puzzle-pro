import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, Clock, Footprints, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { formatTime } from '../utils/puzzleEngine';

export function VictoryModal({
  isOpen,
  timeSeconds,
  moves,
  rating,
  isNewBest,
  onPlayAgain,
  onNextPhoto,
}) {
  useEffect(() => {
    if (isOpen) {
      // Confetti burst
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/40 shadow-glow-lg text-center animate-scale-up">
        
        {/* Glow Background Accent */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />

        {/* Trophy Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-0.5 shadow-glow-amber mb-4 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950/80 rounded-[14px] flex items-center justify-center">
            <Trophy className="w-8 h-8 text-amber-400 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-display tracking-tight">
          Puzzle Solved!
        </h2>
        <p className="text-xs sm:text-sm text-purple-300 font-medium mb-5">
          Magnificent work! You restored the photo perfectly.
        </p>

        {/* Star Rating */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((starIndex) => (
            <Star
              key={starIndex}
              className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 ${
                starIndex <= rating
                  ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] scale-110'
                  : 'text-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Best Record Banner */}
        {isNewBest && (
          <div className="mb-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEW PERSONAL BEST RECORD!</span>
          </div>
        )}

        {/* Performance Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-2xl glass-card border border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Time Taken</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">
              {formatTime(timeSeconds)}
            </div>
          </div>

          <div className="p-3 rounded-2xl glass-card border border-slate-800">
            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs mb-1">
              <Footprints className="w-3.5 h-3.5 text-purple-400" />
              <span>Total Moves</span>
            </div>
            <div className="text-xl font-bold text-white font-mono">
              {moves}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3 px-4 rounded-xl glass-button text-slate-200 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Play Again</span>
          </button>

          <button
            onClick={onNextPhoto}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow flex items-center justify-center gap-2 transition active:scale-95"
          >
            <span>Next Photo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
