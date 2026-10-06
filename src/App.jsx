import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { StatsBar } from './components/StatsBar';
import { GameControls } from './components/GameControls';
import { ImagePicker } from './components/ImagePicker';
import { PuzzleBoard } from './components/PuzzleBoard';
import { VictoryModal } from './components/VictoryModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { DocsDrawerModal } from './components/DocsDrawerModal';
import { PRESET_IMAGES } from './constants/presetImages';
import {
  GAME_MODES,
  createSolvedTiles,
  scrambleSlidePuzzle,
  scrambleSwapPuzzle,
  isPuzzleSolved,
  getSolvedPercentage,
  getPuzzleHint,
  calculateRating,
} from './utils/puzzleEngine';
import {
  playTileClick,
  playTileSlide,
  playTileSwap,
  playShuffleSound,
  playVictoryFanfare,
  setMuted,
  getMuted,
} from './utils/audio';
import { getBestScores, saveBestScore } from './utils/storage';
import { Play, Sparkles } from 'lucide-react';

export default function App() {
  // Game Setup State (Default: Change / Swap Pieces mode)
  const [mode, setMode] = useState(GAME_MODES.SWAP);
  const [gridSize, setGridSize] = useState(3);
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);

  // Puzzle State
  const [tiles, setTiles] = useState(() => createSolvedTiles(3, GAME_MODES.SWAP));
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Assistance & Display Toggles
  const [showNumbers, setShowNumbers] = useState(false);
  const [isPeeking, setIsPeeking] = useState(false);
  const [isMutedState, setIsMutedState] = useState(false);
  const [hint, setHint] = useState(null);

  // Best Records & Victory State
  const [bestScores, setBestScores] = useState(() => getBestScores());
  const [isNewBest, setIsNewBest] = useState(false);
  const [rating, setRating] = useState(3);

  // Modals
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [showVictoryModal, setShowVictoryModal] = useState(false);

  const timerRef = useRef(null);

  // Timer Interval
  useEffect(() => {
    if (isTimerRunning && !isSolved) {
      timerRef.current = setInterval(() => {
        setTimeSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, isSolved]);

  // Current Best Record
  const currentRecordKey = `${mode}_${gridSize}x${gridSize}`;
  const currentBestRecord = bestScores[currentRecordKey] || null;

  // Handle Audio Mute
  const handleToggleMute = () => {
    const next = !isMutedState;
    setIsMutedState(next);
    setMuted(next);
  };

  // Shuffle & Start New Game
  const handleShuffle = useCallback(() => {
    playShuffleSound();
    let newTiles;
    if (mode === GAME_MODES.SLIDE) {
      newTiles = scrambleSlidePuzzle(gridSize, gridSize * 40);
    } else {
      newTiles = scrambleSwapPuzzle(gridSize);
    }

    setTiles(newTiles);
    setMoves(0);
    setTimeSeconds(0);
    setIsGameStarted(true);
    setIsSolved(false);
    setIsTimerRunning(true);
    setShowVictoryModal(false);
    setIsNewBest(false);
    setHint(null);
  }, [mode, gridSize]);

  // Reset to Solved State
  const handleReset = () => {
    playTileClick();
    setTiles(createSolvedTiles(gridSize, mode));
    setIsGameStarted(false);
    setIsSolved(false);
    setIsTimerRunning(false);
    setMoves(0);
    setTimeSeconds(0);
    setShowVictoryModal(false);
    setHint(null);
  };

  // Switch Game Mode
  const handleModeChange = (newMode) => {
    if (newMode === mode) return;
    playTileClick();
    setMode(newMode);
    setTiles(createSolvedTiles(gridSize, newMode));
    setIsGameStarted(false);
    setIsSolved(false);
    setIsTimerRunning(false);
    setMoves(0);
    setTimeSeconds(0);
    setHint(null);
  };

  // Switch Grid Size
  const handleGridSizeChange = (newSize) => {
    if (newSize === gridSize) return;
    playTileClick();
    setGridSize(newSize);
    setTiles(createSolvedTiles(newSize, mode));
    setIsGameStarted(false);
    setIsSolved(false);
    setIsTimerRunning(false);
    setMoves(0);
    setTimeSeconds(0);
    setHint(null);
  };

  // Select Image
  const handleSelectImage = (newUrl) => {
    playTileClick();
    setImageUrl(newUrl);
    // Keep current board or reset state with new image
  };

  // Check Game Completion
  const checkVictory = (currentTiles, currentMoves, currentTime) => {
    if (isPuzzleSolved(currentTiles, mode)) {
      setIsSolved(true);
      setIsTimerRunning(false);

      // Play fanfare
      playVictoryFanfare();

      // Calculate rating
      const stars = calculateRating(currentMoves, currentTime, gridSize, mode);
      setRating(stars);

      // Save record
      const result = saveBestScore(mode, gridSize, currentMoves, currentTime);
      setIsNewBest(result.isNewBest);
      setBestScores(getBestScores());

      // Open victory modal
      setTimeout(() => {
        setShowVictoryModal(true);
      }, 400);
    }
  };

  // Handle Tile Click in Slide Mode
  const handleTileSlideClick = (clickedIndex) => {
    if (isSolved) return;
    const emptyIndex = tiles.findIndex((t) => t.isEmpty);
    if (emptyIndex === -1) return;

    // Swap clicked tile with empty slot
    const newTiles = [...tiles];
    const temp = newTiles[emptyIndex];
    newTiles[emptyIndex] = newTiles[clickedIndex];
    newTiles[clickedIndex] = temp;

    const nextMoves = moves + 1;
    setTiles(newTiles);
    setMoves(nextMoves);
    if (!isTimerRunning) setIsTimerRunning(true);
    playTileSlide();

    if (hint) setHint(null);
    checkVictory(newTiles, nextMoves, timeSeconds);
  };

  // Handle Tile Swap in Swap Mode
  const handleTileSwap = (indexA, indexB) => {
    if (isSolved || indexA === indexB) return;

    const newTiles = [...tiles];
    const temp = newTiles[indexA];
    newTiles[indexA] = newTiles[indexB];
    newTiles[indexB] = temp;

    const nextMoves = moves + 1;
    setTiles(newTiles);
    setMoves(nextMoves);
    if (!isTimerRunning) setIsTimerRunning(true);
    playTileSwap();

    if (hint) setHint(null);
    checkVictory(newTiles, nextMoves, timeSeconds);
  };

  // Hint Generator
  const handleGetHint = () => {
    if (isSolved) return;
    playTileClick();
    const nextHint = getPuzzleHint(tiles, gridSize, mode);
    if (nextHint) {
      setHint(nextHint);
      // Auto-clear hint after 3 seconds
      setTimeout(() => setHint(null), 3000);
    }
  };

  // Keyboard navigation for Slide mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shortcut P for Peek
      if (e.key === 'p' || e.key === 'P') {
        setIsPeeking((prev) => !prev);
        return;
      }

      // Shortcut N for Numbers
      if (e.key === 'n' || e.key === 'N') {
        setShowNumbers((prev) => !prev);
        return;
      }

      // Shortcut H for Hint
      if (e.key === 'h' || e.key === 'H') {
        handleGetHint();
        return;
      }

      if (mode !== GAME_MODES.SLIDE || isSolved) return;

      const emptyIndex = tiles.findIndex((t) => t.isEmpty);
      if (emptyIndex === -1) return;

      const emptyRow = Math.floor(emptyIndex / gridSize);
      const emptyCol = emptyIndex % gridSize;
      let targetIndex = -1;

      // ArrowUp or W: tile below moves UP into empty slot
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && emptyRow < gridSize - 1) {
        targetIndex = (emptyRow + 1) * gridSize + emptyCol;
      }
      // ArrowDown or S: tile above moves DOWN into empty slot
      else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && emptyRow > 0) {
        targetIndex = (emptyRow - 1) * gridSize + emptyCol;
      }
      // ArrowLeft or A: tile right moves LEFT into empty slot
      else if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && emptyCol < gridSize - 1) {
        targetIndex = emptyRow * gridSize + (emptyCol + 1);
      }
      // ArrowRight or D: tile left moves RIGHT into empty slot
      else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && emptyCol > 0) {
        targetIndex = emptyRow * gridSize + (emptyCol - 1);
      }

      if (targetIndex !== -1) {
        e.preventDefault();
        handleTileSlideClick(targetIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, tiles, gridSize, isSolved, moves, timeSeconds, isTimerRunning]);

  // Next photo helper for victory modal
  const handleNextPhoto = () => {
    const currentIndex = PRESET_IMAGES.findIndex((img) => img.url === imageUrl);
    const nextIndex = (currentIndex + 1) % PRESET_IMAGES.length;
    setImageUrl(PRESET_IMAGES[nextIndex].url);
    handleShuffle();
  };

  const solvedPercentage = getSolvedPercentage(tiles);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        isMuted={isMutedState}
        onToggleMute={handleToggleMute}
        onOpenHelp={() => setShowHelpModal(true)}
        onOpenDocs={() => setShowDocsModal(true)}
        onResetGame={handleReset}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
        
        {/* Hero Banner when puzzle not started */}
        {!isGameStarted && (
          <div className="w-full max-w-xl mb-6 p-4 rounded-2xl glass-panel border border-purple-500/30 text-center animate-fade-in shadow-glow">
            <div className="flex items-center justify-center gap-2 text-purple-300 font-semibold text-xs sm:text-sm mb-1">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Welcome to PhotoShuffle Pro!</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Preview your picture below, customize your grid size, and hit <strong>Shuffle & Play</strong> to challenge your mind! You can freely change and swap any pieces across the board or switch to classic sliding mode.
            </p>
            <button
              onClick={handleShuffle}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-glow transition active:scale-95 inline-flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Game Now</span>
            </button>
          </div>
        )}

        {/* Stats Bar */}
        <StatsBar
          timeSeconds={timeSeconds}
          moves={moves}
          solvedPercentage={solvedPercentage}
          bestRecord={currentBestRecord}
        />

        {/* Game Controls & Mode Selectors */}
        <GameControls
          mode={mode}
          onModeChange={handleModeChange}
          gridSize={gridSize}
          onGridSizeChange={handleGridSizeChange}
          onShuffle={handleShuffle}
          onReset={handleReset}
          showNumbers={showNumbers}
          onToggleNumbers={() => setShowNumbers(!showNumbers)}
          isPeeking={isPeeking}
          onPeekStart={() => setIsPeeking(true)}
          onPeekEnd={() => setIsPeeking(false)}
          onTogglePeek={() => setIsPeeking(!isPeeking)}
          onGetHint={handleGetHint}
        />

        {/* Interactive Puzzle Board */}
        <PuzzleBoard
          tiles={tiles}
          gridSize={gridSize}
          mode={mode}
          imageUrl={imageUrl}
          onTileClick={handleTileSlideClick}
          onSwapTiles={handleTileSwap}
          showNumbers={showNumbers}
          isPeeking={isPeeking}
          hint={hint}
          isSolved={isSolved}
        />

        {/* Photo Gallery Picker */}
        <div className="w-full mt-8">
          <ImagePicker
            currentImageUrl={imageUrl}
            onSelectImage={handleSelectImage}
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-500 border-t border-slate-900 bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Crafted with React 19, Tailwind CSS v3 & Web Audio API
          </span>
          <button
            onClick={() => setShowDocsModal(true)}
            className="text-purple-400 hover:text-purple-300 underline font-medium"
          >
            Read How It Works & Architecture Specs
          </button>
        </div>
      </footer>

      {/* Modals */}
      <VictoryModal
        isOpen={showVictoryModal}
        timeSeconds={timeSeconds}
        moves={moves}
        rating={rating}
        isNewBest={isNewBest}
        onPlayAgain={handleShuffle}
        onNextPhoto={handleNextPhoto}
      />

      <HowToPlayModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />

      <DocsDrawerModal
        isOpen={showDocsModal}
        onClose={() => setShowDocsModal(false)}
      />
    </div>
  );
}
