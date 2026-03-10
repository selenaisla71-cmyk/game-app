"use client";

import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";

interface CanvasEditorProps {
  selectedTool: string;
  imageElement: HTMLImageElement | null;
}

export interface CanvasEditorHandle {
  undo: () => void;
  redo: () => void;
  exportImage: () => string | null;
  resizeCanvas: (width: number, height: number) => void;
}

const canvasWidth = 900;
const canvasHeight = 620;

export function CanvasEditor({ selectedTool, imageElement }: CanvasEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const historyRef = useRef<string[]>([]);
  const redoRef = useRef<string[]>([]);
  const [resolution, setResolution] = useState(`${canvasWidth} x ${canvasHeight}`);

  useEffect(() => {
    if (!canvasRef.current || fabricRef.current) {
      return;
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#e5e7eb",
      preserveObjectStacking: true,
    });

    fabricRef.current = canvas;

    const saveState = () => {
      historyRef.current.push(JSON.stringify(canvas.toJSON()));
      if (historyRef.current.length > 60) {
        historyRef.current.shift();
      }
      redoRef.current = [];
      setResolution(`${Math.round(canvas.getWidth())} x ${Math.round(canvas.getHeight())}`);
    };

    canvas.on("object:added", saveState);
    canvas.on("object:modified", saveState);
    canvas.on("object:removed", saveState);

    saveState();

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, []);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) {
      return;
    }

    if (selectedTool === "brush") {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = "#111827";
      canvas.freeDrawingBrush.width = 5;
      return;
    }

    if (selectedTool === "eraser") {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = "#e5e7eb";
      canvas.freeDrawingBrush.width = 18;
      return;
    }

    canvas.isDrawingMode = false;
  }, [selectedTool]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas || !imageElement) {
      return;
    }

    fabric.Image.fromURL(imageElement.src, { crossOrigin: "anonymous" }).then((img) => {
      const scale = Math.min(canvas.getWidth() / img.width!, canvas.getHeight() / img.height!);
      img.scale(scale * 0.95);
      img.set({
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        originX: "center",
        originY: "center",
      });

      canvas.clear();
      canvas.backgroundColor = "#e5e7eb";
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      historyRef.current = [JSON.stringify(canvas.toJSON())];
      redoRef.current = [];
    });
  }, [imageElement]);

  return (
    <div className="flex h-full flex-col rounded-lg border border-slate-700 bg-slate-950 p-3">
      <div className="mb-2 text-xs text-slate-400">Canvas Resolution: {resolution}</div>
      <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-slate-700 bg-slate-900 p-2">
        <canvas ref={canvasRef} className="max-h-full max-w-full" />
      </div>
      <div className="mt-2 text-xs text-slate-500">
        Tip: Brush and Eraser are active. Resize/Rotate are available via object handles.
      </div>
    </div>
  );
}
