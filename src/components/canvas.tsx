"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { useFormStore } from "@/lib/store";
import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import { ArrowDownUp } from 'lucide-react';
import { CanvasEmptyState } from "@/components/CanvasEmptyState";
import { DroppableItem } from "@/components/DroppableItem";
import { DragDropOverlay } from "@/components/DragDropOverlay";
import { PropertyPanel } from "@/components/PropertyPanel";

const FormBuilderCanvas = () => {
  const { fields, replaceFields, setSelectedFieldId } = useFormStore();
  const { setNodeRef } = useDroppable({ id: 'drop-canvas' });

  /**
   * Handle when a form component is re orderded in the canvas.
   * Reorders the fields based on the drag and drop interaction.
   * Resets the selected field ID to clear any previous selection for property panel display.
   * @param event - The drag end event containing information about the active and over items.
   */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setSelectedFieldId('');
    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = fields.findIndex(f => f.id === active.id);
    const newIndex = fields.findIndex(f => f.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      replaceFields(oldIndex, newIndex);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div> <Header /></div>
      <div className="flex flex-row flex-1 overflow-hidden justify-between p-4">
        <div className="w-3/4 flex-1 overflow-scroll">
          <Card className="p-4 w-2/3 mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">Form Builder Canvas</h2>
            <div ref={setNodeRef} id="drop-canvas">
              <DndContext onDragEnd={handleDragEnd}>
                {fields?.length === 0 ? <CanvasEmptyState /> : fields.map((field, index) => (
                  <DroppableItem key={field.id} index={index} field={field} />
                ))}
                <DragDropOverlay><ArrowDownUp className="hover:text-indigo-600" /></DragDropOverlay> 
              </DndContext>
            </div>
          </Card>
        </div>
        <div className="flex w-1/4">
          <PropertyPanel />
        </div>
      </div>
    </div>
  );
};

export { FormBuilderCanvas };
