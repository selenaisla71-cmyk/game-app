# AI Character Canvas

A Next.js + React + TailwindCSS + Fabric.js web app for image editing with an AI prompt sidebar.

## Features
- Top bar: Upload, Undo, Redo, Resize, Resolution, Download
- Left sidebar tools: Brush, Eraser, Resize, Rotate, Remove background, Magic erase
- Center Fabric.js canvas for image editing
- Right sidebar AI prompt editor

## Getting Started
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Structure
```text
.
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── CanvasEditor.tsx
│   ├── LeftToolButton.tsx
│   └── ToolbarButton.tsx
├── public
├── .eslintrc.json
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```
