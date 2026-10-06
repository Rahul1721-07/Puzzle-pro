# Architecture & Creation Guide 🏗️

This document details how **PhotoShuffle Pro** was designed, structured, and implemented from scratch using **React** and **Tailwind CSS v3**.

---

## 1. Project Creation & Setup Process

The application was scaffolded and configured through the following structured phases:

### Phase 1: Vite & React Initialization
1. Scaffolded a modern React application powered by Vite using non-interactive CLI flags:
   ```bash
   npx -y create-vite@latest ./ --template react --no-immediate
   ```
2. Installed core dependencies:
   - `react` & `react-dom` (v19)
   - `tailwindcss` (v3.4), `postcss`, and `autoprefixer`
   - `lucide-react` (high quality vector iconography)
   - `canvas-confetti` (hardware-accelerated celebratory particle explosions)

### Phase 2: Tailwind CSS v3 & Design System Configuration
Initialized Tailwind configuration via `npx tailwindcss init -p` and set up custom design tokens:
- **Custom Font Families**: Added Google Fonts `Outfit` and `Plus Jakarta Sans`.
- **Glassmorphism Panels**: Blur backdrops (`backdrop-filter: blur(12px)`), dark slate translucent cards, and subtle border highlights.
- **Glowing Accent Shadows**: Soft neon aura filters for purple, indigo, amber, and emerald elements.
- **Keyframe Animations**: Custom fade-ins, gentle pulses, and pop-in effects.

---

## 2. Component Hierarchy Diagram

```
App.jsx (Root Controller, State & Keyboard Handlers)
│
├── Navbar.jsx (Branding, Audio Toggle, Help & Docs Modal Triggers)
│
├── StatsBar.jsx (Timer, Move Counter, Completion %, Best Score)
│
├── GameControls.jsx
│   ├── Mode Switcher (Classic Sliding vs Direct Swap)
│   ├── Grid Size Picker (3×3, 4×4, 5×5)
│   ├── Shuffle & Play Button
│   ├── Peek Preview Trigger (P)
│   ├── Tile Numbers Toggle (N)
│   └── Next Move Hint Trigger (H)
│
├── PuzzleBoard.jsx
│   ├── Dynamic N×N CSS Grid
│   ├── Tiles with Dynamic Background Offsets
│   ├── Drag-and-Drop & Click Handlers
│   ├── Number & Correct Position Badges
│   └── Peek Image Overlay Layer
│
├── ImagePicker.jsx
│   ├── Curated Preset Carousel (Space, City, Nature, etc.)
│   ├── Local File Uploader (FileReader Data URLs)
│   └── Direct Image URL Form
│
├── VictoryModal.jsx (Confetti Fireworks, Star Ratings & Replay)
├── HowToPlayModal.jsx (Interactive Player Guide & Controls)
└── DocsDrawerModal.jsx (Interactive In-Game Documentation Viewer)
```

---

## 3. Directory Structure

```
d:/photo suffle game/
├── docs/                               # 📁 Detailed project documentation
│   ├── README.md                       # Documentation hub & quick start
│   ├── HOW_IT_WORKS.md                 # Mechanics, algorithms & rendering
│   ├── ARCHITECTURE_AND_CREATION.md    # Tech choices & component layout
│   ├── USER_GUIDE.md                   # Player controls, shortcuts & tips
│   └── ALGORITHM_SOLVABILITY.md        # Math proofs of 15-puzzle parity
│
├── public/                             # Public static assets
│
├── src/
│   ├── assets/                         # SVG & image assets
│   ├── constants/
│   │   └── presetImages.js             # High-res curated image gallery
│   ├── utils/
│   │   ├── audio.js                    # Web Audio API synthesizers
│   │   ├── puzzleEngine.js             # Solvable scramble & grid logic
│   │   └── storage.js                  # LocalStorage score persistence
│   ├── components/
│   │   ├── Navbar.jsx                  # Top navigation & settings
│   │   ├── StatsBar.jsx                # Live game statistics
│   │   ├── GameControls.jsx            # Mode, grid & action controls
│   │   ├── PuzzleBoard.jsx             # The interactive puzzle board
│   │   ├── ImagePicker.jsx             # Photo gallery & custom upload
│   │   ├── VictoryModal.jsx            # Celebration win dialog
│   │   ├── HowToPlayModal.jsx          # Instructions modal
│   │   └── DocsDrawerModal.jsx         # In-game documentation viewer
│   ├── App.jsx                         # Main application component
│   ├── index.css                       # Tailwind directives & glass styles
│   └── main.jsx                        # React root entry point
│
├── index.html                          # HTML template with Google Fonts
├── tailwind.config.js                  # Tailwind configuration & tokens
├── postcss.config.js                   # PostCSS pipeline
└── package.json                        # Dependencies and scripts
```

---

## 4. State Management Model

The application uses idiomatic React state and hooks without the overhead of heavy external state libraries:

| State Variable | Type | Purpose |
| :--- | :--- | :--- |
| `mode` | `'slide' \| 'swap'` | Active puzzle variant |
| `gridSize` | `3 \| 4 \| 5` | Number of rows and columns |
| `imageUrl` | `string` | Active photo URL (preset or user-uploaded) |
| `tiles` | `Array<Tile>` | Array of tile objects representing current board order |
| `moves` | `number` | Total valid moves made in the current session |
| `timeSeconds` | `number` | Elapsed play time tracked by `setInterval` |
| `isTimerRunning` | `boolean` | Tracks if the game timer is ticking |
| `isSolved` | `boolean` | Indicates if current board matches solved order |
| `showNumbers` | `boolean` | Toggles overlay numbers (1, 2, 3...) on tiles |
| `isPeeking` | `boolean` | Toggles translucent peek view of original picture |
| `isMutedState` | `boolean` | Audio synthesis mute toggle |
| `bestScores` | `Record<string, Score>` | Saved personal bests synchronized to `localStorage` |

---

## 5. UI/UX Design System

The application follows modern aesthetic principles:
- **Tailwind Palette**: Dark mode base with deep slate backgrounds (`#020617`, `#0f172a`), rich purple and indigo accents (`#7c3aed`, `#6366f1`), and emerald feedback indicators (`#10b981`).
- **Glassmorphism**: Translucent panels with background blur (`backdrop-blur-md`) and subtle `rgba(255, 255, 255, 0.08)` borders give a multi-layered modern feel.
- **Micro-Interactions**: Hover scales, subtle glow rings, active bounce animations, and accessible keyboard focus outlines.
- **Fully Responsive**: Adapts fluidly across mobile phones, tablets, laptops, and ultra-wide desktop monitors.
