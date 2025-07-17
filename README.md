# Room Designer Lite

Room Designer Lite is a simple web application that allows users to design a 2D layout of a room by clicking points on a canvas to form the room's corners.

## Features

- Click on the canvas to add points (room corners)
- `Close Room` button connects all points in the order they were added
- `Reset` button clears the canvas and starts over
- `Save as PNG` button to download the drawing
- `Remove Point` button removes the last added point
- Displays the lengths _(in cm)_ between connected points
- Hover over points to see coordinates
- Confirmation popup before reset
- Convexity check before closing the room — if the points don't form a convex hull, the room cannot be closed
- Confirmation popup before reset and before closing the room using a custom Modal component

## Technical Details

- Built with **React**, HTML, CSS, and TypeScript
- Uses the native `<canvas>` element for drawing
- Canvas is wrapped inside a **CanvasWrapper** React component that handles all interaction and drawing logic
- Canvas size: 800x800 pixels, centered on the screen
- Designed for desktop use only — not responsive for mobile devices
- Includes a **geometryUtils.ts** utility module for geometric calculations such as:
  - Checking intersection between line segments — to determine if a convex room can be created with user input
  - Calculating angles between a line and coordinate axes — to determine where to position calculated line lengths
- Includes a reusable **Custom Modal** React component used for confirmation dialogs on Reset and Close Room actions

## Getting Started

Clone the repository:

```bash
git clone https://github.com/AleksaRadovic2000/Mini-Room-Drawing-Tool-Bosch.git
```

Navigate into the project folder:

```bash
cd Mini-Room-Drawing-Tool-Bosch
```

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

**Note:** Make sure you have Node.js and npm installed, as well as Vite

## Live Demo

Follow the link to checkout the app ->
