import { create } from "zustand";

export interface Field {
  id: string;
  name: string;
  type:
    | "text"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio-group"
    | "number"
    | "email";
  description: string;
  component: React.ComponentType<object> | null;
  defaultProps: {
    label: string;
    className: string;
    required: boolean;
    placeholder?: string;
    options?: { label?: string; value: string }[]; // For select and radio-group
  };
}

interface FormState {
  fields: Field[];
  selectedFieldId?: string;
  setSelectedFieldId: (id: string) => void;
  addField: (field: Field) => void;
  deleteField: (id: string) => void;
  updateField: (id: string, updatedField: Partial<Field>) => void;
  replaceFields: (oldIndex: number, newIndex: number) => void;
}

export const useFormStore = create<FormState>((set) => ({
  selectedFieldId: "",
  setSelectedFieldId: (id) => set({ selectedFieldId: id }),
  fields: [],
  addField: (field) => set((state) => ({ fields: [...state.fields, field] })),
  deleteField: (id) =>
    set((state) => ({
      fields: state.fields.filter((field) => field.id !== id),
    })),
  updateField: (id, updatedField) =>
    set((state) => ({
      fields: state.fields.map((field) =>
        field.id === id ? { ...field, ...updatedField } : field
      ),
    })),
  replaceFields: (oldIndex: number, newIndex: number) =>
    set((state) => {
      const newFields = [...state.fields];
      const [moved] = newFields.splice(oldIndex, 1);
      newFields.splice(newIndex, 0, moved);
      return { fields: newFields };
    }),
}));
