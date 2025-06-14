"use client";

import React from "react";
import { Trash, ArrowDownUp, SquarePen } from "lucide-react";
import { useFormStore } from "@/lib/store";
import { DraggableItem } from "@/components/DraggableItem";

interface DroppableItemProps {
  index: number;
  field: {
    id: string;
    name: string;
    description: string;
    type:
      | "number"
      | "text"
      | "textarea"
      | "select"
      | "checkbox"
      | "radio-group"
      | "email";
    component: React.ComponentType<object> | null;
    defaultProps: {
      label: string;
      placeholder?: string;
      className: string;
      required: boolean;
    };
  };
}

const DroppableItem: React.FC<DroppableItemProps> = ({ field, index }) => {
  const { deleteField, setSelectedFieldId } = useFormStore();

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md border border-gray-300 relative mb-4 transform transition hover:shadow-lg">
      <label
        htmlFor={`${field?.defaultProps?.label}-${index}`}
        className="block text-gray-700 mb-1"
      >
        {field?.defaultProps?.label}
        {field?.defaultProps?.required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
      <div className="flex justify-between">
        <div className="text-sm font-medium text-gray-700 w-full">
          {field.component ? <field.component {...field.defaultProps} /> : null}
        </div>

        <div className="flex ml-4 items-center cursor-pointer gap-2">
          <SquarePen
            className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setSelectedFieldId(field.id)}
          />
          <DraggableItem id={field.id}>
            <ArrowDownUp className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
          </DraggableItem>
          <Trash
            className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => deleteField(field.id)}
          />
        </div>
      </div>
    </div>
  );
};

export { DroppableItem };
