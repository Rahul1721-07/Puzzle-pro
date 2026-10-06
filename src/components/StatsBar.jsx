import React from 'react';
import { Timer, Footprints, Trophy, CheckCircle2 } from 'lucide-react';
import { formatTime } from '../utils/puzzleEngine';

export function StatsBar({ timeSeconds, moves, solvedPercentage, bestRecord }) {
  return (
    <div className="w-full max-w-xl mx-auto mb-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
        
        {/* Timer Card */}
        <div className="glass-card rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 border border-slate-800">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Timer className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">
              Time
            </div>
            <div className="text-sm sm:text-lg font-bold text-slate-100 font-mono">
              {formatTime(timeSeconds)}
            </div>
          </div>
        </div>

        {/* Moves Card */}
        <div className="glass-card rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 border border-slate-800">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <Footprints className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">
              Moves
            </div>
            <div className="text-sm sm:text-lg font-bold text-slate-100 font-mono">
              {moves}
            </div>
          </div>
        </div>

        {/* Solved % Card */}
        <div className="glass-card rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 border border-slate-800">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">
              Solved
            </div>
            <div className="text-sm sm:text-lg font-bold text-emerald-400 font-mono">
              {solvedPercentage}%
            </div>
          </div>
        </div>

        {/* Best Record Card */}
        <div className="col-span-3 sm:col-span-1 glass-card rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 border border-slate-800">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider">
              Best
            </div>
            <div className="text-xs sm:text-sm font-semibold text-amber-300 truncate font-mono">
              {bestRecord ? `${bestRecord.moves}m / ${formatTime(bestRecord.time)}` : 'None yet'}
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Progress Bar */}
      <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-emerald-400 transition-all duration-300 rounded-full"
          style={{ width: `${solvedPercentage}%` }}
        />
      </div>
    </div>
  );
}
