# PhotoShuffle Pro 🧩

> An interactive, beautifully animated photo puzzle and sliding game built with **React** and **Tailwind CSS v3**.

![PhotoShuffle Pro Banner](https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&h=400&q=80)

---

## 🌟 Key Features

- **🎮 Dual Puzzle Modes**:
  - **Classic Sliding Puzzle**: Authentic 15-puzzle mechanics with empty tile slots and keyboard arrow/WASD controls.
  - **Direct Tile Swap Puzzle**: Freeform tile swapping via clicking or direct HTML5 Drag-and-Drop.
- **📐 Multiple Difficulties**: 3×3 Casual (9 pieces), 4×4 Standard (16 pieces), and 5×5 Master (25 pieces).
- **💯 100% Solvability Guarantee**: Uses an algorithmic reverse random-walk scrambler to mathematically prevent impossible configurations.
- **🎨 Dynamic CSS Slicing**: Pure client-side background coordinate slicing—zero canvas export lag or image degradation.
- **📸 Rich Photo Gallery & Custom Upload**:
  - Built-in curated HD photo themes (Cyber City, Space Nebula, Mountain Sunset, Shiba Inu, Tropical Reef, Curved Architecture).
  - Upload local pictures from disk.
  - Load online pictures directly via web URL.
- **🎵 Real-Time Web Audio Synthesizer**: 100% self-contained audio effects (clicks, sliding swooshes, swap chords, and victory fanfare) with no external audio assets needed.
- **⚡ Visual Assistance**:
  - **Peek (P)**: Quick preview of the original reference photo.
  - **Numbers (N)**: Toggle coordinate numbering on each tile.
  - **Hint (H)**: Intelligent next-move assistant.
  - **Solved Indicator**: Green checkmarks on pieces already in their correct places.
- **🏆 Stats & Persistence**: Real-time timer, move counter, and personal best records saved locally in `localStorage`.
- **🎉 Victory Celebration**: Hardware-accelerated fireworks confetti and star ratings ($\star\star\star$).
- **📚 Complete Documentation Folder**: Comprehensive guides in `docs/` detailing how the game works and how it was created.

---

## 📂 Documentation Folder (`docs/`)

The repository includes a dedicated `docs/` folder containing thorough architectural and mathematical breakdowns:

- **[docs/HOW_IT_WORKS.md](./docs/HOW_IT_WORKS.md)**: Game mechanics, scramble algorithms, background slicing, audio synth, and scoring.
- **[docs/ARCHITECTURE_AND_CREATION.md](./docs/ARCHITECTURE_AND_CREATION.md)**: Step-by-step creation guide, component hierarchy, tech stack selection, and design tokens.
- **[docs/USER_GUIDE.md](./docs/USER_GUIDE.md)**: Player instructions, keyboard shortcuts, hint system, and solving strategies.
- **[docs/ALGORITHM_SOLVABILITY.md](./docs/ALGORITHM_SOLVABILITY.md)**: Deep mathematical dive into 15-puzzle permutation parity and solvable graph connectivity.

You can also read these documents interactively inside the game at any time by clicking the **"Docs & Details"** button in the top navigation bar!

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm (v9 or newer)

### Installation
```bash
# Navigate to the project directory
cd "d:/photo suffle game"

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Building for Production
```bash
# Generate optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3.4](https://tailwindcss.com/) with PostCSS & Autoprefixer
- **Typography**: Google Fonts (Outfit & Plus Jakarta Sans)
- **Audio Engine**: HTML5 Web Audio API
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.kirilv.com/canvas-confetti/)

---

## 📄 License

MIT License — Feel free to use and modify for learning, games, and projects!
