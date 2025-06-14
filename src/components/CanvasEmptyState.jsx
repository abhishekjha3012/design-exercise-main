"use client";
/*
This component serves as an empty state for a canvas area in a UI builder application.
It provides a visual cue to users that they can start building their form by dragging components into the canvas.
*/

import { FileInput } from "lucide-react";

const CanvasEmptyState = () => {
  return (
    <div
      className="min-h-[50vh] border-2 border-dashed border-blue-500 
      rounded-lg p-6 bg-blue-50 transition transform hover:bg-blue-100 
        hover:border-blue-600 flex flex-col items-center justify-center"
    >
      <FileInput className="w-12 h-12 text-blue-500 mb-4" />
      <p className="text-gray-500">
        Drag components from the left side and drop them here to customize your
        UI.
      </p>
    </div>
  );
};

export { CanvasEmptyState };
