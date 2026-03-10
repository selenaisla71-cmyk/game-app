"use client";

import {
  Brush,
  Download,
  Eraser,
  History,
  Redo2,
  RefreshCw,
  RotateCw,
  Sparkles,
  Upload,
  Wand2,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { CanvasEditor } from "@/components/CanvasEditor";
import { LeftToolButton } from "@/components/LeftToolButton";
import { ToolbarButton } from "@/components/ToolbarButton";

const topTools = [
  { label: "Upload", icon: Upload },
  { label: "Undo", icon: History },
  { label: "Redo", icon: Redo2 },
  { label: "Resize", icon: RefreshCw },
  { label: "Resolution", icon: Sparkles },
  { label: "Download", icon: Download },
] as const;

const sidebarTools = [
  { key: "brush", label: "Brush", icon: Brush },
  { key: "eraser", label: "Eraser", icon: Eraser },
  { key: "resize", label: "Resize", icon: RefreshCw },
  { key: "rotate", label: "Rotate", icon: RotateCw },
  { key: "remove-background", label: "Remove background", icon: Wand2 },
  { key: "magic-erase", label: "Magic erase", icon: Sparkles },
] as const;

export default function HomePage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeTool, setActiveTool] = useState("brush");
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [prompt, setPrompt] = useState("Create a stylized anime hero with a futuristic outfit.");

  const resolutionLabel = useMemo(() => (uploadedImage ? `${uploadedImage.width}x${uploadedImage.height}` : "No file"), [uploadedImage]);

  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const image = new Image();
    image.onload = () => setUploadedImage(image);
    image.src = URL.createObjectURL(file);
  };

  return (
    <main className="flex h-screen flex-col bg-slate-900 text-slate-100">
      <header className="flex items-center gap-2 border-b border-slate-700 bg-slate-950 px-4 py-3">
        <h1 className="mr-4 text-lg font-semibold">AI Character Canvas</h1>
        {topTools.map((tool) => (
          <ToolbarButton
            key={tool.label}
            label={tool.label}
            icon={tool.icon}
            onClick={tool.label === "Upload" ? () => fileRef.current?.click() : undefined}
          />
        ))}
        <span className="ml-auto text-xs text-slate-400">Image Resolution: {resolutionLabel}</span>
        <input ref={fileRef} onChange={onUpload} accept="image/*" type="file" className="hidden" />
      </header>

      <section className="grid flex-1 grid-cols-[220px_1fr_300px] gap-3 p-3">
        <aside className="rounded-lg border border-slate-700 bg-slate-950 p-3">
          <h2 className="mb-3 text-sm font-semibold text-slate-300">Tools</h2>
          <div className="space-y-2">
            {sidebarTools.map((tool) => (
              <LeftToolButton
                key={tool.key}
                label={tool.label}
                icon={tool.icon}
                active={activeTool === tool.key}
                onClick={() => setActiveTool(tool.key)}
              />
            ))}
          </div>
        </aside>

        <div className="min-h-0">
          <CanvasEditor selectedTool={activeTool} imageElement={uploadedImage} />
        </div>

        <aside className="flex flex-col rounded-lg border border-slate-700 bg-slate-950 p-3">
          <h2 className="mb-3 text-sm font-semibold text-slate-300">AI Prompt Editor</h2>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[220px] w-full flex-1 rounded-md border border-slate-700 bg-slate-900 p-3 text-sm text-slate-100 outline-none ring-cyan-500 focus:ring"
            placeholder="Describe your character edits..."
          />
          <button className="mt-3 rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500">
            Generate
          </button>
        </aside>
      </section>
    </main>
  );
}
