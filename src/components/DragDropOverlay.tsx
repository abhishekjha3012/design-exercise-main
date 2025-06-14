"use client";
/*
  * It is used to display a draggable item when dragging components onto a canvas.
  * It uses Framer Motion for animations and DndKit for drag-and-drop functionality.
  * @param {React.ReactNode} children - The content to be displayed inside the overlay.
  * @returns {JSX.Element} A motion div wrapped in a DragOverlay component.
*/

import React from "react";
import { motion } from "framer-motion";
import { DragOverlay } from "@dnd-kit/core";

function DragDropOverlay({ children }: { children: React.ReactNode }) {
  return (
    <DragOverlay>
      <motion.div
        title="Drag to canvas"
        className={
          "text-gray-400 w-[400px] h-[200px] hover:text-blue-500 cursor-grab transition-transform"
        }
      >
        <div className="flex-1 p-4 rounded shadow-sm bg-white hover:shadow-md transition opacity-75">
          {children}
        </div>
      </motion.div>
    </DragOverlay>
  );
}

export { DragDropOverlay };
