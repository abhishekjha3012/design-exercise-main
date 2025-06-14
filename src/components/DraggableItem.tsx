"use client";

import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";

type DraggableItemProps = {
  id: string;
  children: React.ReactNode;
  type?: string;
  label?: string;
};

const DraggableItem = ({ id, type, label, children }: DraggableItemProps) => {
  const [isClient, setIsClient] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
  } = useDraggable({
    id,
    data: { id, type, label },
  });

  const { setNodeRef: setDropRef } = useDroppable({ id });

  /**
   * Sets the node reference for both draggable and droppable contexts.
   * This allows the item to be both draggable and droppable.
   * @param node - The HTML element to set as the reference for drag and drop.
   */
  const setNodeRef = useCallback(
    (node: HTMLElement | null) => {
      setDragRef(node);
      setDropRef(node);
    },
    [setDragRef, setDropRef]
  );

  /**
   * Effect to ensure the component is rendered on the client side.
   * Without this, the component may not function correctly during server-side rendering. 
   */
  useEffect(() => {
    setIsClient(true);
  }, []);

  // If not rendered on the client side, return null to avoid errors
  if (!isClient) return null;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 900, damping: 25 }}
        className="transition-all hover:scale-105 active:scale-95"
      >
        {children}
      </motion.div>
    </div>
  );
};

export { DraggableItem };
