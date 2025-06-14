"use client";

import React from "react";
import { FormBuilderCanvas } from "@/components/canvas";
import { COMPONENT_LIST } from "@/lib/component-list";
import { File, GripVertical } from "lucide-react";
import { useFormStore } from "@/lib/store";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { DraggableItem } from "@/components/DraggableItem";
import { DragDropOverlay } from "@/components/DragDropOverlay";

export default function BuilderPage() {
  const { addField, setSelectedFieldId } = useFormStore();

  /**
    * Handle when a form component is dropped onto the canvas.
    * Adds the new component to the form state.
    * If dropped outside the canvas, it resets the active type.
    * Resets the selected field ID to clear any previous selection for property panel display.
    * @param event - The drag end event containing information about the drop target.
  */  
  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    setSelectedFieldId("");
    if (!over?.id) return;
    if (over?.id === "drop-canvas") {
      const componentType = COMPONENT_LIST.find(
        (item) => item.type === active.data.current?.type
      );
      if (!componentType) {
        return;
      }
      const newItem = {
        id: `${componentType.type}-${Date.now()}`, // Unique ID based on type and timestamp
        name: componentType.name,
        type: componentType.type as
          | "number"
          | "text"
          | "textarea"
          | "select"
          | "checkbox"
          | "radio-group"
          | "email",
        defaultProps: componentType.defaultProps,
        component: componentType.component,
        description: componentType.description,
      };
      addField(newItem);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-white">
        <aside className="w-1/4 bg-gray-900 text-gray-50 p-4 flex flex-col shadow-md">
          <div className="p-2 border-b mb-4">
            <h2 className="text-2xl font-semibold mb-6">Form Fields</h2>
          </div>
          <ul className="flex-1 space-y-4">
            {COMPONENT_LIST?.map((component, index) => (
              <DraggableItem
                key={`draggable-item-${component.type}-${index}`}
                id={`draggable-item-${component.type}-${index}`}
                type={component.type}
                label={component.defaultProps.label}
              >
                <li className="p-3 flex justify-between rounded-md bg-gray-800 hover:bg-gray-700 transition transform hover:translate-x-1 shadow-md cursor-grab">
                  <div className="text-sm font-medium">{component.name}</div>
                  <GripVertical className="w-4 h-4" />
                </li>
              </DraggableItem>
            ))}
          </ul>
          <p className="text-gray-400 mb-16">
            Select a component from this list and drag it into the canvas to
            customize your UI.
          </p>
        </aside>

        <main className="flex-1 w-3/4 bg-gray-100">
          <FormBuilderCanvas />
        </main>

        {<DragDropOverlay>
            <div className="bg-gray-50 p-4 rounded-md shadow-md border border-gray-300 flex items-center gap-2">
            <File className="w-6 h-6 text-gray-500" />
            <span className="text-gray-700 font-semibold">
              Drag it to the canvas to add a new component
            </span>
          </div>
        </DragDropOverlay>
        }
      </div>
    </DndContext>
  );
}
