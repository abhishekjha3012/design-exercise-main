"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Input_Component: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => <Input {...props} />;
const Textarea_Component: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = (props) => <textarea {...props} />;

type ComponentProps = {
  options?: { label: string; value: string }[];
};
const Select_Component: React.FC<ComponentProps> = (props) => (
  <Select defaultValue={props?.options?.[0]?.value || ""}>
    <SelectTrigger aria-label="Select an option">
      <SelectValue placeholder="Choose an option" />
    </SelectTrigger>
    <SelectContent>
      {props?.options?.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {" "}
          {item.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const Checkbox_Component: React.FC<ComponentProps> = (props) => (
  <div className="p-4 rounded-md border border-gray-300 shadow-md">
    <h3 className="mb-4">Select an option</h3>
    {props?.options?.map((item) => (
      <label key={item.value} className="flex items-center mt-2 gap-2">
        <Checkbox />
        {item.value}
      </label>
    ))}
  </div>
);

const RadioGroup_Component: React.FC<ComponentProps> = (props) => (
  <RadioGroup defaultValue="option1" className="flex flex-col gap-2">
    {props?.options?.map((item) => (
      <label key={item.value} className="flex items-center gap-2">
        <RadioGroupItem value={item.value} />
        {item.value}
      </label>
    ))}
  </RadioGroup>
);

export const COMPONENT_LIST = [
  {
    name: "Text",
    type: "text",
    description: "A Text component",
    defaultProps: {
      placeholder: "Enter text here",
      className: "border rounded px-2 py-1 w-full",
      required: false,
      label: "Enter Text",
    },
    component: Input_Component,
  },
  {
    name: "Number",
    type: "number",
    description: "A Number Text component",
    defaultProps: {
      placeholder: "Enter a number",
      className: "border rounded px-2 py-1 w-full",
      required: false,
      label: "Enter Number",
    },
    component: Input_Component,
  },
  {
    name: "Email",
    type: "email",
    description: "An email component",
    defaultProps: {
      placeholder: "example@email.com",
      className: "border rounded px-2 py-1 w-full",
      required: false,
      label: "Enter Email",
    },
    component: Input_Component,
  },
  {
    name: "Textarea",
    type: "textarea",
    description: "A Textarea component",
    defaultProps: {
      placeholder: "Enter detailed description...",
      className: "border rounded px-2 py-1 w-full",
      required: false,
      label: "Enter Textarea",
    },
    component: Textarea_Component,
  },
  {
    name: "Select",
    type: "select",
    description: "A Select component",
    defaultProps: {
      className: "border rounded px-2 py-1 w-full",
      required: false,
      label: "Select an Option",
      options: [
        { label: "Option 1", value: "Option 1" },
        { label: "Option 2", value: "Option 2" },
        { label: "Option 3", value: "Option 3" },
      ],
    },
    component: Select_Component,
  },
  {
    name: "Checkbox",
    type: "checkbox",
    description: "A Checkbox component",
    defaultProps: {
      className: "border rounded px-2 py-1 w-full",
      required: false,
      label: "Select Options",
      options: [
        { value: "Option 1" },
        { value: "Option 2" },
        { value: "Option 3" },
      ],
    },
    component: Checkbox_Component,
  },
  {
    name: "Radio Button Group",
    type: "radio-group",
    description: "A Radio Button Group component",
    defaultProps: {
      className: "border rounded px-2 py-1 w-full",
      required: false,
      label: "Select an Option",
      options: [
        { value: "Option 1" },
        { value: "Option 2" },
        { value: "Option 3" },
      ],
    },
    component: RadioGroup_Component,
  },
];
