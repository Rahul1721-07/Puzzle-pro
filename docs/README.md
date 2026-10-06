# PhotoShuffle Pro — Documentation Hub 📚

Welcome to the comprehensive documentation repository for **PhotoShuffle Pro**, an interactive image puzzle and photo sliding game built with **React** and **Tailwind CSS v3**.

This folder contains in-depth documentation covering how the game was architected, how the underlying mathematics and mechanics work, and how you can run, customize, or extend the project.

---

## 📑 Table of Contents

| Document | Description |
| :--- | :--- |
| **[HOW_IT_WORKS.md](./HOW_IT_WORKS.md)** | Full breakdown of gameplay mechanics, 100% solvable scramble algorithms, CSS background slicing, Web Audio synthesizer, and win verification. |
| **[ARCHITECTURE_AND_CREATION.md](./ARCHITECTURE_AND_CREATION.md)** | Step-by-step creation guide, technical stack selection, component hierarchy, state flow, and Tailwind CSS design system tokens. |
| **[USER_GUIDE.md](./USER_GUIDE.md)** | Player manual covering controls, keyboard shortcuts, hint systems, custom picture uploads, and solving strategies. |
| **[ALGORITHM_SOLVABILITY.md](./ALGORITHM_SOLVABILITY.md)** | Mathematical deep dive into 15-puzzle permutation parity, inversion calculations, and solvability guarantees. |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)

### 2. Installation
Clone or navigate to the project directory:
```bash
cd "d:/photo suffle game"
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to play the game!

### 4. Build for Production
```bash
npm run build
```
This produces an optimized production bundle inside the `dist/` directory.

---

## 🎯 Highlights & Features
- **Dual Puzzle Modes**: Classic 15-Puzzle Sliding mode & Direct Tile Swap (Click or Drag & Drop).
- **Multiple Grid Difficulties**: 3×3 Casual (9 tiles), 4×4 Standard (16 tiles), 5×5 Master (25 tiles).
- **100% Solvability Guarantee**: Uses reverse random-walk permutations so no puzzle is ever mathematically unsolvable.
- **Dynamic Image Slicing**: Pure CSS background-position calculations—no server or canvas splitting required.
- **Custom Photo Uploads**: Upload local images or paste direct web URLs.
- **Pure Web Audio Synthesizer**: 0 external sound files; crisp synthetic audio feedback generated via Web Audio API.
- **Persistence**: Best moves and fastest completion times saved automatically per mode and grid size in `localStorage`.
- **Celebration Particle Effects**: High performance confetti fireworks on victory.
