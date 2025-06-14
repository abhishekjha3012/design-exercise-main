"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormStore, type Field } from "@/lib/store";

const PropertyPanel = () => {
  const { fields, selectedFieldId, updateField } = useFormStore();
  const [selectedField, setSelectedField] = useState<Field | null>(null);

  /**
   * Effect to update the selected field when the edit option in form component is clicked.
   * It finds the exact component in the fields array that needs to be displayed in the property panel.
   * If the field is found, it sets it as the selected field; otherwise, it sets the selected field to null.
   * @param fields - The list of fields in the form.
   */
  useEffect(() => {
    const field = fields.find((f) => f.id === selectedFieldId);
    if (field) {
      setSelectedField(field);
    } else {
      setSelectedField(null);
    }
  }, [fields, selectedFieldId]);

  return (
    <div className="p-2 border-l border-gray-300 flex-1">
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 border-b-2 border-gray-300 pb-2">
        Property Panel
      </h3>
      <div>
        {selectedField ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <p className="block text-sm font-medium text-gray-700">
                {selectedField?.description || ""}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Label
              </label>
              <Input
                type="text"
                value={selectedField?.defaultProps?.label || ""}
                onBlur={() => updateField(selectedField.id, selectedField)}
                onChange={(e) => {
                  setSelectedField((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      id: prev.id, // ensure id is present and not undefined
                      defaultProps: {
                        ...prev.defaultProps,
                        label: e.target.value,
                      },
                    };
                  });
                }}
                className="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Placeholder
              </label>
              <Input
                type="text"
                value={selectedField?.defaultProps?.placeholder || "N/A"}
                className="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm bg-gray-100"
                disabled={
                  selectedField?.defaultProps?.placeholder === undefined
                }
                onBlur={() => updateField(selectedField.id, selectedField)}
                onChange={(e) => {
                  setSelectedField((prev) => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      id: prev.id, // ensure id is present and not undefined
                      defaultProps: {
                        ...prev.defaultProps,
                        placeholder: e.target.value,
                      },
                    };
                  });
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Required
              </label>
              <RadioGroup
                className="flex flex-col gap-2"
                onValueChange={(value) => {
                  const updatedField = {
                    ...selectedField,
                    id: selectedField.id, // ensure id is present and not undefined
                    defaultProps: {
                      ...selectedField.defaultProps,
                      required: value === "Yes",
                    },
                  };
                  setSelectedField(updatedField);
                  updateField(updatedField.id, updatedField);
                }}
                value={selectedField?.defaultProps?.required ? "Yes" : "No"}
              >
                <label className="flex items-center gap-2 text-gray-700">
                  <RadioGroupItem value="Yes" />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <RadioGroupItem value="No" />
                  No
                </label>
              </RadioGroup>
            </div>
            {selectedField?.defaultProps?.options && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                {selectedField.defaultProps.options.map((option, index) => (
                  <div
                    className="flex justify-between items-center mb-2"
                    key={index}
                  >
                    <Input
                      type="text"
                      value={option.value}
                      className="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => {
                        const updatedOptions = [
                          ...(selectedField?.defaultProps?.options || []),
                        ];
                        updatedOptions[index] = {
                          ...updatedOptions[index],
                          value: e.target.value,
                          label: e.target.value,
                        };
                        const updatedField = {
                          ...selectedField,
                          id: selectedField.id,
                          defaultProps: {
                            ...selectedField.defaultProps,
                            options: updatedOptions,
                          },
                        };
                        setSelectedField(updatedField);
                        updateField(updatedField.id, updatedField);
                      }}
                    />
                    <Trash
                      className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer ml-1"
                      onClick={() => {
                        const updatedOptions =
                          selectedField.defaultProps?.options?.filter(
                            (_, i) => i !== index
                        ) || [];
                        const updatedField = {
                          ...selectedField,
                          id: selectedField.id, // ensure id is present and not undefined
                          defaultProps: {
                            ...selectedField.defaultProps,
                            options: updatedOptions,
                          },
                        };
                        setSelectedField(updatedField);
                        updateField(updatedField.id, updatedField);
                      }}
                    />
                  </div>
                ))}
                <button
                  className="mt-2 px-2 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                      const newOption = {
                        value: "New Option",
                        label: "New Option",
                      };
                      const updatedOptions = [
                        ...(selectedField.defaultProps?.options || []),
                        newOption,
                      ];
                      const updatedField = {
                        ...selectedField,
                        id: selectedField.id, // ensure id is present and not undefined
                        defaultProps: {
                          ...selectedField.defaultProps,
                          options: updatedOptions,
                        },
                      };
                    setSelectedField(updatedField);
                    updateField(updatedField.id, updatedField);
                  }}
                >
                  Add Option
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-500">
            Select a field item to see its properties.
          </p>
        )}
      </div>
    </div>
  );
};
export { PropertyPanel };
