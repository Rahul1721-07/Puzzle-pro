// Local storage helper for persisting best records

const STORAGE_KEY = 'photo_shuffle_best_records_v1';

export function getBestScores() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.warn('Could not read best scores from localStorage', e);
    return {};
  }
}

export function saveBestScore(mode, gridSize, moves, timeSeconds) {
  try {
    const current = getBestScores();
    const key = `${mode}_${gridSize}x${gridSize}`;
    const previous = current[key];

    let isNewBest = false;

    if (!previous) {
      current[key] = { moves, time: timeSeconds, date: new Date().toISOString() };
      isNewBest = true;
    } else {
      const betterMoves = moves < previous.moves;
      const betterTime = timeSeconds < previous.time;

      if (betterMoves || betterTime) {
        current[key] = {
          moves: Math.min(moves, previous.moves),
          time: Math.min(timeSeconds, previous.time),
          date: new Date().toISOString(),
        };
        isNewBest = true;
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    return { isNewBest, record: current[key] };
  } catch (e) {
    console.warn('Could not save best score to localStorage', e);
    return { isNewBest: false, record: { moves, time: timeSeconds } };
  }
}
